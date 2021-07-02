from typing import Any, Dict
import base64
from ariadne import ObjectType, convert_camel_case_to_snake, InterfaceType
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

from rest_framework.utils import model_meta

from cursor_pagination import CursorPaginator


class ObjectRegistry:
    _object_types: Dict[str, dict] = {}

    @classmethod
    def add_object_type(cls, object_name, object_metadata):
        if object_name not in cls._object_types:
            cls._object_types[object_name] = object_metadata

    @classmethod
    def object_type(cls, object_name):
        meta_data = cls.get_object_metadata(object_name)
        if meta_data:
            return meta_data["ObjectType"]
        return ""

    @classmethod
    def get_object_metadata(cls, object_name):
        if object_name in cls._object_types:
            return cls._object_types[object_name]
        return {}

    @classmethod
    def object_types(cls):
        return [o["ObjectType"] for o in cls._object_types.values()]


class Payload:
    def __init__(self, output=None):
        self.status = True if output else False
        self.output = output
        self.errors = None


# interface Node {
#   id: ID!
# }

# interface Payload {
#   status: Boolean!
#   errors: [Errors]!
#   output: Node!
# }

# type PageInfo {
#   hasNextPage: Boolean!
#   hasPreviousPage: Boolean!
#   startCursor: String
#   endCursor: String
# }

# interface Connection {
#   pageInfo: PageInfo!
# }

# interface Edge {
#   cursor: String!
# }


Edge = InterfaceType("Edge")
Connection = InterfaceType("Connection")
Node = InterfaceType("Node")


def node(obj, info, id):
    model_key, uuid = base64.b64decode(id).decode("utf-8").split("/")
    return ContentType.objects.get_by_natural_key(
        *model_key.split(".")
    ).get_object_for_this_type(uuid=uuid)


@Node.type_resolver
def resolve_node_type(obj, *_):
    # todo: this assumes GraphQL and Model Names match (which they don't)
    return obj.__class__.__name__


@Node.field("id")
def resolve_node_id(obj, *args):
    if isinstance(obj, dict):
        return obj.get("id")
    model_key = f"{obj._meta.app_label}.{obj._meta.model_name}"
    id = str(obj.uuid)
    return base64.b64encode(f"{model_key}/{id}".encode("utf-8")).decode("utf-8")


@Edge.type_resolver
def resolve_edge_type(obj, *_):
    # todo: this assumes GraphQL and Model Names match (which they don't)
    return f"{obj.__class__.__name__}Edge"


@Connection.type_resolver
def resolve_connection_type(obj, *_):
    # todo: this assumes GraphQL and Model Names match (which they don't)
    return f"{obj.__class__.__name__}Connection"


@Edge.field("cursor")
def resolve_edge_cursor(obj, *args):
    return obj["cursor"]


class PageInfoObj:
    def __init__(self, obj) -> None:
        self.obj = obj

    @property
    def has_next_page(self):
        return self.obj.has_next

    def has_previous_page(self, *args):
        return self.obj.has_previous

    @property
    def end_cursor(self):
        return self.obj.paginator.cursor(self.obj[-1])

    @property
    def start_cursor(self):
        return self.obj.paginator.cursor(self.obj[0])


ObjectRegistry.add_object_type("PageInfo", {"ObjectType": ObjectType("PageInfo")})
ObjectRegistry.add_object_type("Edge", {"ObjectType": Edge})
ObjectRegistry.add_object_type("Connection", {"ObjectType": Connection})
ObjectRegistry.add_object_type("Node", {"ObjectType": Node})


@Connection.field("pageInfo")
def resolve_connection_pageInfo(obj, info, *args):
    return PageInfoObj(obj)


class ResolverMetaClass(type):
    @classmethod
    def _get_base_object_type_name(cls, meta_options):
        ModelClass = meta_options.model
        return getattr(meta_options, "object_type", ModelClass.__name__)

    @classmethod
    def _add_object_type(cls, gql_object_name, fields):
        ObjectRegistry.add_object_type(
            gql_object_name,
            {
                "ObjectType": ObjectType(gql_object_name),
                "fields": fields,
            },
        )
        return ObjectRegistry.object_type(gql_object_name)

    @classmethod
    def _add_declared_object_type(cls, meta_options):
        GraphQLObjectType = cls._get_base_object_type_name(meta_options)
        cls._add_object_type(GraphQLObjectType, meta_options.fields)

    @classmethod
    def _add_edge_object_type(cls, relay_attr):
        GraphQLObjectType = cls._get_base_object_type_name(relay_attr.Meta)
        edge_name = f"{GraphQLObjectType}Edge"
        gql_object_type = cls._add_object_type(edge_name, ["node"])
        gql_object_type.set_field(
            "node", relay_attr.__class__.model_field_resolver("node")
        )

    @classmethod
    def _add_connection_object_type(cls, relay_attr):
        GraphQLObjectType = cls._get_base_object_type_name(relay_attr.Meta)
        connection_name = f"{GraphQLObjectType}Connection"
        gql_object_type = cls._add_object_type(connection_name, ["edges"])
        gql_object_type.set_field(
            "edges", relay_attr.__class__.model_field_resolver("edges")
        )

    def __new__(cls, name, bases, attrs):
        if "Meta" in attrs:
            cls._add_declared_object_type(attrs["Meta"])
        for attr_name, attr in attrs.items():
            try:
                relay = attr.relay
            except AttributeError:
                relay = False
            if relay:
                cls._add_edge_object_type(attr)
                cls._add_connection_object_type(attr)
        return super().__new__(cls, name, bases, attrs)


class FieldResolver:
    def __init__(self, *args, **kwargs):
        self.source = kwargs.get("source")

    def get_field(self, obj, default):
        source_field_name = self.source if self.source else default
        print(source_field_name)
        return getattr(obj, source_field_name)

    def format_object(self, obj):
        return obj

    def __call__(self, obj, info, *args, **kwargs):
        # assign to self to be available in other helper methods
        self.info = info
        format_func = getattr(self, f"format_{info.field_name}", None)
        if obj:
            field = self.get_field(obj, info.field_name)
            if field:
                if format_func:
                    return format_func(field, *args, **kwargs)
                return field
            return self.format_object(obj)
        return None


class RelayResolver(FieldResolver):
    def __init__(self, *args, **kwargs):
        self.relay = kwargs.pop("relay", False)
        super().__init__(*args, **kwargs)

    def __call__(self, obj, info, *args, **kwargs):
        if self.relay:
            field = self.get_field(obj, info.field_name)
            if field:
                return self.relay_resolver(field, *args, **kwargs)
        return super().__call__(obj, info, *args, **kwargs)

    def resolve_edges(obj, info, *args, **kwargs):
        return [{"cursor": obj.paginator.cursor(o), "node": o} for o in obj]

    def resolve_node(obj, info, *args):
        return obj["node"]

    def relay_resolver(self, obj, **kwargs):
        before = kwargs.get("before", None)
        after = kwargs.get("after", None)
        last = kwargs.get("last", None)
        first = kwargs.get("first", settings.RELAY_PAGE_SIZE if not last else None)
        paginator = CursorPaginator(obj, ordering=("-id",))
        return paginator.page(first=first, after=after, last=last, before=before)


class Resolver(FieldResolver):
    def __init__(self, *args, **kwargs):
        self.many = kwargs.get("many", False)
        super().__init__(*args, **kwargs)

    def create(self, obj, info, input):
        raise NotImplementedError()


class ModelResolver(Resolver, metaclass=ResolverMetaClass):
    pk_kwarg = "pk"

    def __new__(cls, *args, **kwargs):
        ModelClass = cls.Meta.model
        GraphQLObjectType = getattr(cls.Meta, "object_type", ModelClass.__name__)
        gql_object_type_dict = ObjectRegistry.get_object_metadata(GraphQLObjectType)
        gql_object_type = gql_object_type_dict["ObjectType"]

        for field_name in cls.Meta.fields:
            snake_field = convert_camel_case_to_snake(field_name)
            gql_object_type.set_field(field_name, cls.model_field_resolver(snake_field))

        return super().__new__(cls)

    def get_queryset(self, *args, **kwargs):
        if kwargs:
            return self.Meta.model.objects.filter(**kwargs)
        return self.Meta.model.objects.all()

    def get_object(self, *args, **kwargs):
        queryset = self.Meta.model.objects.filter(
            **self.get_object_kwargs(*args, **kwargs)
        )
        return queryset.get()

    def get_object_kwargs(self, **kwargs):
        return {self.pk_kwarg: kwargs.get(self.pk_kwarg)}

    def __call__(self, obj, info, *args, **kwargs):
        # assign to self to be available in other helper methods
        self.info = info
        format_func = getattr(self, f"format_{info.field_name}", None)
        if obj:
            field = self.get_field(obj, info.field_name)
            if field:
                if format_func:
                    return format_func(field, *args, **kwargs)
                if self.many:
                    return field.all()
                return field
            return self.format_object(obj)

        # this is for root level resolvers where obj is typically None
        if self.many:
            return self.format_queryset(self.get_queryset(*args, **kwargs))
        return self.format_object(self.get_object(*args, **kwargs))

    def format_queryset(self, queryset):
        return queryset

    @classmethod
    def model_field_resolver(cls, snake_field):
        def resolver(obj, info, *args):
            return getattr(obj, snake_field)

        if hasattr(cls, snake_field):
            return getattr(cls, snake_field)

        func_name = f"resolve_{snake_field}"
        if hasattr(cls, func_name):
            return getattr(cls, func_name)
        return resolver

    def create(self, obj, info, input):
        ModelClass = self.Meta.model

        # need to do some validation here?
        validated_data = input

        info = model_meta.get_field_info(ModelClass)

        many_to_many = {}
        for field_name, relation_info in info.relations.items():
            if relation_info.to_many and (field_name in validated_data):
                many_to_many[field_name] = validated_data.pop(field_name)

        instance = ModelClass.objects.create(**validated_data)

        if many_to_many:
            for field_name, value in many_to_many.items():
                field = getattr(instance, field_name)
                field.set(value)

        return Payload(output=instance)

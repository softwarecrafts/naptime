from ariadne import ObjectType, convert_camel_case_to_snake

from rest_framework.utils import model_meta

from .models import Nap


class Payload:
    def __init__(self, output=None):
        self.status = True if output else False
        self.output = output


class ModelResolver:
    def __init__(self, *args, **kwargs):
        ModelClass = self.Meta.model
        GraphQLObjectType = getattr(self.Meta, "object_type", ModelClass.__name__)
        self.gql_object_type = ObjectType(GraphQLObjectType)

        for field_name in self.Meta.fields:
            snake_field = convert_camel_case_to_snake(field_name)
            self.gql_object_type.set_field(
                field_name, self.model_field_resolver(snake_field)
            )

    def model_field_resolver(self, snake_field):
        def resolver(obj, info, *args):
            return getattr(obj, snake_field)

        func_name = f"resolve_{snake_field}"
        if hasattr(self, func_name):
            return getattr(self, func_name)
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


class NapResolver(ModelResolver):
    class Meta:
        model = Nap
        # these are the gql fields
        fields = ("start", "end", "dnd", "status")

    def next(self, obj, info):
        return Nap.objects.first()

    def resolve_tags(obj, info):
        return list(obj.tags.values_list("name", flat=True))

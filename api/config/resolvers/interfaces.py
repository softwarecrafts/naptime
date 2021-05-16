from ariadne import InterfaceType


Node = InterfaceType("Node")

@Node.type_resolver
def resolve_node_type(obj, *_):
    return obj


@Node.field("id")
def resolve_node_id(obj, *args):
    if isinstance(obj, dict):
        return obj.get("id")
    return str(obj.uuid)


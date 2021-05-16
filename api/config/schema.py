# schema.py
from ariadne import make_executable_schema, load_schema_from_path, fallback_resolvers
from django.conf import settings
from .resolvers import objects, query, mutation, scalars

type_defs = load_schema_from_path(f"{settings.ROOT_DIR}/config/schema.graphql")

schema = make_executable_schema(type_defs, [query, mutation, *objects, *scalars, fallback_resolvers])

# schema.py
from ariadne import make_executable_schema, load_schema_from_path, fallback_resolvers
from .resolvers import objects, query, mutation, scalars

type_defs = load_schema_from_path(f"./schema.graphql")

schema = make_executable_schema(type_defs, [query, mutation, objects, scalars, fallback_resolvers])

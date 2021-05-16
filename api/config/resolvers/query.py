from ariadne import QueryType


from api.naps.resolvers import NapResolver


query = QueryType()


@query.field("calendars")
def resolve_calendars(obj, info, *args):
    print(info.context)
    return obj


query.set_field("nextNap", NapResolver().next)


# class Query:
#     naps = NapResolver
#     next_nap = NapResolver.next

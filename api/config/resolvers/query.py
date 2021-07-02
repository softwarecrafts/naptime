from ariadne import QueryType

from api._core.resolvers import node
from api.calendars.resolvers import CalendarResolver
from api.naps.resolvers import NapResolver


query = QueryType()

query.set_field("calendars", CalendarResolver(many=True))
query.set_field("nextNap", NapResolver().next)
query.set_field("node", node)

# class Query:
#     naps = NapResolver
#     next_nap = NapResolver.next

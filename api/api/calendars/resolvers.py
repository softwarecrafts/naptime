from api._core.resolvers import ModelResolver, RelayResolver, FieldResolver
from api.accounts.resolvers import ProviderResolver

from .models import Calendar, EventInstance

# type EventConnection implements Connection {
#   edges: [EventEdge]
#   pageInfo: PageInfo!
# }

# type EventEdge implements Edge {
#   cursor: String!
#   node: Event
# }


class EventInstanceResolver(RelayResolver, ModelResolver):
    name = FieldResolver(source="summary")

    class Meta:
        model = EventInstance
        object_type = "Event"
        fields = (
            "nap",
            "start",
            "end",
            "name",
            "description",
        )

    def resolve_description(obj, info, *args):
        try:
            return obj.raw["description"]
        except KeyError:
            return ""


class CalendarResolver(ModelResolver):
    provider = ProviderResolver()
    events = EventInstanceResolver(source="event_instances", relay=True)

    class Meta:
        model = Calendar
        # these are the gql fields
        fields = ("provider", "events", "name")

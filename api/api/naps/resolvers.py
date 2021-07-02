from api._core.resolvers import ModelResolver, node
from api.calendars.models import EventInstance

from .models import Nap


class NapResolver(ModelResolver):
    class Meta:
        model = Nap
        # these are the gql fields
        fields = ("start", "end", "dnd", "status")

    def create(self, obj, info, input):
        if "event" in input:
            try:
                input["event"] = node(obj, info, input.get("event"))
            except EventInstance.DoesNotExist:
                raise ValueError("Event Instance ID does not exist")
        return super().create(obj, info, input)

    def next(self, obj, info):
        return Nap.objects.first()

    def resolve_tags(obj, info):
        return list(obj.tags.values_list("name", flat=True))

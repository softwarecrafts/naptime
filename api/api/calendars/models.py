from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models


from api._core.models import BaseModel


class Calendar(BaseModel):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='calendars'
    )

    raw = JSONField(null=True, blank=True)
    remote_id = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)


class Event(BaseModel):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name='events')
    raw = JSONField(null=True, blank=True)


class EventInstance(BaseModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event_instances')
    raw = JSONField(null=True, blank=True)

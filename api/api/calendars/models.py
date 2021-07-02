from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import gettext_lazy as _

from api._core.models import BaseModel

from api.accounts.models import Account


class Calendar(BaseModel):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="calendars"
    )

    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="calendars"
    )

    raw = JSONField(null=True, blank=True)
    remote_id = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.remote_id})"

    @property
    def provider(self):
        return self.account.provider


class Event(BaseModel):
    raw = JSONField(null=True, blank=True)


class EventInstance(BaseModel):
    class EventType(models.TextChoices):
        DEFAULT = ("default", _("Default"))
        OOO = ("ooo", _("Out of Office"))

    calendar = models.ForeignKey(
        Calendar, on_delete=models.CASCADE, related_name="event_instances"
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="event_instances",
        null=True,
        blank=True,
    )
    raw = JSONField(null=True, blank=True)

    summary = models.TextField()
    start = models.DateTimeField()
    end = models.DateTimeField()
    event_type = models.CharField(
        choices=EventType.choices, default=EventType.DEFAULT, max_length=255
    )

    def __str__(self):
        return f"{self.summary} ({self.start} -> {self.end})"


# {
#   "status": "confirmed",
#   "htmlLink": "https://www.google.com/calendar/event?eid=MnEzYW84b2FsaHNqdnM5Z3VoMnFzZGVhbGZfMjAyMTA2MDFUMTMwMDAwWiBpbmZvQGFrbWlsbGVyLmNvLnVr",
#   "creator": {
#     "email": "nanorepublica@gmail.com"
#   },
#   "organizer": {
#     "email": "info@akmiller.co.uk",
#     "self": true
#   },
# },

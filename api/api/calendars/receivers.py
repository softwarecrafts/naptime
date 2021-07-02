from allauth.socialaccount.signals import (
    pre_social_login,
    social_account_updated,
    social_account_added,
)
from django.dispatch import receiver

from api.accounts.models import Account
from api.providers.google.calendar import google_calendar_client

from .models import Calendar, EventInstance


@receiver(pre_social_login)
@receiver(social_account_updated)
@receiver(social_account_added)
def get_calendar_info(request, sociallogin, **kwargs):
    if sociallogin.account.provider != "google":
        return
    access_token = sociallogin.token.token
    user = sociallogin.user
    google_calendar_client.set_token(access_token)
    calendars = google_calendar_client.get_calendars()

    account = Account.objects.get(social_account=sociallogin.account)

    for calendar in calendars:
        if "summaryOverride" in calendar and calendar["summaryOverride"]:
            name = calendar["summaryOverride"]
        else:
            name = calendar["summary"]
        obj, _created = Calendar.objects.get_or_create(
            owner=user,
            remote_id=calendar["id"],
            account=account,
            defaults={
                "raw": calendar,
                "name": name,
                "description": calendar.get("description", "Primary Calendar"),
            },
        )
        events = google_calendar_client.get_events(obj.remote_id)

        [
            EventInstance.objects.get_or_create(
                calendar=obj,
                start=event["start"]["dateTime"],
                end=event["end"]["dateTime"],
                defaults={
                    "raw": event,
                    "summary": event["summary"],
                    "event_type": event["eventType"],
                },
            )
            for event in events
        ]

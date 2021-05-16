from allauth.socialaccount.signals import pre_social_login
from django.dispatch import receiver

from api.providers.google.calendar import google_calendar_client
from api.providers.slack import slack_client

from .models import Calendar


@receiver(pre_social_login)
def get_calendar_info(request, sociallogin, **kwargs):
    if sociallogin.account.provider != "google":
        return
    access_token = sociallogin.token.token
    user = sociallogin.user
    google_calendar_client.set_token(access_token)
    calendars = google_calendar_client.get_calendars()

    for calendar in calendars:
        if "summaryOverride" in calendar and calendar["summaryOverride"]:
            name = calendar["summaryOverride"]
        else:
            name = calendar["summary"]
        Calendar.objects.create(
            owner=user,
            raw=calendar,
            remote_id=calendar["id"],
            name=name,
            description=calendar.get("description", "Primary Calendar"),
        )

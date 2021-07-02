from datetime import datetime, timedelta

from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

from django.conf import settings

SCOPES = settings.SOCIALACCOUNT_PROVIDERS["google"]["SCOPE"]


class CalendarAPI:
    def set_token(self, value: str):
        self.service = build(
            "calendar", "v3", credentials=Credentials(token=value, scopes=SCOPES)
        )

    def get_events(self, calendar_id=None):
        now = datetime.utcnow()
        next = now + timedelta(days=7)
        events_result = (
            self.service.events()
            .list(
                calendarId=calendar_id if calendar_id is not None else "primary",
                timeMin=now.isoformat() + "Z",  # 'Z' indicates UTC time
                timeMax=next.isoformat() + "Z",  # 'Z' indicates UTC time
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])

        if not events:
            return []
        return events

    def get_calendars(self):
        result = self.service.calendarList().list().execute()
        calendar_list = result.get("items", [])
        if not calendar_list:
            return []
        # filter primary Calendar's for now.
        # holiday calendar's could be useful though!
        return [c for c in calendar_list if "primary" in c and c["primary"] is True]


google_calendar_client = CalendarAPI()


# list(
#     # calendarId,
#     # iCalUID=None,
#     # maxAttendees=None,
#     # maxResults=None,
#     pageToken=None,
#     # privateExtendedProperty=None,
#     q=None,
#     # sharedExtendedProperty=None,
#     # showDeleted=None,
#     # showHiddenInvitations=None,
#     singleEvents=None,
#     syncToken=None,
#     # timeMax=None,
#     # timeMin=None,
#     # timeZone=None,
#     # updatedMin=None
# )


# watch(
#     'primary',
#     alwaysIncludeEmail=None,
#     body=None,
#     iCalUID=None,
#     maxAttendees=None,
#     maxResults=None,
#     orderBy=None,
#     pageToken=None,
#     privateExtendedProperty=None,
#     q=None,
#     sharedExtendedProperty=None,
#     showDeleted=None,
#     showHiddenInvitations=None,
#     singleEvents=None,
#     syncToken=None,
#     timeMax=None,
#     timeMin=None, timeZone=None, updatedMin=None)

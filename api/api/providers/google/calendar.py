from datetime import datetime

from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

from django.conf import settings

SCOPES = settings.SOCIALACCOUNT_PROVIDERS["google"]["SCOPE"]


class CalendarAPI:
    def set_token(self, value: str):
        self.service = build(
            "calendar", "v3", credentials=Credentials(token=value, scopes=SCOPES)
        )

    def get_events(self):
        now = datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
        events_result = (
            self.service.events()
            .list(
                calendarId="primary",
                timeMin=now,
                maxResults=10,
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

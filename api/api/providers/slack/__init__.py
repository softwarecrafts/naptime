from datetime import datetime, timedelta

from slack_sdk.web import WebClient
from slack_sdk.errors import SlackApiError


class SlackAPI:
    def set_token(self, value: str):
        self.client = WebClient(token=value)

    def _make_request(self, func_name, **kwargs):
        try:
            resp = getattr(self.client, func_name)(**kwargs).validate()
        except SlackApiError as exp:
            print("ERROR: ", exp)
            return
        return resp

    def get_user_dnd_info(self, team_id):
        return self._make_request("dnd_info", team_id=team_id)

    def _dnd_setSnooze(self, num_minutes):
        return self._make_request("dnd_setSnooze", num_minutes=num_minutes)

    # dnd.endDnd can end both, however dnd.endSnooze can only end manually set DND (not Notification Schedule / daily DND). If the use-case is to end DND no matter what the time for the user, the one to use is dnd.endDnd.
    def _dnd_endSnooze(self):
        return self._make_request("dnd_endSnooze")

    def _dnd_endDnd(self):
        return self._make_request("dnd_endDnd")

    def _users_setPresence(self, presence):
        return self._make_request("users_setPresence", presence=presence)

    def _users_profile_set(self, **kwargs):
        return self._make_request("users_profile_set", **kwargs)

    def trigger_nap(self, dnd: bool, minutes: int, icon: str, status: str):
        if dnd:
            self._users_setPresence("away")
            self._dnd_setSnooze(minutes)
        else:
            self._users_setPresence("auto")
            self._dnd_endDnd()
        timestamp = (datetime.now() + timedelta(minutes=minutes)).timestamp()
        self._users_profile_set(
            **{
                "profile": {
                    "status_text": status,
                    "status_emoji": icon,
                    "status_expiration": timestamp,
                }
            }
        )


slack_client = SlackAPI()

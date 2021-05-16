from slack_sdk.web import WebClient


class SlackAPI:
    def set_token(self, value: str):
        self.client = WebClient(token=value)

    def get_user_dnd_info(self, team_id):
        try:
            resp = self.client.dnd_info(team_id=team_id).validate()
        except SlackApiError as exp:
            print("ERROR: ", exp)
            return
        return resp


slack_client = SlackAPI()

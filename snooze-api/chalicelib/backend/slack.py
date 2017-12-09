'''Interactions with the Slack API'''
import os
import time
import logging
from slackclient import SlackClient

__all__ = ['DoNotDisturb']

BOT_NAME = 'snooze_bot'

logger = logging.getLogger(__name__)


class DoNotDisturb(object):
    """
    Object that handles sending the DND commands to Slack for a user.
    """

    def __init__(self):
        """
        Attributes
        ----------
        slack_client: SlackClient
            Slack Client
        """
        self.slack_client = SlackClient(os.environ.get('SLACK_USER_TOKEN'))
        # self.bot_id = os.environ.get("BOT_ID")
        self.bot_id = self.get_name()
        self.at_bot = f"<@{self.bot_id}>"

    @staticmethod
    def _process_response(api_call):
        if api_call.get('ok'):
            return api_call
        else:
            raise Exception(api_call)
            # if app:
            #     app.log.info('Error: %s', api_call)
            # else:
            #     logger.info('Error: %s', api_call)

    def get_name(self):
        'returns the bot name'
        api_call = self.slack_client.api_call("users.list")
        if api_call.get('ok'):
            # retrieve all users so we can find our bot
            users = api_call.get('members')
            for user in users:
                if 'name' in user and user.get('name') == BOT_NAME:
                    return user.get('id')
            else:
                raise Exception(f"""Processed all users, couldn't find {BOT_NAME}.""", \
                        f"""I found {[u.get('name') for u in users]}""")
        else:
            raise Exception(api_call)

    def get_team_dnd(self):
        api_call = self.slack_client.api_call("dnd.teamInfo")

        if api_call.get('ok'):
            return api_call.get('users')

    def get_dnd(self):
        api_call = self.slack_client.api_call("dnd.info")

        if api_call.get('ok'):
            return api_call

    def set_snooze(self, minutes, app=None):
        api_call = self.slack_client.api_call("dnd.setSnooze", num_minutes=minutes)
        return self._process_response(api_call)

    def set_presence(self, presence='auto'):
        api_call = self.slack_client.api_call('users.setPresence', presence=presence)
        return self._process_response(api_call)
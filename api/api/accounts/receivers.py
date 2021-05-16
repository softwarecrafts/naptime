from allauth.socialaccount.signals import (
    pre_social_login,
    social_account_updated,
    social_account_added,
)
from allauth.account.models import EmailAddress
from django.dispatch import receiver

# from api.providers.slack import slack_client

from .models import Team, Account, Provider


@receiver(pre_social_login)
@receiver(social_account_updated)
@receiver(social_account_added)
def get_slack_workspace_info(request, sociallogin, **kwargs):
    if sociallogin.account.provider != "slack":
        return
    slack_provider, created = Provider.objects.get_or_create(
        name=sociallogin.account.provider, type=Provider.ProviderType.COMMUNICATOR
    )
    # access_token = sociallogin.token.token
    user = sociallogin.user
    team_id = sociallogin.account.extra_data["team"]["id"]
    team, created = Team.objects.get_or_create(
        remote_id=team_id,
        defaults={
            "name": sociallogin.account.extra_data["team"]["name"],
            "raw": sociallogin.account.extra_data["team"],
        },
    )

    email_object = EmailAddress.objects.get(
        email=sociallogin.account.extra_data["user"]["email"]
    )

    account, created = Account.objects.get_or_create(
        owner=user,
        team=team,
        defaults={
            "email_address": email_object,
            "provider": slack_provider,
            "raw": sociallogin.account.extra_data["user"],
        },
    )

    # access_token = sociallogin.token.token
    # slack_client.set_token(access_token)
    # print(slack_client.get_user_dnd_info(team_id))


@receiver(pre_social_login)
@receiver(social_account_updated)
@receiver(social_account_added)
def get_google_account_info(request, sociallogin, **kwargs):
    if sociallogin.account.provider != "google":
        return
    provider, created = Provider.objects.get_or_create(
        name=sociallogin.account.provider, type=Provider.ProviderType.SCHEDULER
    )

    email_object = EmailAddress.objects.get(
        email=sociallogin.account.extra_data["email"]
    )

    account, created = Account.objects.get_or_create(
        owner=sociallogin.user,
        email_address=email_object,
        defaults={
            "provider": provider,
            "raw": sociallogin.account.extra_data,
        },
    )

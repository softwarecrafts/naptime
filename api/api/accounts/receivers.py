from allauth.socialaccount.signals import (
    pre_social_login,
    social_account_updated,
    social_account_added,
)
from allauth.account.models import EmailAddress
from django.dispatch import receiver
from django.contrib.auth import get_user_model

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

    if request.user.is_authenticated:
        user = request.user
    else:
        user = get_user_model().objects.get(emailaddress=email_object)

    account, created = Account.objects.get_or_create(
        owner=user,
        social_account=sociallogin.account,
        team=team,
        defaults={
            "email_address": email_object,
            "provider": slack_provider,
            "raw": sociallogin.account.extra_data["user"],
        },
    )


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
        social_account=sociallogin.account,
        defaults={
            "provider": provider,
            "raw": sociallogin.account.extra_data,
        },
    )

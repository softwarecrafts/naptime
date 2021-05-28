from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import gettext_lazy as _

from allauth.socialaccount.models import SocialToken

from api._core.models import BaseModel
from api.providers.slack import slack_client


class Team(BaseModel):
    name = models.CharField(_("Name"), max_length=255)
    remote_id = models.CharField(_("Remote ID"), max_length=255)
    raw = JSONField(null=True, blank=True)

    def __str__(self):
        return self.name


class Provider(BaseModel):
    class ProviderType(models.TextChoices):
        SCHEDULER = "SCHED", _("Scheduler")
        COMMUNICATOR = "COMM", _("Communicator")

    class ProviderName(models.TextChoices):
        SLACK = "slack", _("Slack")
        GOOGLE = "google", _("Google")

    type = models.CharField(
        max_length=10, choices=ProviderType.choices, default=ProviderType.SCHEDULER
    )
    name = models.CharField(_("Name"), max_length=255, choices=ProviderName.choices)

    def __str__(self):
        return f"{self.type}: {self.name}"


class Account(BaseModel):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="accounts"
    )
    social_account = models.ForeignKey(
        "socialaccount.SocialAccount",
        on_delete=models.CASCADE,
        related_name="naptime_accounts",
    )
    provider = models.ForeignKey(
        Provider, on_delete=models.CASCADE, related_name="accounts"
    )
    team = models.ForeignKey(
        Team, on_delete=models.SET_NULL, null=True, blank=True, related_name="accounts"
    )
    email_address = models.ForeignKey(
        "account.EmailAddress",
        verbose_name=_("Linked Email Address"),
        on_delete=models.CASCADE,
        related_name="linked_accounts",
    )
    dnd = models.BooleanField(_("Account Do Not Disturb"), default=True)
    default_icon = models.CharField(
        _("Default Emoji"), max_length=50, null=True, blank=True
    )
    default_status = models.CharField(
        _("Default Status"), max_length=50, null=True, blank=True
    )

    raw = JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.provider} -> {self.owner.username}"

    @property
    def access_token(self):
        try:
            return self.social_account.socialtoken_set.get().token
        except SocialToken.MultipleObjectsReturned:
            return self.social_account.socialtoken_set.first().token
        except SocialToken.DoesNotExist:
            # todo: raises an appropriate exception?
            return ""

    @property
    def default_dnd(self) -> bool:
        """
        When this property returns True this means naps turn DnD OFF
        to allow notifications
        When this property returns False this means naps turn DnD ON
        to block notifications
        """
        user_dnd = self.owner.default_dnd
        if self.dnd is None:
            return user_dnd
        elif self.dnd != user_dnd:
            return self.dnd
        else:
            return user_dnd

    def trigger_nap(self, nap, start: bool):

        if start:
            duration = nap.duration
            icon = nap.icon
            status = nap.status
        elif self.default_dnd:
            duration = 7 * 24 * 60  # 1 week
            icon = self.default_icon
            status = self.default_status
        else:
            duration = 0
            icon = self.default_icon
            status = self.default_status

        dnd = self.default_dnd ^ start

        # NOTE: thought - dig into celery's capabilties for parallel work to trigger each provider API in a separate task?
        client_mapping = {Provider.ProviderName.SLACK: slack_client}

        client = client_mapping.get(self.provider.name)
        if client:
            client.set_token(self.access_token)
            client.trigger_nap(dnd=dnd, minutes=duration, icon=icon, status=status)

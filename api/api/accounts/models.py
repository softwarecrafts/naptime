from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import gettext_lazy as _


from api._core.models import BaseModel


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

    type = models.CharField(
        max_length=10, choices=ProviderType.choices, default=ProviderType.SCHEDULER
    )
    name = models.CharField(_("Name"), max_length=255)

    def __str__(self):
        return f"{self.type}: {self.name}"


class Account(BaseModel):

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="accounts"
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

    raw = JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.provider} -> {self.owner.username}"

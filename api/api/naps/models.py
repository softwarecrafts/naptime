from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import gettext_lazy as _

from taggit.managers import TaggableManager

from api._core.models import BaseModel
from api.accounts.models import Provider


class Nap(BaseModel):
    start = models.DateTimeField(_("Start of Nap"))
    end = models.DateTimeField(_("End of Nap"))

    icon = models.CharField(_("Icon"), max_length=50, blank=True, default="")
    status = models.CharField(
        _("Status message"), max_length=255, blank=True, default=""
    )

    dnd = models.BooleanField(
        _("Do not Disturb"),
        help_text=_(
            "Setting this to True will activate this nap, False will deactivate this nap. "
            "What activation/deactivation means will depend on the default set by the user"
        ),
        default=True,
    )

    event = models.ForeignKey(
        "calendars.EventInstance",
        verbose_name=_("Event Instance"),
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    accounts = models.ManyToManyField(
        "accounts.Account",
        verbose_name=_("Account to nap"),
        limit_choices_to={"provider__type": Provider.ProviderType.COMMUNICATOR},
        related_name="naps",
    )

    tags = TaggableManager(blank=True)

    def __str__(self):
        return f"{self.start} -> {self.end}"

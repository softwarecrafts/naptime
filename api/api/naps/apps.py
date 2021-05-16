from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class NapsConfig(AppConfig):
    name = "api.naps"
    verbose_name = _("Naps")

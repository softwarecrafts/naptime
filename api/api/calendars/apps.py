from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class CalendarsConfig(AppConfig):
    name = "api.calendars"
    verbose_name = _("Calendars")

    def ready(self):
        try:
            import api.calendars.receivers  # noqa F401
        except ImportError:
            pass

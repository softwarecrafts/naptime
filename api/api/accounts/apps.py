from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AccountsConfig(AppConfig):
    name = "api.accounts"
    verbose_name = _("Accounts")

    def ready(self):
        try:
            import api.accounts.receivers  # noqa F401
        except ImportError:
            pass

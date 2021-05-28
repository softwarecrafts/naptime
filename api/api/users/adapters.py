from typing import Any
from django.contrib import messages
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter as get_account_adapter
from allauth.exceptions import ImmediateHttpResponse
from django.conf import settings
from django.http import HttpRequest
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.core.exceptions import PermissionDenied

from allauth.socialaccount.helpers import (
    render_authentication_error,
)


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def populate_user(self, request: HttpRequest, sociallogin: Any, data: dict):
        # need to check the provider at this point?
        email = data.get("email")
        if request.user.is_authenticated and email:
            try:
                email_model = EmailAddress.objects.add_email(
                    request, request.user, email, confirm=True
                )
            except IntegrityError:
                # todo: this could be a WHOLE lot better.
                # todo: it currently dumps the user on an exception page with no way back or why they errored
                get_account_adapter(request).add_message(
                    request,
                    messages.ERROR,
                    "socialaccount/messages/socialaccount_user_exists",
                    message_context={"sociallogin": sociallogin, "action": "connect"},
                )
                # raise PermissionDenied("A User with this email address exists")

    def get_app(self, request, provider):
        """
        Temporary work-around for: https://github.com/pennersr/django-allauth/issues/2467
        """
        # NOTE: Avoid loading models at top due to registry boot...
        from allauth.socialaccount.models import SocialApp

        # 1 added line here
        from allauth.socialaccount import app_settings

        config = app_settings.PROVIDERS.get(provider, {}).get("APP")
        if config:
            app = SocialApp(provider=provider)
            for field in ["client_id", "secret", "key"]:
                setattr(app, field, config.get(field))

            # 3 added lines here
            app.key = app.key or "unset"
            app.name = app.name or provider
            app.save()

        else:
            app = SocialApp.objects.get_current(provider, request)
        return app

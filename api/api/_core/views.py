import logging
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from django.http import HttpResponse
from django.db import connection

from constance import config
from ariadne.contrib.django.views import GraphQLView
from oauth2_provider.views.mixins import OAuthLibMixin
from oauth2_provider.settings import oauth2_settings


logger = logging.getLogger(__name__)


class AuthenticationFailed(Exception):
    def __str__(self):
        return f"Authentication Failed: {super().__str__()}"


class AccessTokenExpired(AuthenticationFailed):
    def __init__(self, error_dict):
        print(error_dict)
        self.code = error_dict["error"]
        self.message = error_dict["error_description"]

    def __str__(self):
        return f"{self.code}: {self.message}"


class PrivateGraphQLView(OAuthLibMixin, GraphQLView):

    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    def authenticate_user(self, request):
        """
        Try to authenticate the user from the Authorization Header,
        throw an error if there is a failure
        """
        valid, req = self.verify_request(request)
        if valid:
            request.resource_owner = req.user
            request.user = req.user
            return req.user
        return AnonymousUser()

    def context_value(self, request):
        "Authenticate the user and add them to the request"
        self.authenticate_user(request)
        return request

    def execute_query(self, request, data):
        "If we fail to authenticate then return the errors to the client"
        try:
            return super().execute_query(request, data)
        except AccessTokenExpired as exc:
            return (
                True,
                {"errors": {"status": False, "message": exc.message, "code": exc.code}},
            )
        except (AuthenticationFailed, CheckSumFailed) as exc:
            return (True, {"errors": {"status": False, "messages": [str(exc)]}})



def healthcheck(_request):
    """
    The healthcheck passes if we force it through config or we have a table named 'users_user', fail otherwise
    """
    pass_response = HttpResponse("pong")
    failed_response = HttpResponse("Healthcheck Failed", status=503)
    table_name = "users_user"
    if config.AUTO_PASS_HEALTHCHECK:
        return pass_response
    if not is_ssl_connection():
        return failed_response
    if table_name in connection.introspection.table_names():
        return pass_response
    return failed_response

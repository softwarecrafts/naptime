from allauth.account.models import EmailAddress
from api._core.resolvers import ModelResolver

from .models import Account, Provider


class EmailAddressResolver(ModelResolver):
    class Meta:
        model = EmailAddress
        object_type = "Email"
        fields = ("address", "verified")

    def resolve_address(obj, info, *args):
        return obj.email


class AccountResolver(ModelResolver):
    email = EmailAddressResolver(source="email_address")

    class Meta:
        model = Account
        fields = (
            "provider",
            "email",
            "name",
        )

    def resolve_name(obj, info, *args):
        return str(obj)

    def resolve_email(obj, info, *args):
        return obj.email_address


class ProviderResolver(ModelResolver):

    accounts = AccountResolver(many=True)

    class Meta:
        model = Provider
        # these are the gql fields
        fields = (
            "type",
            "accounts",
        )

    def resolve_type(obj, info, *args):
        return obj.ProviderType(obj.type).label

from django.contrib import admin

from .models import Team, Provider, Account


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "remote_id", "uuid")


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "provider", "team", "email_address", "uuid")


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "type")

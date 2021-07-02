from django.contrib import admin

from .models import Calendar, EventInstance


@admin.register(Calendar)
class CalendarAdmin(admin.ModelAdmin):
    list_display = (
        "uuid",
        "owner",
        "account",
        "remote_id",
        "name",
        "description",
    )


@admin.register(EventInstance)
class EventInstanceAdmin(admin.ModelAdmin):
    list_display = (
        "uuid",
        "calendar",
        "summary",
        "start",
        "end",
        "event_type",
    )

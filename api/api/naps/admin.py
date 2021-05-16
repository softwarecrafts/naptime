from django.contrib import admin

from .models import Nap


@admin.register(Nap)
class NapAdmin(admin.ModelAdmin):
    list_display = ("id", "start", "end", "icon", "dnd")

import json
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.timezone import timedelta
from django.utils.translation import gettext_lazy as _

from django_celery_beat.models import ClockedSchedule, PeriodicTask

from taggit.managers import TaggableManager

from api._core.models import BaseModel
from api.accounts.models import Provider


# todo: cater for recurring events and instances of said events
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

    # this will come later
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

    # should this be on and off task instead of start stop?
    # ie if start stop, then the task controls on/off
    # if on off , then the task time varies
    start_task = models.OneToOneField(
        PeriodicTask,
        verbose_name=_("Start Task"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="This is the task that starts's a nap",
        related_name="+",
    )

    end_task = models.OneToOneField(
        PeriodicTask,
        verbose_name=_("End Task"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="This is the task that end's a nap",
        related_name="+",
    )

    def __str__(self):
        event = ""
        if self.event:
            event = f"with event {self.event}"
        return f"{self.start} -> {self.end} {event}"

    def save(self, *args, **kwargs):
        if not self.start and self.event:
            self.start = self.event.start
            self.end = self.event.end
        self.create_background_tasks()
        super().save(*args, **kwargs)

    @property
    def duration(self):
        return (self.end - self.start).total_seconds() / 60

    def _create_clocked(self, date_time):
        # clear out any random clocks without tasks
        ClockedSchedule.objects.filter(
            clocked_time=date_time, periodictask__isnull=True
        ).delete()
        try:
            clocked, _created = ClockedSchedule.objects.get_or_create(
                clocked_time=date_time
            )
        except ClockedSchedule.MultipleObjectsReturned:
            # get a list of existing tasks with this clock
            existing_tasks = PeriodicTask.objects.filter(
                clocked__clocked_time=date_time
            )
            # then delete the clocks
            ClockedSchedule.objects.filter(
                clocked_time=date_time, periodictask__isnull=False
            ).delete()
            # create a new one
            clocked, _created = ClockedSchedule.objects.get_or_create(
                clocked_time=date_time
            )
            # then re-add the existing tasks to the new clocked
            clocked.periodictask_set.set(existing_tasks)
        return clocked

    def create_background_tasks(self):
        start = self.start - timedelta(seconds=60)
        end = self.end + timedelta(seconds=60)

        clocked_start = self._create_clocked(start)
        clocked_end = self._create_clocked(end)

        # start and end times would possibly be reversed for the logic of
        # allowing notifications rather than the current way of thinking?

        self.start_task, _created = PeriodicTask.objects.get_or_create(
            clocked=clocked_start,
            name=f"Start Nap: {self.uuid}",
            kwargs=json.dumps({"nap_id": str(self.uuid), "start": True}),
            task="api.naps.tasks.trigger_nap",
            one_off=True,
        )
        self.end_task, _created = PeriodicTask.objects.get_or_create(
            clocked=clocked_end,
            name=f"End Nap: {self.uuid}",
            kwargs=json.dumps({"nap_id": str(self.uuid)}),
            task="api.naps.tasks.trigger_nap",
            one_off=True,
        )

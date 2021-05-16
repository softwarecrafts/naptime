# Generated by Django 3.0.11 on 2021-05-11 19:06

from django.db import migrations, models
import django.db.models.deletion
import taggit.managers
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('calendars', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('start', models.DateTimeField(verbose_name='Start of Nap')),
                ('end', models.DateTimeField(verbose_name='End of Nap')),
                ('icon', models.CharField(blank=True, default='', max_length=50, verbose_name='Icon')),
                ('status', models.CharField(max_length=255, verbose_name='Status message')),
                ('dnd', models.BooleanField(default=True, help_text='Setting this to True will activate this nap, False will deactivate this nap. What activation/deactivation means will depend on the default set by the user', verbose_name='Do not Disturb')),
                ('accounts', models.ManyToManyField(limit_choices_to={'provider__type': 'COMM'}, related_name='naps', to='accounts.Account', verbose_name='Account')),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='calendars.EventInstance', verbose_name='Event Instace')),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
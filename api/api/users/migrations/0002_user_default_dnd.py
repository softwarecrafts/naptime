# Generated by Django 3.0.11 on 2021-05-16 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='default_dnd',
            field=models.BooleanField(default=True, verbose_name='Default Do Not Disturb Setting'),
        ),
    ]
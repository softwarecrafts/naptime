# Generated by Django 3.0.11 on 2021-05-28 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20210522_2001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='dnd',
            field=models.BooleanField(default=True, verbose_name='Account Do Not Disturb'),
        ),
    ]

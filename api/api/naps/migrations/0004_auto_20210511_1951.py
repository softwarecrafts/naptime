# Generated by Django 3.0.11 on 2021-05-11 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('naps', '0003_auto_20210511_1950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nap',
            name='accounts',
            field=models.ManyToManyField(related_name='naps', to='accounts.Account', verbose_name='Account'),
        ),
    ]

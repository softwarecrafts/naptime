
import yaml
from chalice import Cron

from ..backend.slack import DoNotDisturb


def read_yaml_data_file(filename):
    with open(filename) as data_file:
        return yaml.load(data_file.read())


def create_cron(data):
    return Cron(**data)


def calculate_wake_cron(data):
    # hmmm.... TODO
    # need the next datetime of the cron data, then need to add the duration as a timedelta
    # then need to convert that datetime back to the cron format?!?!?!?!
    return Cron(**data)


def get_minutes(duration):
    if 'length' not in duration:
        raise KeyError('No length of time provided in the duration data')
    if not isinstance(duration.get('length'), int):
        raise TypeError('Length of time is not an Integer')
    unit_conversion = {
        'minutes': lambda x: x,
        'hours': lambda x: x * 60,
    }
    conversion = unit_conversion.get(duration.get('unit', 'minutes'))
    return conversion(duration.get('length'))


def get_away(away):
    if away is True:
        return 'away'
    return 'auto'


def setup_snooze_functions(data):

    def snooze_template(event):
        client = DoNotDisturb()
        client.set_snooze(get_minutes(data.get('duration')))
        client.set_presence(get_away(data.get('away')))

    def wake_template(event):
        status = 'auto'
        client = DoNotDisturb()
        client.set_presence(status)

    return snooze_template, wake_template



        
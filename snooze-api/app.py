from chalice import Chalice, Cron
from chalicelib.backend.slack import DoNotDisturb
from chalicelib.tasks.manager import read_yaml_data_file, setup_snooze_functions, create_cron, calculate_wake_cron

app = Chalice(app_name='snooze-api')
CURRENT_VERSION = 1.0


@app.route('/')
def hello():
    return {'hello': 'world'}


@app.schedule(Cron(0, 2, '?', '*', 'THU', '*'))
def journey_snooze(event):
    hours = 24
    minutes = hours * 60
    status = 'away'
    client = DoNotDisturb()
    client.set_snooze(minutes, app=app)
    client.set_presence(status)


@app.schedule(Cron(0, 3, '?', '*', 'FRI', '*'))
def wake_up(event):
    status = 'auto'
    client = DoNotDisturb()
    client.set_presence(status)


def main():
    data = read_yaml_data_file('../data/recurring.yml')
    if data.get('version') < CURRENT_VERSION:
        raise EnvironmentError('Data file version is out of date, please update file manually')
    for item in data.get('data'):
        snooze_func, wake_func = setup_snooze_functions(item)
        snooze_cron, wake_cron = item.get('cron'), calculate_wake_cron(item)
        app.schedule(create_cron(snooze_cron))(snooze_func)
        app.schedule(create_cron(wake_cron))(snooze_func)
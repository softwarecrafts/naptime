
from backend.slack import DoNotDisturb



def journey_snooze():
    hours = 24
    minutes = hours * 60
    DoNotDisturb().set_snooze(minutes)
from config import celery_app
from .models import Nap


@celery_app.task()
def trigger_nap(nap_id=None, start=False):
    if not nap_id:
        return

    try:
        nap = Nap.objects.get(uuid=nap_id)
    except Nap.DoesNotExist:
        return

    for account in nap.accounts.iterator():
        account.trigger_nap(nap, start)

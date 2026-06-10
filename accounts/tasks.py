from celery import shared_task
from utils import send_otp_code as _send_otp_code

@shared_task
def send_otp_code(phone_number, code):
    _send_otp_code(phone_number, code)

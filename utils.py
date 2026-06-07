from kavenegar import KavenegarAPI


def send_otp_code(phone_number, code):
    try:
        api = KavenegarAPI('Your API Key')
        params = {'sender': '2000660110', 'receptor': phone_number, 'message': f'your code: {code}'}
        response = api.sms_send(params)
        print(response)
    except Exception as e:
        print(e)
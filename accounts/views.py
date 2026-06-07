from django.shortcuts import render,redirect
from django.contrib import messages
from django.views import View
from .forms import UserRegistrationForm, VerifyCodeForm
import random
from django.http import JsonResponse
from utils import send_otp_code
from .models import OtpCode, User
from django.utils import timezone
from datetime import timedelta


class UserRegisterView(View):
    form_class = UserRegistrationForm
    template_name = 'accounts/register.html'

    def get(self, request):
        form = self.form_class
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            random_code = random.randint(100000,999999)
            send_otp_code(phone_number=form.cleaned_data['phone'], code=random_code)
            OtpCode.objects.create(phone_number=form.cleaned_data['phone'], code=random_code)
            request.session["user_registration_info"] = {
                'phone_number': form.cleaned_data['phone'],
                'email': form.cleaned_data['email'],
                'full_name': form.cleaned_data['full_name'],
                'password': form.cleaned_data['password'],
            }
            messages.success(request, 'we sent you a code', 'success')
            return redirect('accounts:verify_code')
        return render(request, self.template_name, {'form': form})


class UserRegistrationVerifyCodeView(View):
    form_class = VerifyCodeForm

    def get(self, request):
        form = self.form_class
        return render(request, 'accounts/verify.html', {'form': form})

    def post(self, request):
        user_session = request.session['user_registration_info']
        code_instance = OtpCode.objects.get(phone_number=user_session['phone_number'])
        form = self.form_class(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            if cd['code'] == code_instance.code:
                if timezone.now() - code_instance.created > timedelta(minutes=2):
                    code_instance.delete()
                    messages.error(request, 'this code is expired', 'danger')
                    return redirect('accounts:verify_code')
                User.objects.create_user(
                    user_session['phone_number'], user_session['email'],
                    user_session['full_name'], user_session['password']
                )
                code_instance.delete()
                messages.success(request, "you registered.", "success")
                return redirect("home:home")
            else:
                messages.error(request, 'Invalid code', 'danger')
                return redirect('accounts:verify_code')
        return redirect('home:home')


class ResendVerificationCodeView(View):
    def post(self, request):
        user_session = request.session.get('user_registration_info')
        if not user_session or 'phone_number' not in user_session:
            return JsonResponse({'status': 'error', 'message': 'کد وارد نشد.'}, status=400)

        phone = user_session['phone_number']

        OtpCode.objects.filter(phone_number=phone).delete()

        new_code = str(random.randint(100000, 999999))

        OtpCode.objects.create(
            phone_number=phone,
            code=new_code,
            created=timezone.now()
        )
        return JsonResponse({'status': 'ok', 'message': 'کد جدید ارسال شد'})

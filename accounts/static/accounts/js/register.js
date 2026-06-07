// static/js/register.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-card form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const fullName = form.querySelector('input[name="full_name"]');
            const phone = form.querySelector('input[name="phone"]');
            const email = form.querySelector('input[name="email"]');
            const password = form.querySelector('input[name="password"]');
            let isValid = true;
            let errorMsg = '';

            // بررسی نام کامل
            if (!fullName.value.trim()) {
                errorMsg += 'نام کامل الزامی است.\n';
                isValid = false;
            }
            // بررسی شماره تلفن (ساده: حداقل 11 رقم)
            const phoneValue = phone.value.trim();
            if (!phoneValue) {
                errorMsg += 'شماره تلفن الزامی است.\n';
                isValid = false;
            } else if (!/^09[0-9]{9}$/.test(phoneValue)) {
                errorMsg += 'شماره تلفن باید با 09 شروع و 11 رقم باشد.\n';
                isValid = false;
            }
            // بررسی ایمیل
            const emailValue = email.value.trim();
            if (!emailValue) {
                errorMsg += 'ایمیل الزامی است.\n';
                isValid = false;
            } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(emailValue)) {
                errorMsg += 'فرمت ایمیل صحیح نیست.\n';
                isValid = false;
            }
            // بررسی رمز عبور
            if (!password.value) {
                errorMsg += 'رمز عبور الزامی است.\n';
                isValid = false;
            } else if (password.value.length < 6) {
                errorMsg += 'رمز عبور باید حداقل ۶ کاراکتر باشد.\n';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMsg);
            }
        });
    }
});
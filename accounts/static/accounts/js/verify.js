// static/js/verify.js

document.addEventListener('DOMContentLoaded', function() {
    // مدت زمان به ثانیه (۲ دقیقه)
    let timeLeft = 120;
    const timerDisplay = document.getElementById('countdown');
    const resendBtn = document.getElementById('resend-btn');
    let timerInterval = null;

    // تابع تبدیل ثانیه به فرمت mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // شروع تایمر
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = '00:00';
                resendBtn.disabled = false;
            } else {
                timeLeft--;
                timerDisplay.textContent = formatTime(timeLeft);
            }
        }, 1000);
    }

    // ریست تایمر (بعد از ارسال مجدد کد)
    function resetTimer() {
        timeLeft = 120;
        timerDisplay.textContent = formatTime(timeLeft);
        resendBtn.disabled = true;
        if (timerInterval) clearInterval(timerInterval);
        startTimer();
    }

    // ارسال مجدد کد با AJAX
    if (resendBtn) {
        resendBtn.addEventListener('click', function() {
            if (resendBtn.disabled) return;

            // دریافت CSRF token از کوکی یا از متغیر سراسری
            const csrftoken = getCookie('csrftoken');

            fetch(resendUrl, {  // resendUrl باید در HTML تعریف شود
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    alert("کد جدید برای شما ارسال شد.");
                    resetTimer();
                } else {
                    alert("خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.");
                }
            })
            .catch(err => alert("مشکل در ارتباط با سرور"));
        });
    }

    // تابع کمکی برای دریافت کوکی
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // شروع تایمر
    startTimer();
});
// static/home/js/index.js
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    // بستن همه منوها
    function closeAllDropdowns(except = null) {
        dropdowns.forEach(dropdown => {
            if (except !== dropdown) {
                dropdown.classList.remove('open');
            }
        });
    }

    // باز کردن یا بستن یک منو
    function toggleDropdown(dropdown) {
        if (dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        } else {
            closeAllDropdowns(dropdown);
            dropdown.classList.add('open');
        }
    }

    // اضافه کردن رویداد کلیک به دکمه هر dropdown
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('[data-dropdown-btn]');
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleDropdown(dropdown);
            });
        }
    });

    // اگر بیرون از منو کلیک شود، همه را ببند
    document.addEventListener('click', function (e) {
        let isInside = false;
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) {
                isInside = true;
            }
        });
        if (!isInside) {
            closeAllDropdowns();
        }
    });

    // برای دسکتاپ، اگر هاور از روی منو رفت، آن را ببند (اختیاری)
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('open');
            }
        });
    });
});
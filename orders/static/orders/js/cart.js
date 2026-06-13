// static/orders/js/cart.js
document.addEventListener('DOMContentLoaded', function() {
    const removeLinks = document.querySelectorAll('.cart-simple-table a');
    removeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('آیا از حذف این محصول مطمئن هستید؟')) {
                e.preventDefault();
            }
        });
    });
});
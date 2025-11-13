$(document).ready(function() {
    displayCart();
    updateCartCount();

    $(document).on('click', '.remove-item', function() {
        const id = $(this).data('id');
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    });

    $(document).on('change', '.quantity-input', function() {
        const id = $(this).data('id');
        const qty = parseInt($(this).val());
        if (qty > 0) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const item = cart.find(i => i.id === id);
            if (item) item.quantity = qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    });
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = $('#cartItems');
    const totalEl = $('#totalPrice');

    if (cart.length === 0) {
        container.html('<p class="text-center">Cart is empty</p>');
        totalEl.text('0');
        return;
    }

    let html = '<ul class="list-group">';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price} ₸ × ${item.quantity}</small>
                </div>
                <div>
                    <input type="number" class="form-control form-control-sm d-inline-block w-auto quantity-input" 
                           value="${item.quantity}" min="1" data-id="${item.id}" style="width:60px;">
                    <button class="btn btn-danger btn-sm ms-2 remove-item" data-id="${item.id}">×</button>
                </div>
            </li>`;
    });

    html += '</ul>';
    container.html(html);
    totalEl.text(total.toLocaleString());
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cartCount').text(count);
}
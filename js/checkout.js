$(document).ready(function() {
    displayOrderSummary();

    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const email = $('input[type="email"]').val();
        const phone = $('input[type="tel"]').val();
        const card = $('input[placeholder*="cart"]').val().replace(/\s/g, '');

        if (!email.includes('@') || phone.length !== 11 || card.length !== 16) {
            alert('Fill correctly!');
            return;
        }

        // jQuery fade effect
        $('main').fadeOut(500, function() {
            $('body').html(`
                <div class="container text-center py-5">
                    <h1 class="text-success">Payment successful!</h1>
                    <p>Tickets have been sent to your email.</p>
                    <a href="index.html" class="btn btn-primary">To the Home page</a>
                </div>
            `);
        });

        localStorage.removeItem('cart');
    });
});



function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = $('#orderSummary');
    const totalEl = $('#checkoutTotal');

    if (cart.length === 0) {
        container.html('<p>Cart is empty</p>');
        totalEl.text('0');
        return;
    }

    let html = '<ul class="list-group list-group-flush">';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `<li class="list-group-item d-flex justify-content-between">
            <span>${item.name} × ${item.quantity}</span>
            <span>${itemTotal.toLocaleString()} ₸</span>
        </li>`;
    });

    html += '</ul>';
    container.html(html);
    totalEl.text(total.toLocaleString());
}
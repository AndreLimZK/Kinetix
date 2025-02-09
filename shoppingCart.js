document.addEventListener('DOMContentLoaded', () => {
    let cartItems = document.querySelectorAll('.item');
    const subtotalElement = document.getElementById('subtotal-price');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const totalElement = document.getElementById('total-price');
    const promoCodeInput = document.getElementById('promo-code-input');
    const applyPromoButton = document.getElementById('apply-promo-button');
    let promoApplied = false;

    function updateCartItems() {
        cartItems = document.querySelectorAll('.item');
    }

    cartItems.forEach(item => {
        const plusBtn = item.querySelector('.plus-btn');
        const minusBtn = item.querySelector('.minus-btn');
        const deleteBtn = item.querySelector('.delete-btn');
        const likeBtn = item.querySelector('.like-btn');
        const quantityInput = item.querySelector('input[type="text"]');
        const totalPriceElement = item.querySelector('.total-price');
        const price = parseFloat(totalPriceElement.textContent.replace('$', ''));

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotalPrice(totalPriceElement, price, quantity);
            updateSubtotal();
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateTotalPrice(totalPriceElement, price, quantity);
                updateSubtotal();
            }
        });

        deleteBtn.addEventListener('click', () => {
            item.remove();
            updateCartItems();
            updateSubtotal();
        });

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('is-active');
        });

        quantityInput.addEventListener('input', () => {
            let quantity = parseInt(quantityInput.value);
            if (!isNaN(quantity) && quantity > 0) {
                updateTotalPrice(totalPriceElement, price, quantity);
                updateSubtotal();
            }
        });
    });

    applyPromoButton.addEventListener('click', () => {
        const promoCode = promoCodeInput.value.trim();
        if (promoCode === 'DISCOUNT10' && !promoApplied) {
            promoApplied = true;
            updateSubtotal();
            alert('Promo code applied successfully!');
        } else if (promoApplied) {
            alert('Promo code already applied.');
        } else {
            alert('Invalid promo code.');
        }
    });

    function updateTotalPrice(element, price, quantity) {
        const totalPrice = (price * quantity).toFixed(2);
        element.textContent = `$${totalPrice}`;
    }

    function updateSubtotal() {
        let subtotal = 0;
        cartItems.forEach(item => {
            const totalPriceElement = item.querySelector('.total-price');
            const totalPrice = parseFloat(totalPriceElement.textContent.replace('$', ''));
            subtotal += totalPrice;
        });
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

        const deliveryFee = 0;
        deliveryFeeElement.textContent = `$${deliveryFee.toFixed(2)}`;

        let total = subtotal + deliveryFee;
        if (promoApplied) {
            total *= 0.9; // Apply 10% discount
        }
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Initial subtotal calculation
    updateSubtotal();
});
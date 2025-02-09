document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.item');

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
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateTotalPrice(totalPriceElement, price, quantity);
            }
        });

        deleteBtn.addEventListener('click', () => {
            item.remove();
        });

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('is-active');
        });
    });

    function updateTotalPrice(element, price, quantity) {
        const totalPrice = (price * quantity).toFixed(2);
        element.textContent = `$${totalPrice}`;
    }
});
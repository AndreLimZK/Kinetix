document.getElementById('credit-card-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        window.location.href = 'payment.html';
    }
});

function validateForm() {
    const cardNumber = document.getElementById('card-number').value;
    const cardholderName = document.getElementById('cardholder-name').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const securityCode = document.getElementById('security-code').value;

    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number.');
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardholderName)) {
        alert('Please enter a valid cardholder name.');
        return false;
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
        alert('Please enter a valid expiry date in MM/YY format.');
        return false;
    }

    if (!/^\d{3}$/.test(securityCode)) {
        alert('Please enter a valid 3-digit security code.');
        return false;
    }

    return true;
}
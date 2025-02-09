function submitForm(action) {
    const form = document.getElementById('delivery-form');
    if (form.checkValidity()) {
        form.action = action;
        form.submit();
    } else {
        form.reportValidity();
    }
}
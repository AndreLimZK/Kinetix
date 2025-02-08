// Function to handle account click
function handleAccountClick() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        // Redirect to account page if logged in
        window.location.href = 'account.html';
    } else {
        // Open login overlay if not logged in
        document.getElementById('login-overlay').style.display = 'block';
    }
}

// Function to handle login (this should be called on form submission)
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    // Get the email and country values
    const email = event.target.email.value;
    const country = document.getElementById('selected-country').textContent;

    // Store the email and country in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('country', country);

    // Mask the email
    const maskedEmail = maskEmail(email);

    // Display the masked email in the OTP overlay
    document.querySelector('.login-sent p').textContent = `A verification code has been sent to ${maskedEmail}`;

    // Close the login overlay
    document.getElementById('login-overlay').style.display = 'none';

    // Open the OTP overlay
    document.getElementById('otp-overlay').style.display = 'block';
}

// Function to mask the email
function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = `${localPart[0]}*****${localPart.slice(-1)}`;
    return `${maskedLocalPart}@${domain}`;
}

// Function to handle OTP verification (this should be called on form submission)
function handleOtp(event) {
    event.preventDefault(); // Prevent form submission

    // Perform OTP verification logic here

    // If OTP is correct, set the login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Close the OTP overlay
    document.getElementById('otp-overlay').style.display = 'none';

    // Redirect to account page
    window.location.href = 'account.html';
}

// Function to handle OTP input restrictions and auto-focus
function handleOtpInput(event) {
    const input = event.target;
    const value = input.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
        input.value = value.replace(/\D/g, '');
        alert('Only numbers are allowed');
        event.preventDefault(); // Prevent default behavior
        return;
    }

    // Move to the next input box if a number is entered
    if (value.length === 1 && input.nextElementSibling) {
        input.nextElementSibling.focus();
    }

    // Move to the previous input box if backspace is pressed
    if (event.key === 'Backspace' && value.length === 0 && input.previousElementSibling) {
        input.previousElementSibling.focus();
    }
}

// Function to close overlays when clicking outside of them
function handleClickOutside(event) {
    const loginOverlay = document.getElementById('login-overlay');
    const otpOverlay = document.getElementById('otp-overlay');

    if (event.target === loginOverlay) {
        loginOverlay.style.display = 'none';
    }

    if (event.target === otpOverlay) {
        otpOverlay.style.display = 'none';
    }
}

// Function to toggle the country dropdown
function toggleCountryDropdown() {
    const dropdown = document.getElementById('country-dropdown');
    
    // Ensure it's actually being toggled
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

// Function to select a country from the dropdown
function selectCountry(event) {
    const selectedCountry = event.target.value;
    document.getElementById('selected-country').textContent = selectedCountry;
    document.getElementById('country-dropdown').style.display = 'none';
}

// Add event listener to the login form
document.querySelector('#login-overlay .modal-content').addEventListener('submit', handleLogin);

// Add event listener to the OTP form
document.querySelector('#otp-overlay .modal-content').addEventListener('submit', handleOtp);

// Add event listeners to OTP input boxes
document.querySelectorAll('.otp-input').forEach(input => {
    input.addEventListener('input', handleOtpInput);
    input.addEventListener('keydown', handleOtpInput);
});

// Add event listener to close overlays when clicking outside of them
window.addEventListener('click', handleClickOutside);
// Function to handle logout
function handleLogout() {
    // Remove the login status from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the home page or login page
    window.location.href = 'index.html';
}

// Add event listener to the logout button
document.getElementById('logout-button').addEventListener('click', handleLogout);
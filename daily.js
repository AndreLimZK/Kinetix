function openOverlay(overlayId) {
    document.getElementById(overlayId).classList.add('show');
}

function closeOverlay(overlayId) {
    document.getElementById(overlayId).classList.remove('show');
}

// Close the overlay when clicking outside of the overlay content
document.getElementById('daily-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeOverlay('daily-overlay');
    }
});

document.getElementById('gacha-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeOverlay('gacha-overlay');
    }
});

document.getElementById('gacha-pic-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeOverlay('gacha-pic-overlay');
    }
});

// Add event listener to the "CLAIM" button
document.querySelector('.claim-daily').addEventListener('click', function() {
    closeOverlay('daily-overlay');
});

// Add event listener to the "SPIN" button
document.querySelector('.spin-daily').addEventListener('click', function() {
    closeOverlay('gacha-overlay');
});
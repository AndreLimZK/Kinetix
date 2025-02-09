// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch shoe data from RestDB using jQuery AJAX
function fetchShoeData(shoeId) {
    const apiKey = '67a8c617c4c19ad0a71c2c02'; // Replace with your RestDB API key
    const url = `https://kinetix-a8ba.restdb.io/rest/shoes?q={"id":"${shoeId}"}`; // Replace with your RestDB URL
    const mediaUrl = 'https://kinetix-a8ba.restdb.io/media/'; // Replace with your RestDB media URL

    console.log(`Fetching data for shoe ID: ${shoeId}`);
    console.log(`Request URL: ${url}`);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        }
    };

    return $.ajax(settings).done(function (response) {
        console.log('Full shoe data:', response[0]); // Debug log

        // Handle image URL construction
        if (response[0] && response[0].image) {
            const imageUrl = `${mediaUrl}${response[0].image}`;
            response[0].imageUrl = imageUrl;
            console.log('Constructed image URL:', imageUrl); // Debug log
        }

        return response[0];
    }).fail(function (error) {
        console.error('Error fetching shoe data:', error);
        return null;
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the shoe id from the URL
    const shoeId = getQueryParam('id');
    console.log(`Shoe ID from URL: ${shoeId}`); // Debug log

    if (!shoeId) {
        console.error('No shoe ID found in URL');
        document.getElementById('shoe-name').textContent = 'Shoe not found';
        return;
    }

    // Fetch and display the shoe data
    fetchShoeData(shoeId).then(shoe => {
        if (shoe) {
            if (shoe.imageUrl) {
                document.getElementById('shoe-image').src = shoe.imageUrl;
            } else {
                console.error('No image URL available for this shoe');
            }
            document.getElementById('shoe-name').textContent = shoe.name;
            document.getElementById('shoe-price').textContent = `$${shoe.price}`;
        } else {
            document.getElementById('shoe-name').textContent = 'Shoe not found';
            document.getElementById('shoe-price').textContent = '';
        }
    }).catch(error => {
        console.error('Error displaying shoe data:', error);
    });
});
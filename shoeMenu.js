document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '67a8c617c4c19ad0a71c2c02';
    const apiUrl = 'https://kinetix-a8ba.restdb.io/rest/shoes';

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const productId = getUrlParameter('id');

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-apikey': apiKey,
            'cache-control': 'no-cache'
        }
    })
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => item._id === productId);
        if (product) {
            updateShoeMenu(product);
        } else {
            console.error('Product not found');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    function updateShoeMenu(product) {
        const productTitle = document.querySelector('.product-title');
        const productPrice = document.querySelector('.product-price');
        const productImage = document.getElementById('main-shoe-image');
        const productVar = document.querySelector('.product-var');

        productTitle.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        productImage.src = product.image;

        productVar.innerHTML = ''; // Clear existing variants
        product.variants.forEach(variant => {
            const variantElement = document.createElement('a');
            variantElement.href = '#';
            variantElement.innerHTML = `<img src="${variant.image}" alt="${variant.color}">`;
            productVar.appendChild(variantElement);
        });
    }
});
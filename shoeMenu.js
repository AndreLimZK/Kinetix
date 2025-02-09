document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '67a8c617c4c19ad0a71c2c02';
    const apiUrl = 'https://kinetix-a8ba.restdb.io/rest/shoes';

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
        updateShoeMenu(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    function updateShoeMenu(data) {
        const productTitle = document.querySelector('.product-title');
        const productPrice = document.querySelector('.product-price');
        const productImage = document.getElementById('main-shoe-image');
        const productVar = document.querySelector('.product-var');

        // Assuming data is an array of products
        const product = data[0]; // Example: Get the first product

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
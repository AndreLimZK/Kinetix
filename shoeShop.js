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
        updateShoeShop(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    function updateShoeShop(data) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; // Clear existing products

        data.forEach(product => {
            const productCard = document.createElement('a');
            productCard.href = `shoeMenu.html?id=${product._id}`;
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });
    }
});
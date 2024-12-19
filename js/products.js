const ProductManager = {
    displayProducts(filterProducts = products) {
        const productsContainer = document.getElementById('productsContainer');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';

        filterProducts.forEach(product => {
            productsContainer.innerHTML += `
                <div class="product">
                    <div>
                        <img class="product-image" src="./images/${product.imageSrc}" alt="${product.name}">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <h4>$${product.price.toFixed(2)}</h4>
                            ${this.generateStarRating(product.rating)}
                        </div>
                    </div>
                    <div class="product-icons">
                        <div>
                            <i class="fa-regular fa-eye fa-2xl" data-product-id="${product.id}"></i>
                        </div>
                        <div>
                            <i class="fa-solid fa-plus fa-2xl" data-product-id="${product.id}"></i>
                        </div>
                    </div>
                </div>`;
        });

        this.attachEventListeners();
    },

    generateStarRating(rating) {
        let stars = '<div class="product-rating">';
        for (let i = 0; i < 5; i++) {
            stars += `<span class="star ${i < rating ? 'filled' : ''}">★</span>`;
        }
        stars += '</div>';
        return stars;
    },

    filterProducts(category) {
        if (category === 'all products') {
            this.displayProducts();
        } else {
            const filteredProducts = products.filter(
                product => product.category.toLowerCase() === category.toLowerCase()
            );
            this.displayProducts(filteredProducts);
        }
    },

    attachEventListeners() {

        const plusIcons = document.querySelectorAll('.fa-plus');
        plusIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    CartManager.addItem(product);
                }
            });
        });


        const eyeIcons = document.querySelectorAll('.fa-eye');
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                window.location.href = `details.html?id=${productId}`;
            });
        });
    },

    displayProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));
        const product = products.find(p => p.id === productId);

        const detailsContainer = document.getElementById('detailsContainer');
        if (!product || !detailsContainer) return;

        detailsContainer.innerHTML = `
            <div class="product-image-container">
                <img src="./images/${product.imageSrc}" alt="${product.name}">
            </div>
            <div class="details">
                <h3>${product.name}</h3>
                <h3 class="category">${product.category}</h3>
                <h4>$${product.price.toFixed(2)}</h4>
                <div class="product-rating">
                    ${this.generateStarRating(product.rating)}
                </div>
                <p class="product-description">${product.description}</p>
                <p class="stock-info">In Stock: ${product.stock} units</p>
                <div class="quantity-selector">
                    <button class="btn-quantity" onclick="ProductManager.updateQuantity(-1)">-</button>
                    <span id="quantity">1</span>
                    <button class="btn-quantity" onclick="ProductManager.updateQuantity(1)">+</button>
                </div>
                <button class="btn-details" onclick="ProductManager.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>`;
    },

    updateQuantity(change) {
        const quantityElement = document.getElementById('quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity = Math.max(1, currentQuantity + change);
        quantityElement.textContent = currentQuantity;
    },

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById('quantity').textContent);

        if (product) {
            for (let i = 0; i < quantity; i++) {
                CartManager.addItem(product);
            }
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    ProductManager.displayProducts();
    ProductManager.displayProductDetails();


    const filterButtons = document.querySelectorAll('.button-product .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.trim().toLowerCase();
            ProductManager.filterProducts(category);
        });
    });
});
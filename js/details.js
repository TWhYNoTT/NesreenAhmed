const DetailsManager = {

    currentQuantity: 1,

    currentProduct: null,

    init() {
        this.loadProductDetails();

    },



    loadProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));


        this.currentProduct = products.find(p => p.id === productId);

        if (!this.currentProduct) {
            this.handleProductNotFound();
            return;
        }

        this.displayProductDetails();
    },



    handleProductNotFound() {
        const detailsContainer = document.getElementById('detailsContainer');
        if (detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="error-message">
                    <h3>Product Not Found</h3>
                    <p>Sorry, the product you're looking for doesn't exist.</p>
                    <a href="shopping.html" class="btn-details">Return to Shop</a>
                </div>`;
        }
    },



    displayProductDetails() {
        const detailsContainer = document.getElementById('detailsContainer');
        if (!detailsContainer || !this.currentProduct) return;

        const product = this.currentProduct;

        detailsContainer.innerHTML = `
            <div class="">
                <img src="./images/${product.imageSrc}" alt="${product.name}">
            </div>
            <div class="details">
                <h3>${product.name}</h3>
                <h3 class="category">${product.category}</h3>
                <h4 class="price">$${product.price.toFixed(2)}</h4>
                <div class="rating-container">
                    ${this.generateStarRating(product.rating)}
                </div>
                <p class="description">${product.description}</p>
                <p class="stock-info ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock'}
                </p>
                ${product.stock > 0 ? `
                   
                    <button class="btn-details" onclick="DetailsManager.addToCart()">
                        Add to Cart
                    </button>
                ` : `
                    <button class="btn-details" disabled>Out of Stock</button>
                `}
            </div>`;
    },



    generateStarRating(rating) {
        let stars = '<div class="product-rating">';
        for (let i = 0; i < 5; i++) {
            stars += `<span class="star ${i < rating ? 'filled' : ''}">★</span>`;
        }
        stars += '</div>';
        return stars;
    },



    updateQuantity(change) {
        const newQuantity = this.currentQuantity + change;



        if (newQuantity < 1 || newQuantity > this.currentProduct.stock) {
            return;
        }

        this.currentQuantity = newQuantity;



        const quantityElement = document.getElementById('quantity');
        const addToCartButton = document.querySelector('.btn-details');

        if (quantityElement && addToCartButton) {
            quantityElement.textContent = this.currentQuantity;
            addToCartButton.textContent = `Add to Cart - $${(this.currentProduct.price * this.currentQuantity).toFixed(2)}`;
        }
    },



    addToCart() {
        if (!this.currentProduct || this.currentQuantity < 1) {
            return;
        }



        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }



        CartManager.addItem(this.currentProduct, this.currentQuantity);



        this.showNotification(`Added ${this.currentQuantity} ${this.currentProduct.name}(s) to cart`);



        this.currentQuantity = 1;
        this.displayProductDetails();
    },





    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};



document.addEventListener('DOMContentLoaded', () => {
    DetailsManager.init();
});
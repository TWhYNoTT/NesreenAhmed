const CartManager = {
    getCart() {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) return [];

        const carts = JSON.parse(localStorage.getItem('carts'));
        return carts[currentUser.id] || [];
    },

    addItem(product) {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const carts = JSON.parse(localStorage.getItem('carts'));
        if (!carts[currentUser.id]) {
            carts[currentUser.id] = [];
        }



        const existingItem = carts[currentUser.id].find(item => item.id === product.id);

        if (existingItem) {



            existingItem.quantity = (existingItem.quantity || 1) + 1;

        } else {
            carts[currentUser.id].push({

                ...product,



                quantity: 1
            });
        }

        localStorage.setItem('carts', JSON.stringify(carts));
        this.updateCartBadge();
        showNotification(`${product.name} added to cart`);
    },

    updateQuantity(productId, change) {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) return;

        const carts = JSON.parse(localStorage.getItem('carts'));
        const userCart = carts[currentUser.id];
        if (!userCart) return;

        const item = userCart.find(item => item.id === productId);
        if (!item) return;

        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity > 0) {

            item.quantity = newQuantity;

        }

        localStorage.setItem('carts', JSON.stringify(carts));
        this.updateCartBadge();
        this.displayCart();
    },

    removeItem(productId) {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) return;

        const carts = JSON.parse(localStorage.getItem('carts'));
        const userCart = carts[currentUser.id];
        if (!userCart) return;

        carts[currentUser.id] = userCart.filter(item => item.id !== productId);
        localStorage.setItem('carts', JSON.stringify(carts));
        this.updateCartBadge();
        this.displayCart();
    },

    updateCartBadge() {
        const badge = document.querySelector('.badge');

        if (badge) {

            const cart = this.getCart();
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            badge.textContent = totalItems;
        }
    },



    displayCart() {
        const containerCart = document.getElementById('containerCart');

        if (!containerCart) return;

        const cart = this.getCart();

        if (cart.length === 0) {
            containerCart.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="shopping.html" class="btn-details">Continue Shopping</a>
            </div>`;
            return;
        }

        let cartHTML = ``;
        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            totalPrice += itemTotal;

            cartHTML += `
            <div class="cart-item">
                <div class="product-image-container">
                    <img src="./images/${item.imageSrc}" alt="${item.name}" />
                </div>
                
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                
                <div class="container-box">
                    <button class="btn" onclick="CartManager.updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity || 1}</span>
                    <button class="btn" onclick="CartManager.updateQuantity(${item.id}, 1)">+</button>
                </div>
                
                <div class="item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
                
                <div class="item-actions">
                    <i class="fa-solid fa-trash-can fa-xl" onclick="CartManager.removeItem(${item.id})"></i>
                </div>
            </div>`;
        });

        cartHTML += `
        <div class="cart-total">
            <h3>Total: $${totalPrice.toFixed(2)}</h3>
            <button class="btn-details" onclick="CartManager.checkout()">Proceed to Checkout</button>
        </div>`;

        containerCart.innerHTML = cartHTML;
    },

    checkout() {

        const currentUser = DB.users.getCurrentUser();

        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const cart = this.getCart();
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }

        const orders = JSON.parse(localStorage.getItem('orders'));
        const newOrder = {
            id: Date.now().toString(),
            userId: currentUser.id,
            items: cart,
            totalAmount: cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));


        const carts = JSON.parse(localStorage.getItem('carts'));
        carts[currentUser.id] = [];
        localStorage.setItem('carts', JSON.stringify(carts));

        showNotification('Order placed successfully!');
        setTimeout(() => {
            window.location.href = 'order.html';
        }, 2000);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    CartManager.updateCartBadge();
    CartManager.displayCart();
});
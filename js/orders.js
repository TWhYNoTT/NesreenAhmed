const OrderManager = {
    init() {
        this.checkAuth();
        this.displayOrder();
    },


    checkAuth() {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
        }
    },


    displayOrder() {
        const orders = this.getOrders();
        const latestOrder = orders[orders.length - 1];

        const orderContainer = document.querySelector('.order');
        if (!orderContainer) return;

        orderContainer.innerHTML += `
            <div class="order-success">
                <div class="success-header">
                    
                    <h2>Thank You For Your Order!</h2>
                    <p class="order-confirmation">Order #${latestOrder?.id || 'N/A'}</p>
                </div>
                
                ${latestOrder ? this.generateOrderDetails(latestOrder) : ''}
                
                <div class="order-actions">
                    <a href="shopping.html" class="btn-details">Continue Shopping</a>
                    <a href="index.html" class="btn-details secondary">Back to Home</a>
                </div>
            </div>
        `;
    },


    getOrders() {
        const currentUser = DB.users.getCurrentUser();
        if (!currentUser) return [];

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders.filter(order => order.userId === currentUser.id);
    },


    generateOrderDetails(order) {
        return `
            <div class="order-details">
                <div class="order-info">
                    <div class="order-header">
                        <div>
                            <p>Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Status: <span class="order-status ${order.status}">${order.status}</span></p>
                        </div>
                    </div>
                </div>

                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="item-image">
                                <img src="./images/${item.imageSrc}" alt="${item.name}">
                            </div>
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p class="item-category">${item.category}</p>
                                <div class="item-price-qty">
                                    <span class="item-price">$${item.price.toFixed(2)}</span>
                                    <span class="item-quantity">Quantity: ${item.quantity}</span>
                                </div>
                                <p class="item-total">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>$${order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>$0.00</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>$${order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    },




    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
};



document.addEventListener('DOMContentLoaded', () => {

    OrderManager.init();

});


document.addEventListener('DOMContentLoaded', () => {


    const arraySrc = ['./images/1.jpg', './images/2.jpg', './images/3.jpg'];
    const img = document.getElementById('img');
    let index = 0;

    function slideShow() {
        if (index >= arraySrc.length) {
            index = 0;
        }
        if (img) {
            img.src = arraySrc[index];
            index++;
        }
    }



    if (img) {
        slideShow();
        setInterval(slideShow, 3000);
    }


    const featuredProducts = products.slice(0, 4);

    const featuredContainer = document.getElementById('featuredProducts');

    if (featuredContainer) {
        featuredContainer.innerHTML = featuredProducts.map(product => `
            <div class="product">
                <div>
                    <img class="product-image" src="./images/${product.imageSrc}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <h4>$${product.price.toFixed(2)}</h4>
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
            </div>
        `).join('');



        ProductManager.attachProductEventListeners();
    }
});
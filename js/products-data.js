const products = [
    // Food & Drinks
    {
        id: 1,
        name: "Red Hot Tomato",
        category: "food & drinks",
        price: 118.26,
        imageSrc: "1.png",
        rating: 5,
        description: "Fresh, ripe tomatoes perfect for cooking or salads",
        stock: 50
    },
    {
        id: 2,
        name: "Fresh Vegetable Juice",
        category: "food & drinks",
        price: 68.00,
        imageSrc: "2.png",
        rating: 4,
        description: "Healthy blend of fresh vegetables",
        stock: 30
    },
    {
        id: 3,
        name: "Orange Fresh Juice",
        category: "food & drinks",
        price: 73.00,
        imageSrc: "3.png",
        rating: 3,
        description: "100% pure squeezed orange juice",
        stock: 40
    },
    {
        id: 4,
        name: "Poultry Farm Meat",
        category: "food & drinks",
        price: 58.50,
        imageSrc: "4.png",
        rating: 2,
        description: "Farm-fresh poultry meat",
        stock: 25
    },
    {
        id: 5,
        name: "Mixed Vegetable Juice",
        category: "food & drinks",
        price: 68.00,
        imageSrc: "5.png",
        rating: 5,
        description: "Blend of seasonal vegetables",
        stock: 35
    },
    {
        id: 6,
        name: "Premium Orange Juice",
        category: "food & drinks",
        price: 73.60,
        imageSrc: "6.png",
        rating: 4,
        description: "Premium quality orange juice",
        stock: 45
    },
    {
        id: 7,
        name: "Select Farm Meat",
        category: "food & drinks",
        price: 58.50,
        imageSrc: "7.png",
        rating: 3,
        description: "Selected quality farm meat",
        stock: 20
    },
    {
        id: 8,
        name: "Fresh Butter Cake",
        category: "food & drinks",
        price: 135.00,
        imageSrc: "8.png",
        rating: 2,
        description: "Freshly baked butter cake",
        stock: 15
    },

    // Vegetables
    {
        id: 9,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 118.26,
        imageSrc: "veg1.jpg",
        rating: 5,
        description: "Garden-fresh tomatoes",
        stock: 60
    },
    {
        id: 10,
        name: "Green Vegetables",
        category: "vegetables",
        price: 118.26,
        imageSrc: "veg2.jpeg",
        rating: 3,
        description: "Fresh green vegetables",
        stock: 40
    },
    {
        id: 11,
        name: "Organic Carrots",
        category: "vegetables",
        price: 118.26,
        imageSrc: "veg3.jpeg",
        rating: 4,
        description: "Organic farm carrots",
        stock: 45
    },
    {
        id: 12,
        name: "Fresh Lettuce",
        category: "vegetables",
        price: 118.26,
        imageSrc: "veg4.jpg",
        rating: 2,
        description: "Crispy fresh lettuce",
        stock: 30
    },

    // Dried Foods
    {
        id: 17,
        name: "Dried Nuts Mix",
        category: "dried foods",
        price: 118.26,
        imageSrc: "died1.jpeg",
        rating: 5,
        description: "Premium mixed nuts",
        stock: 100
    },
    {
        id: 18,
        name: "Dried Fruits",
        category: "dried foods",
        price: 118.26,
        imageSrc: "died2.jpeg",
        rating: 1,
        description: "Assorted dried fruits",
        stock: 80
    },
    {
        id: 19,
        name: "Trail Mix",
        category: "dried foods",
        price: 118.26,
        imageSrc: "died3.jpeg",
        rating: 3,
        description: "Healthy trail mix blend",
        stock: 75
    },
    {
        id: 20,
        name: "Dried Berries",
        category: "dried foods",
        price: 118.26,
        imageSrc: "died4.jpeg",
        rating: 4,
        description: "Mixed dried berries",
        stock: 60
    },

    // Bread & Cake
    {
        id: 25,
        name: "Whole Wheat Bread",
        category: "bread & cake",
        price: 118.26,
        imageSrc: "cake1.jpeg",
        rating: 4,
        description: "Fresh whole wheat bread",
        stock: 25
    },
    {
        id: 26,
        name: "Chocolate Cake",
        category: "bread & cake",
        price: 118.26,
        imageSrc: "cake2.jpeg",
        rating: 5,
        description: "Rich chocolate cake",
        stock: 20
    },
    {
        id: 27,
        name: "Vanilla Cake",
        category: "bread & cake",
        price: 118.26,
        imageSrc: "cake3.jpeg",
        rating: 4,
        description: "Classic vanilla cake",
        stock: 15
    },
    {
        id: 28,
        name: "French Baguette",
        category: "bread & cake",
        price: 118.26,
        imageSrc: "cake4.jpeg",
        rating: 3,
        description: "Traditional French baguette",
        stock: 30
    },

    // Fish & Meat
    {
        id: 33,
        name: "Fresh Salmon",
        category: "fish & meat",
        price: 15.00,
        imageSrc: "f1.jpeg",
        rating: 5,
        description: "Fresh Atlantic salmon",
        stock: 20
    },
    {
        id: 34,
        name: "Tuna Steak",
        category: "fish & meat",
        price: 10.00,
        imageSrc: "f2.jpeg",
        rating: 4,
        description: "Premium tuna steak",
        stock: 15
    },
    {
        id: 35,
        name: "Beef Steak",
        category: "fish & meat",
        price: 118.26,
        imageSrc: "m1.jpeg",
        rating: 5,
        description: "Premium beef steak",
        stock: 25
    },
    {
        id: 36,
        name: "Chicken Breast",
        category: "fish & meat",
        price: 118.26,
        imageSrc: "ch1.jpeg",
        rating: 4,
        description: "Fresh chicken breast",
        stock: 40
    }
];


if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
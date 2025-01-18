// import { products } from "/content/image.js";

// export function initializeProducts(){

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function addToCart(id){
//     const product = products.find(p=>p.id===id);
//     if(product){
//         const existItem = cart.find(item=>item.id===id);
//         if(existItem){
//             existItem.quantity += 1;
//         }
//         else{
//             cart.push({
//                 ...product,
//                 quantity:1
//             })
//         }
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
    
// }

// // Update cart count
// function updateCartCount() {
//     const cartCount = document.querySelector('.cart-count');
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     cartCount.textContent = totalItems;
// }

// // Render cart items
// function renderCart() {
//     const cartContainer = document.querySelector('.cart-items');
//     if (cart.length === 0) {
//         cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
//         return;
//     }

//     cartContainer.innerHTML = cart.map(item => `
//         <div class="cart-item" data-id="${item.id}">
//             <img src="${item.image}" alt="${item.name}" class="item-image">
//             <div class="item-details">
//                 <h3>${item.name}</h3>
//                 <p class="item-price">Rs ${item.price}</p>
//             </div>
//             <div class="quantity-controls">
//                 <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
//                 <span>${item.quantity}</span>
//                 <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
//             </div>
//         </div>
//     `).join('');

//     updateOrderSummary();
// }

// // Update item quantity
// function updateQuantity(productId, change) {
//     const item = cart.find(item => item.id === productId);
//     if (item) {
//         const newQuantity = item.quantity + change;
//         if (newQuantity >= 0) {
//             item.quantity = newQuantity;
//             if (newQuantity === 0) {
//                 cart = cart.filter(item => item.id !== productId);
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             renderCart();
//             updateCartCount();
//         }
//     }
// }

// // Update order summary
// function updateOrderSummary() {
//     const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const discount = Math.round(subtotal * 0.1);
//     const deliveryFee = 50;
//     const total = subtotal - discount + deliveryFee;

//     document.getElementById('subtotal').textContent = `Rs ${subtotal}`;
//     document.getElementById('discount').textContent = `-Rs ${discount}`;
//     document.getElementById('total').textContent = `Rs ${total}`;
// }

// // Initialize the cart page
// document.addEventListener('DOMContentLoaded', () => {
//     renderCart();
//     updateCartCount();
// });

// }

// import { products } from "/content/image.js";

// // Declare cart globally to avoid scope dependency
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Function to add items to the cart
// function addToCart(id) {
//     const product = products.find(p => p.id === id);
//     if (product) {
//         const existItem = cart.find(item => item.id === id);
//         if (existItem) {
//             existItem.quantity += 1;
//         } else {
//             cart.push({
//                 ...product,
//                 quantity: 1,
//             });
//             alert("Added to cart");
//         }
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Ensure addToCart is accessible globally
// window.addToCart = addToCart;

// export function initializeProducts() {
// // Update cart count
//     function updateCartCount() {
//         const cartCount = document.querySelector('.cart-count');
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         if (cartCount) {
//             cartCount.textContent = totalItems;
//         }
//     }

//     // Render cart items
//     function renderCart() {
//         const cartContainer = document.querySelector('.cart-items');
//         if (cartContainer) {
//             if (cart.length === 0) {
//                 cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
//                 return;
//             }

//             cartContainer.innerHTML = cart.map(item => `
//                 <div class="cart-item" data-id="${item.id}">
//                     <img src="${item.image}" alt="${item.name}" class="item-image">
//                     <div class="item-details">
//                         <h3>${item.name}</h3>
//                         <p class="item-price">Rs ${item.price}</p>
//                     </div>
//                     <div class="quantity-controls">
//                         <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
//                         <span>${item.quantity}</span>
//                         <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
//                     </div>
//                 </div>
//             `).join('');

//             updateOrderSummary();
//         }
//     }

//     // Update item quantity
//     function updateQuantity(productId, change) {
//         const item = cart.find(item => item.id === productId);
//         if (item) {
//             const newQuantity = item.quantity + change;
//             if (newQuantity >= 0) {
//                 item.quantity = newQuantity;
//                 if (newQuantity === 0) {
//                     cart = cart.filter(item => item.id !== productId);
//                 }
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 renderCart();
//                 updateCartCount();
//             }
//         }
//     }

//     // Update order summary
//     function updateOrderSummary() {
//         const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         const discount = Math.round(subtotal * 0.1);
//         const deliveryFee = 50;
//         const total = subtotal - discount + deliveryFee;

//         document.getElementById('subtotal').textContent = `Rs ${subtotal}`;
//         document.getElementById('discount').textContent = `-Rs ${discount}`;
//         document.getElementById('total').textContent = `Rs ${total}`;
//     }

//     // Initialize the cart page
//     renderCart();
//     updateCartCount();
// }

// // Ensure addToCart is accessible globally
// window.addToCart = addToCart;




// import { products } from "/content/image.js";

// // Declare cart globally to avoid scope dependency
// export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Function to add items to the cart
// function addToCart(id) {
//     const product = products.find(p => p.id === id);
//     if (product) {
//         const existItem = cart.find(item => item.id === id);
//         if (existItem) {
//             existItem.quantity += 1;
//         } else {
//             cart.push({
//                 ...product,
//                 quantity: 1,
//             });
//             alert("Added to cart");
//         }
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount(); // Update cart count after adding an item
// }

// // Ensure addToCart is accessible globally
// export {addToCart};
// // window.addToCart = addToCart;

// // Function to update cart count
// function updateCartCount() {
//     const cartCount = document.querySelector('.cart-count');
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     if (cartCount) {
//         cartCount.textContent = totalItems;
//     }
// }

// // Function to render cart items
// function renderCart() {
//     const cartContainer = document.querySelector('.cart-items');
//     if (cartContainer) {
//         if (cart.length === 0) {
//             cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
//             return;
//         }

//         cartContainer.innerHTML = cart.map(item => `
//             <div class="cart-item" data-id="${item.id}">
//                 <img src="${item.image}" alt="${item.name}" class="item-image">
//                 <div class="item-details">
//                     <h3>${item.name}</h3>
//                     <p class="item-price">Rs ${item.price}</p>
//                 </div>
//                 <div class="quantity-controls">
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
//                     <span>${item.quantity}</span>
//                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
//                 </div>
//             </div>
//         `).join('');

//         updateOrderSummary();
//     }
// }

// // Function to update item quantity
// function updateQuantity(productId, change) {
//     const item = cart.find(item => item.id === productId);
//     if (item) {
//         const newQuantity = item.quantity + change;
//         if (newQuantity >= 0) {
//             item.quantity = newQuantity;
//             if (newQuantity === 0) {
//                 cart = cart.filter(item => item.id !== productId);
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             renderCart();
//             updateCartCount();
//         }
//     }
// }

// // Function to update order summary
// function updateOrderSummary() {
//     const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const discount = Math.round(subtotal * 0.1);
//     const deliveryFee = 50;
//     const total = subtotal - discount + deliveryFee;

//     document.getElementById('subtotal').textContent = `Rs ${subtotal}`;
//     document.getElementById('discount').textContent = `-Rs ${discount}`;
//     document.getElementById('total').textContent = `Rs ${total}`;
// }

// // Initialize the cart page
// function initialize() {
//     renderCart();
//     updateCartCount();
// }

// // Ensure initializeProducts is accessible globally
//  window.initialize = initialize;

//  export {initialize}


import { products } from "/content/image.js";

// Declare cart globally to avoid scope dependency
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
export function addToCart(id) {
    console.log(id);
    const product = products.find(p => p.id === id);
    if (product) {
        const existItem = cart.find(item => item.id === id);
        if (existItem) {
            existItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
            });
            alert("Added to cart");
        }
    } else {
        console.error(`Product with id ${id} not found`);
    }
    saveCart();
    updateCartCount();
}

window.addToCart=addToCart;

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    } else {
        console.warn("Cart count element not found in the DOM.");
    }
}

// Function to render cart items
function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">Rs ${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}" data-change="1">+</button>
                </div>
            </div>
        `).join('');

        attachQuantityListeners();
        updateOrderSummary();
    } else {
        console.warn("Cart container not found in the DOM.");
    }
}

// Function to handle quantity updates
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 0) {
            item.quantity = newQuantity;
            if (newQuantity === 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            saveCart();
            renderCart();
            updateCartCount();
        }
    } else {
        console.error(`Item with id ${productId} not found in the cart.`);
    }
}

// Attach event listeners to quantity buttons dynamically
function attachQuantityListeners() {
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id, 10);
            const change = parseInt(event.target.dataset.change, 10);
            if (!isNaN(productId) && !isNaN(change)) {
                updateQuantity(productId, change);
            } else {
                console.error("Invalid product ID or change value in quantity button.");
            }
        });
    });
}

// Function to update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = Math.round(subtotal * 0.1);
    const deliveryFee = 50;
    const total = subtotal - discount + deliveryFee;

    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');

    if (subtotalElement && discountElement && totalElement) {
        subtotalElement.textContent = `Rs ${subtotal}`;
        discountElement.textContent = `-Rs ${discount}`;
        totalElement.textContent = `Rs ${total}`;
    } else {
        console.warn("Order summary elements not found in the DOM.");
    }
}

// Initialize the cart page
export function initialize() {
    renderCart();
    updateCartCount();
}

window.initialize=initialize;

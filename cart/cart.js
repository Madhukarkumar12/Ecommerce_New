
import { products } from "/content/image.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    syncCartWithBackend();
}

async function syncCartWithBackend() {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser || !storedUser.email) {
        console.error("User not logged in. Cannot sync cart.");
        return;
    }
    try {
        const response = await fetch('/save-cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: storedUser.email, cart })
        });
        const data = await response.json();
        console.log("Cart sync response:", data);
    } catch (error) {
        console.error("Error syncing cart with backend:", error);
    }
}

export function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    } else {
        console.warn("Cart count element not found in the DOM.");
    }
}

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
                <div><i class="fa-solid fa-trash delete-btn" data-id="${item.id}"></i></div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
                </div>
            </div>
        `).join('');

        attachQuantityListeners();
        attachDeleteListeners();
        updateOrderSummary();
    } else {
        console.warn("Cart container not found in the DOM.");
    }
}

function attachQuantityListeners() {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id, 10);
            const change = parseInt(event.target.dataset.change, 10);
            if (!isNaN(productId) && !isNaN(change)) {
                updateQuantity(productId, change);
            }
        });
    });
}

function attachDeleteListeners() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.id, 10);
            deleteItem(productId);
        });
    });
}


function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else if (newQuantity === 0) {
            showSnackbar("Quantity is already at 1. To remove the item, use the remove button.");
            return;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Show snackbar
function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) {
        console.error("Snackbar element not found!");
        return;
    }
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}


function deleteItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

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

export function initialize() {
    renderCart();
    updateCartCount();
}

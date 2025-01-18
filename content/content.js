import { addToCart,initialize } from '/cart/cart.js';
import { products } from '/content/image.js';
import {cart} from '/cart/cart.js';



export function initializeProducts(){
const productsContainer = document.getElementById('productsContainer');
const showMoreBtn = document.getElementById('showMoreBtn');
const initialDisplay = 6;
let currentlyShown = initialDisplay;

function createProductCard(product) {
    return `
        <div class="product-card"  data-id="${product.id}"> 
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rs ${product.price}</p>
            <div class="product-buttons">
                <button class="add-to-cart" >Add to Cart</button>
                <button class="more">More</button>
            </div>
        </div>
    `;
}


    // Add event listener to the products container for "Add to Cart" buttons
    // productsContainer.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('add-to-cart')) {
    //         const productCard = event.target.closest('.product-card');
    //         const productId = parseInt(productCard.dataset.id, 10); // Extract the product ID
    //         addToCart(productId); // Call the global addToCart function
    //     }
    // });

    document.addEventListener('DOMContentLoaded', () => {
        const productsContainer = document.querySelector('.products-container');
        productsContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('add-to-cart')) {
                const productCard = event.target.closest('.product-card');
                const productId = parseInt(productCard.dataset.id, 10); // Extract the product ID
                addToCart(productId); // Call the global addToCart function
            }
        });

        

        
    });

    
function displayProducts(start, end) {
    const productsToShow = products.slice(start, end);
    productsToShow.forEach(product => {
        productsContainer.innerHTML += createProductCard(product);
    });
}

// Initial display
displayProducts(0, initialDisplay);

// Show more button functionality
showMoreBtn.addEventListener('click', () => {
    // displayProducts(currentlyShown, products.length);
    const initial=currentlyShown;
    const final=currentlyShown+3;
    displayProducts(initial,final);
    if(final===products.length){
        showMoreBtn.style.display = 'none';
    }
    currentlyShown=final;
    
    // currentlyShown = products.length;
});

initialize();
}





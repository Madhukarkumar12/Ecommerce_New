import { products } from '/content/image.js';


export function initializeProducts(){
const productsContainer = document.getElementById('productsContainer');
const showMoreBtn = document.getElementById('showMoreBtn');
const initialDisplay = 6;
let currentlyShown = initialDisplay;

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rs ${product.price}</p>
            <div class="product-buttons">
                <button class="add-to-cart">Add to Cart</button>
                <button class="more">More</button>
            </div>
        </div>
    `;
}

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
    displayProducts(currentlyShown, products.length);
    showMoreBtn.style.display = 'none';
    currentlyShown = products.length;
});

}

// import { products } from '/content/image.js';

// export function initializeProducts() {
//     const productsContainer = document.getElementById('productsContainer');
//     const showMoreBtn = document.getElementById('showMoreBtn');
//     const initialDisplay = 6; // Number of products to display initially
//     let currentlyShown = initialDisplay;

//     // Function to create a product card
//     function createProductCard(product) {
//         return `
//             <div class="product-card">
//                 <img src="${product.image}" alt="${product.name}">
//                 <h3>${product.name}</h3>
//                 <p>Rs ${product.price}</p>
//                 <div class="product-buttons">
//                     <button class="add-to-cart">Add to Cart</button>
//                     <button class="more">More</button>
//                 </div>
//             </div>
//         `;
//     }

//     // Function to display a range of products
//     function displayProducts(start, end) {
//         const productsToShow = products.slice(start, end);
//         productsToShow.forEach(product => {
//             productsContainer.innerHTML += createProductCard(product);
//         });
//     }

//     // Initial display of products
//     displayProducts(0, initialDisplay);

//     // "Show More" button functionality
//     if (showMoreBtn) {
//         showMoreBtn.addEventListener('click', () => {
//             displayProducts(currentlyShown, products.length);
//             showMoreBtn.style.display = 'none'; // Hide the button after showing all products
//             currentlyShown = products.length;
//         });
//     }
// }

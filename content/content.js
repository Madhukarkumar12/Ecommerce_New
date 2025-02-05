// // import { addToCart,initialize } from '/cart/cart.js';
// import { products } from '/content/image.js';
// let cart=[];



// export function initializeProducts(){
// const productsContainer = document.getElementById('productsContainer');
// const showMoreBtn = document.getElementById('showMoreBtn');
// const cartCountElement = document.getElementById('cart-count');
// const initialDisplay = 6;
// let currentlyShown = initialDisplay;

// function createProductCard(product) {
//     // Create the main product card container
//     const card = document.createElement('div');
//     card.className = 'product-card';
//     card.dataset.id = product.id;

//     // Create the product image
//     const img = document.createElement('img');
//     img.src = product.image;
//     img.alt = product.name;

//     // Create the product name
//     const name = document.createElement('h3');
//     name.textContent = product.name;

//     // Create the product price
//     const price = document.createElement('p');
//     price.textContent = `Rs ${product.price}`;

//     // Create the buttons container
//     const buttonsContainer = document.createElement('div');
//     buttonsContainer.className = 'product-buttons';

//     // Create the "Add to Cart" button
//     const addToCartButton = document.createElement('button');
//     addToCartButton.className = 'add-to-cart';
//     addToCartButton.textContent = isProductInCart(product.id) ? 'Go to Cart' : 'Add to Cart';
//     addToCartButton.onclick = () => handleAddToCart(product.id, addToCartButton);

//     // addToCartButton.textContent = 'Add to Cart';
//     // addToCartButton.onclick = () => addToCart(product.id); // Assign event handler

//     // Create the "More" button
//     const moreButton = document.createElement('button');
//     moreButton.className = 'more';
//     moreButton.textContent = 'More';

//     // Append buttons to the buttons container
//     buttonsContainer.appendChild(addToCartButton);
//     buttonsContainer.appendChild(moreButton);

//     // Append all elements to the card container
//     card.appendChild(img);
//     card.appendChild(name);
//     card.appendChild(price);
//     card.appendChild(buttonsContainer);

//     return card;
// }

// // Check if product is already in the cart
// function isProductInCart(productId) {
//     return cart.some(item => item.id === productId);
// }


// function addToCart(id){
//     const isLoggedIn=localStorage.getItem('isLoggedIn');
//     if(! isLoggedIn){
//         showSnackbar("Please login to add items to cart");
//         return;
//     }
//   const product = products.find(p => p.id === id);
//       if (product) {
//           const existItem = cart.find(item => item.id === id);
//           if (existItem) {
//               existItem.quantity += 1;
//           } else {
//               cart.push({
//                   ...product,
//                   quantity: 1,
//               });
//               showSnackbar("Added to cart");
//           }
//       } else {
//           console.error(`Product with id ${id} not found`);
//       }
     
//         saveCart();

//         const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//         if(storedUser){
//             fetch('/save-cart',{
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: storedUser.email, cart }),
//             }).catch(error => console.error('Error saving cart:', error));
//         }
// }




// // Load cart from localStorage
// function loadCart() {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//         cart = JSON.parse(savedCart);
//     }
// }

// loadCart()

// // Save cart to localStorage
// function saveCart() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// function showSnackbar(message) {
//     const snackbar = document.getElementById("snackbar");
//     if (!snackbar) {
//         console.error("Snackbar element not found!");
//         return;
//     }
//     snackbar.innerHTML = message; // Set the custom message
//     snackbar.className = "show";
//     setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
// }


// function displayProducts(start, end) {
//     const productsToShow = products.slice(start, end);
//     productsToShow.forEach(product => {
//         // productsContainer.innerHTML += createProductCard(product);
//         const productCard = createProductCard(product);
//         productsContainer.appendChild(productCard);
//     });
// }

// // Initial display
// displayProducts(0, initialDisplay);

// Show more button functionality
// showMoreBtn.addEventListener('click', () => {
//     // displayProducts(currentlyShown, products.length);
//     const initial=currentlyShown;
//     const final=currentlyShown+3;
//     displayProducts(initial,final);
//     if(final===products.length){
//         showMoreBtn.style.display = 'none';
//     }
//     currentlyShown=final;
    
//     // currentlyShown = products.length;
// });

// }

// import { products } from '/content/image.js';

// let cart = [];

// export function initializeProducts() {
//     const productsContainer = document.getElementById('productsContainer');
//     const showMoreBtn = document.getElementById('showMoreBtn');
//     const cartCountElement = document.getElementById('cart-count');
//     const initialDisplay = 6;
//     let currentlyShown = initialDisplay;

//     // Load cart from server or localStorage
//     loadCart();

//     // Function to create a product card
//     function createProductCard(product) {
//         const card = document.createElement('div');
//         card.className = 'product-card';
//         card.dataset.id = product.id;

//         const img = document.createElement('img');
//         img.src = product.image;
//         img.alt = product.name;

//         const name = document.createElement('h3');
//         name.textContent = product.name;

//         const price = document.createElement('p');
//         price.textContent = `Rs ${product.price}`;

//         const buttonsContainer = document.createElement('div');
//         buttonsContainer.className = 'product-buttons';

//         const addToCartButton = document.createElement('button');
//         addToCartButton.className = 'add-to-cart';
//         addToCartButton.textContent = isProductInCart(product.id) ? 'Go to Cart' : 'Add to Cart';
//         addToCartButton.onclick = () => handleAddToCart(product.id, addToCartButton);

//         const moreButton = document.createElement('button');
//         moreButton.className = 'more';
//         moreButton.textContent = 'More';

//         buttonsContainer.appendChild(addToCartButton);
//         buttonsContainer.appendChild(moreButton);

//         card.appendChild(img);
//         card.appendChild(name);
//         card.appendChild(price);
//         card.appendChild(buttonsContainer);

//         return card;
//     }

//     // Check if a product is already in the cart
//     function isProductInCart(productId) {
//         return cart.some(item => item.id === productId);
//     }

//     // Handle Add to Cart button click
//     function handleAddToCart(productId, button) {
//         const isLoggedIn = localStorage.getItem('isLoggedIn');
//         if (!isLoggedIn) {
//             showSnackbar("Please login to add items to cart");
//             return;
//         }

//         const productInCart = cart.find(item => item.id === productId);
//         if (productInCart) {
//             showSnackbar("Product is already in the cart");
//         } else {
//             cart.push({ ...product, quantity: 1 });
//             button.textContent = 'Go to Cart';
//             updateCartUI();
//             saveCart();
//             showSnackbar("Added to cart");
//         }
//     }

//     // Load cart from localStorage or server
//     function loadCart() {                                                                                          
//         // cart=[];
//         const savedCart = localStorage.getItem('cart');
//         if (savedCart) {
//             cart = JSON.parse(savedCart);
//             updateCartUI();
//         } else {
//             const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//             if (storedUser && storedUser.email) {
//                 fetch(`/get-cart?email=${storedUser.email}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         cart = data || [];
//                         updateCartUI();
//                     })
//                     .catch(error => console.error("Error fetching cart:", error));
//             }
//         }
//     }

//     // Save cart to localStorage and server
//     function saveCart() {
//         localStorage.setItem('cart', JSON.stringify(cart));

//         const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//         if (storedUser && storedUser.email) {
//             fetch('/save-cart', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: storedUser.email, cart }),
//             }).catch(error => console.error('Error saving cart:', error));
//         }
//     }

//     // Update cart UI
//     function updateCartUI() {
//         // Update cart count
//         cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);

//         // Update Add to Cart buttons
//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             const productId = parseInt(button.closest('.product-card').dataset.id, 10);
//             if (isProductInCart(productId)) {
//                 button.textContent = 'Go to Cart';
//             }
//         });
//     }

//     // Show snackbar
//     function showSnackbar(message) {
//         const snackbar = document.getElementById("snackbar");
//         if (!snackbar) {
//             console.error("Snackbar element not found!");
//             return;
//         }
//         snackbar.innerHTML = message;
//         snackbar.className = "show";
//         setTimeout(() => {
//             snackbar.className = snackbar.className.replace("show", "");
//         }, 3000);
//     }

//     // Display products
//     function displayProducts(start, end) {
//         const productsToShow = products.slice(start, end);
//         productsToShow.forEach(product => {
//             const productCard = createProductCard(product);
//             productsContainer.appendChild(productCard);
//         });
//     }

//     // Initial display of products
//     displayProducts(0, initialDisplay);

   

//     showMoreBtn.addEventListener('click', () => {
//         // displayProducts(currentlyShown, products.length);
//         const initial=currentlyShown;
//         const final=currentlyShown+3;
//         displayProducts(initial,final);
//         if(final===products.length){
//             showMoreBtn.style.display = 'none';
//         }
//         currentlyShown=final;
        
//         // currentlyShown = products.length;
//     });

//     // Initialize cart UI
//     updateCartUI();
// }




 // Show more functionality
    // showMoreBtn.addEventListener('click', () => {
    //     const initial = currentlyShown;
    //     const final = Math.min(currentlyShown + 3, products.length);
    //     displayProducts(initial, final);
    //     currentlyShown = final;

    //     if (currentlyShown >= products.length) {
    //         showMoreBtn.style.display = 'none';
    //     }
    // });

    // import { products } from '/content/image.js';

    // let cart = [];

    // export function initializeProducts() {
    //     const productsContainer = document.getElementById('productsContainer');
    //     const showMoreBtn = document.getElementById('showMoreBtn');
    //     const cartCountElement = document.getElementById('cart-count');
    //     const initialDisplay = 6;
    //     let currentlyShown = initialDisplay;

    //     // Load cart from server or localStorage
    //     loadCart();

    //     // Function to create a product card
    //     function createProductCard(product) {
    //         const card = document.createElement('div');
    //         card.className = 'product-card';
    //         card.dataset.id = product.id;

    //         const img = document.createElement('img');
    //         img.src = product.image;
    //         img.alt = product.name;

    //         const name = document.createElement('h3');
    //         name.textContent = product.name;

    //         const price = document.createElement('p');
    //         price.textContent = `Rs ${product.price}`;

    //         const buttonsContainer = document.createElement('div');
    //         buttonsContainer.className = 'product-buttons';

    //         const addToCartButton = document.createElement('button');
    //         addToCartButton.className = 'add-to-cart';
    //         addToCartButton.textContent = isProductInCart(product.id) ? 'Go to Cart' : 'Add to Cart';
    //         addToCartButton.onclick = () => handleAddToCart(product.id, addToCartButton);

    //         const moreButton = document.createElement('button');
    //         moreButton.className = 'more';
    //         moreButton.textContent = 'More';

    //         buttonsContainer.appendChild(addToCartButton);
    //         buttonsContainer.appendChild(moreButton);

    //         card.appendChild(img);
    //         card.appendChild(name);
    //         card.appendChild(price);
    //         card.appendChild(buttonsContainer);

    //         return card;
    //     }

    //     // Check if a product is already in the cart
    //     function isProductInCart(productId) {
    //         return cart.some(item => item.id === productId);
    //     }

    //     // Handle Add to Cart button click
    //     function handleAddToCart(productId, button) {
    //         const isLoggedIn = localStorage.getItem('isLoggedIn');
    //         if (!isLoggedIn) {
    //             showSnackbar("Please login to add items to cart");
    //             return;
    //         }

    //         const selectedProduct = products.find(p => p.id === productId);
    //         if (!selectedProduct) {
    //             console.error("Product not found!");
    //             return;
    //         }

    //         const productInCart = cart.find(item => item.id === productId);
    //         if (productInCart) {
    //             showSnackbar("Product is already in the cart");
    //         } else {
    //             cart.push({ ...selectedProduct, quantity: 1 });
    //             button.textContent = 'Go to Cart';
    //             updateCartUI();
    //             saveCart();
    //             showSnackbar("Added to cart");
    //         }
    //     }

    //     // Load cart from localStorage or server
    //     function loadCart() {                                                                                          
    //         try {
    //             const savedCart = localStorage.getItem('cart');
    //             cart = savedCart ? JSON.parse(savedCart) : [];
    //         } catch (error) {
    //             console.error("Error parsing cart data:", error);
    //             cart = [];
    //         }

    //         updateCartUI();

    //         const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    //         if (storedUser && storedUser.email) {
    //             fetch(`/get-cart?email=${storedUser.email}`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     cart = data || [];
    //                     updateCartUI();
    //                 })
    //                 .catch(error => console.error("Error fetching cart:", error));
    //         }
    //     }

    //     // Save cart to localStorage and server
    //     function saveCart() {
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         console.log(cart);

    //         const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    //         console.log(storedUser);
    //         if (storedUser && storedUser.email) {
    //             fetch('/save-cart', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ email: storedUser.email, cart }),
    //             }).catch(error => console.error('Error saving cart:', error));
    //         }
    //     }

    //     // Update cart UI
    //     function updateCartUI() {
    //         // Update cart count
    //         cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    //         // Update Add to Cart buttons
    //         document.querySelectorAll('.add-to-cart').forEach(button => {
    //             const productId = button.closest('.product-card')?.dataset?.id;
    //             if (!productId) return;
                
    //             const parsedProductId = parseInt(productId, 10);
    //             if (isNaN(parsedProductId)) return;

    //             if (isProductInCart(parsedProductId)) {
    //                 button.textContent = 'Go to Cart';
    //             }
    //         });
    //     }

    //     // Show snackbar
    //     function showSnackbar(message) {
    //         const snackbar = document.getElementById("snackbar");
    //         if (!snackbar) {
    //             console.error("Snackbar element not found!");
    //             return;
    //         }
    //         snackbar.textContent = message; // Use textContent instead of innerHTML for security
    //         snackbar.className = "show";
    //         setTimeout(() => {
    //             snackbar.className = snackbar.className.replace("show", "");
    //         }, 3000);
    //     }

    //     // Display products
    //     function displayProducts(start, end) {
    //         const productsToShow = products.slice(start, end);
    //         productsToShow.forEach(product => {
    //             const productCard = createProductCard(product);
    //             productsContainer.appendChild(productCard);
    //         });
    //     }

    //     // Initial display of products
    //     displayProducts(0, initialDisplay);

    //     showMoreBtn.addEventListener('click', () => {
    //         const initial = currentlyShown;
    //         const final = currentlyShown + 3;
    //         displayProducts(initial, final);

    //         if (final >= products.length) {
    //             showMoreBtn.style.display = 'none';
    //         }

    //         currentlyShown = final;
    //     });

    //     // Initialize cart UI
    //     updateCartUI();
    // }


    import { products } from '/content/image.js';

    let cart = [];

    export function initializeProducts() {
        const productsContainer = document.getElementById('productsContainer');
        const showMoreBtn = document.getElementById('showMoreBtn');
        const cartCountElement = document.getElementById('cart-count');
        console.log(cartCountElement);
        const initialDisplay = 6;
        let currentlyShown = initialDisplay;

        // Load cart from server or localStorage
        loadCart();

        // Function to create a product card
        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.id = product.id;

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const name = document.createElement('h3');
            name.textContent = product.name;

            const price = document.createElement('p');
            price.textContent = `Rs ${product.price}`;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'product-buttons';

            const addToCartButton = document.createElement('button');
            addToCartButton.className = 'add-to-cart';
            addToCartButton.textContent = isProductInCart(product.id) ? 'Go to Cart' : 'Add to Cart';
            addToCartButton.onclick = () => handleAddToCart(product.id, addToCartButton);

            const moreButton = document.createElement('button');
            moreButton.className = 'more';
            moreButton.textContent = 'More';

            buttonsContainer.appendChild(addToCartButton);
            buttonsContainer.appendChild(moreButton);

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(buttonsContainer);

            return card;
        }

        // Check if a product is already in the cart
        function isProductInCart(productId) {
            if (!Array.isArray(cart)) {
                console.error("Cart is not an array!", cart);
                return false;
            }
            return cart.some(item => item.id === productId);
        }

        // Handle Add to Cart button click
        function handleAddToCart(productId, button) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                showSnackbar("Please login to add items to cart");
                return;
            }

            const selectedProduct = products.find(p => p.id === productId);
            if (!selectedProduct) {
                console.error("Product not found!");
                return;
            }

            const productInCart = cart.find(item => item.id === productId);
            if (productInCart) {
                showSnackbar("Product is already in the cart");
            } else {
                cart.push({ ...selectedProduct, quantity: 1 });
                button.textContent = 'Go to Cart';
                updateCartUI();
                saveCart();
                showSnackbar("Added to cart");
            }
        }

        // Load cart from localStorage or server
        function loadCart() {
            try {
                const savedCart = localStorage.getItem('cart');
                cart = savedCart ? JSON.parse(savedCart) : [];

                // Ensure cart is always an array
                if (!Array.isArray(cart)) {
                    cart = [];
                }
            } catch (error) {
                console.error("Error parsing cart data:", error);
                cart = [];
            }

            updateCartUI();

            const storedUser = JSON.parse(localStorage.getItem("currentUser"));
            if (storedUser && storedUser.email) {
                fetch(`/get-cart?email=${storedUser.email}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Fetched cart data:", data); // Debugging line
                        cart = Array.isArray(data) ? data : [];
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                    })
                    .catch(error => console.error("Error fetching cart:", error));
            }
        }

        // Save cart to localStorage and server
        function saveCart() {
           localStorage.setItem('cart', JSON.stringify(cart))

            const storedUser = JSON.parse(localStorage.getItem("currentUser"));
            if (storedUser && storedUser.email) {
                fetch('/save-cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: storedUser.email, cart }),
                }).catch(error => console.error('Error saving cart:', error));
            }
        }

        // Update cart UI
        function updateCartUI() {
            if (!Array.isArray(cart)) {
                console.error("Cart is not an array!", cart);
                cart = [];
            }

            // Update cart count
            cartCountElement.textContent = cart.reduce((total, item) => total + (item.quantity || 1), 0);

            // Update Add to Cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                const productId = button.closest('.product-card')?.dataset?.id;
                if (!productId) return;

                const parsedProductId = parseInt(productId, 10);
                if (isNaN(parsedProductId)) return;

                if (isProductInCart(parsedProductId)) {
                    button.textContent = 'Go to Cart';
                }
            });
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

        // Display products
        function displayProducts(start, end) {
            const productsToShow = products.slice(start, end);
            productsToShow.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        }

        // Initial display of products
        displayProducts(0, initialDisplay);

        showMoreBtn.addEventListener('click', () => {
            const initial = currentlyShown;
            const final = currentlyShown + 3;
            displayProducts(initial, final);

            if (final >= products.length) {
                showMoreBtn.style.display = 'none';
            }

            currentlyShown = final;
        });

        // Initialize cart UI
        updateCartUI();
    }






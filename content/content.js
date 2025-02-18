
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
            moreButton.onclick = () => redirectToMorePage(product);

            buttonsContainer.appendChild(addToCartButton);
            buttonsContainer.appendChild(moreButton);

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(buttonsContainer);

            return card;
        }

        // redirect to more page.....
        function redirectToMorePage(product){
            console.log("hii....")
            const params = new URLSearchParams({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                about: product.about,
                remain: product.remain
            });
            window.location.href = `/more/more.html?${params.toString()}`
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






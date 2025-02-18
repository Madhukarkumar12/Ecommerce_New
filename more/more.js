// target: more.html
const urlParams = new URLSearchParams(window.location.search);

// Step 2: Extract individual values
const productId = urlParams.get('id');
console.log(productId);
const productName = urlParams.get('name');
console.log(productName);
const productImage = urlParams.get('image');
console.log(productImage);
const productPrice = urlParams.get('price');
console.log(productPrice);
const productAbout = urlParams.get('about');
console.log(productAbout);
const productRemain = urlParams.get('remain');
console.log(productRemain);

document.getElementById('product-title').textContent = productName;
document.getElementById('product-image').src = productImage;
document.getElementById('stock-info').textContent = `Only ${productRemain} left in stock`;
document.getElementById('product-description').textContent = productAbout;
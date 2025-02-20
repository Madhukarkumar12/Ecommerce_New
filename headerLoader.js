
// import { showSnackbar } from "./registerLog";
import { updateCartCount } from "/cart/cart.js";
document.addEventListener("DOMContentLoaded",()=>{
    fetch('/header.html')
     .then(response=>response.text())
     .then(data=>{
        document.body.insertAdjacentHTML('afterbegin',data);
        const isLoggedIn=localStorage.getItem('isLoggedIn');

        const dropdownBtn = document.getElementById("dropdownBtn");
        console.log(dropdownBtn);
        const dropdownMenu = document.getElementById("dropdownMenu");
        console.log(dropdownMenu);
        const dropdownIcon = document.getElementById("dropdownIcon");
        console.log(dropdownIcon);

        dropdownBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            dropdownIcon.classList.toggle("rotate");
        });
        
        dropdownIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            dropdownMenu.style.display = "none";
            dropdownIcon.classList.remove("rotate");
        });

        document.addEventListener("click", function(event) {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
                dropdownIcon.classList.remove("rotate");
            }
        });

        
        if(isLoggedIn){
            document.getElementById('dropdown').style.display = 'flex';
            document.getElementById('cart').style.display = 'flex';
            document.getElementById('login').style.display = 'none';
            document.getElementById('signup').style.display = 'none';
        }
        else{
            document.getElementById('dropdown').style.display = 'none';
            document.getElementById('cart').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('signup').style.display = 'block';
        }

        updateCartCount();
     })
     .catch(error => console.error('Error loading header:', error));
})

export function logout() {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    // localStorage.clear();
    localStorage.removeItem('cart');
    localStorage.removeItem('currentUser');
    // localStorage.setItem('isLoggedIn', 'false');

    window.location.href='/index.html';
}
window.logout=logout;
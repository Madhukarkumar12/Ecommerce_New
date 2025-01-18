
// import { showSnackbar } from "./registerLog";

document.addEventListener("DOMContentLoaded",()=>{
    fetch('/header.html')
     .then(response=>response.text())
     .then(data=>{
        document.body.insertAdjacentHTML('afterbegin',data);
        const isLoggedIn=localStorage.getItem('isLoggedIn');
        
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
     })
     .catch(error => console.error('Error loading header:', error));
})

function logout() {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    // alert("You have been logged out!");
    // showSnackbar("You have been Logged out!");
    // setTimeout(function() {
    //     window.location.href = 'index.html';
    // }, 3000);
    window.location.href='index.html';
    
    
}






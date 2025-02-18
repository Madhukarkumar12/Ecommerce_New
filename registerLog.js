

let currentUser = null;

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!name || !email || !password) {
        showSnackbar("All fields are required!");
        return;
    }

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('isLoggedIn', true);
            showSnackbar("Account created successfully! Logging you in...");
            setTimeout(function() {
                window.location.href = '/index.html';
            }, 3000);
        } else {
            showSnackbar(data.message);
            
        }
    })
    .catch(signupError => {
        console.error('Signup Error:', signupError);
        showSnackbar("An error occurred during signup!");
    });
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showSnackbar("All fields are required!");
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showSnackbar("Login successful! Welcome, " + currentUser.name + ".");
            setTimeout(function() {
                window.location.href = '/index.html';
            }, 3000);
        } else {
            showSnackbar(data.message);
        }
    })
    .catch(error => {
        console.error('Login Error:', error);
        showSnackbar("An error occurred during login!");
    });
}


 function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) {
        console.error("Snackbar element not found!");
        return;
    }
    snackbar.innerHTML = message; // Set the custom message
    snackbar.className = "show";
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

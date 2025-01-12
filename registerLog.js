

let currentUser=null;

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!name || !email || !password) {
        // alert("All fields are required!");
        toastr.warning("All fields are reuired")
        return;
    }

    // Send data to the server
    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('isLoggedIn',true);
            // alert("Account created successfully! Logging you in...");
            toastr.success("Account created successfully! Logging you in...")

            window.location.href='index.html';
        } else {
            // alert(data.message);
            toastr.warning(data.message)
           
        }
    })
    .catch(signupError => console.error('Signup Error:', signupError));
}


function login(event){
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        // alert("All fields are required!");
        toastr.error("All fields are required!")
    }

    fetch('/login',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
           currentUser=data.user;
           localStorage.setItem('isLoggedIn',true);
           localStorage.setItem('currentUser', JSON.stringify(currentUser));
        //    alert("Login successfully");
        toastr.success("Login successfully");
            
            
           window.location.href = 'index.html';
        }
        else{
            // alert(data.message);
            toastr.warning(data.message)
            
        }
    })
    .catch(error => console.error('Error:', error));
}



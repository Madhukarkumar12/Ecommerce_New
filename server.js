const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

const PORT=3000;
app.post('/signup',(req,res)=>{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    fs.readFile('users.json','utf8',(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:"Internal server error"});
        }
        const users = JSON.parse(data);
        // if user exist or not....
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email is already registered.' });
        }
        // Add new user
        const newUser = { id: Date.now(), name, email, password }; // Add unique id
        users.push(newUser);
        // set the updated user list back to users.json....
        fs.writeFile('users.json',JSON.stringify(users,null,2),(err) => {
            if(err){
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
            res.status(201).json({ success: true, message: 'Account created successfully!', user: newUser });
        })

    })
})

// login endpoint...
app.post('/login',(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({success:false, message:"Email and password are required"})
    }

    // Read the users.json file
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        const users = JSON.parse(data); 

        // Find the user with the matching email
        const user = users.find(user => user.email === email);

        if (!user) {
            // If no user with the provided email is found
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        if (user.password !== password) {
            // Password mismatch
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        const { name, email: userEmail } = user;
        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            user: { name, email: userEmail } 
        });
    });
})


app.get('/get-cart', (req, res) => {
    const { email } = req.query;

    // Validate the email query parameter
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Read the carts.json file to fetch cart data
    fs.readFile('carts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading carts.json:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        let carts = [];
        try {
            carts = JSON.parse(data); // Parse the carts data from the file
        } catch (parseError) {
            console.error('Error parsing carts.json:', parseError);
        }

        // Find the cart associated with the user's email
        const userCart = carts.find(c => c.email === email);

        if (!userCart) {
            // No cart found for the given email
            return res.status(404).json({ success: false, message: 'Cart not found for the given email.' });
        }

        // Respond with the cart data
        res.status(200).json(userCart.cart);
    });
});



app.post('/save-cart', (req, res) => {
    const { email, cart } = req.body;

    // Validate the request body
    if (!email || !cart || !Array.isArray(cart)) {
        return res.status(400).json({ success: false, message: 'Invalid request data.' });
    }

    // Read the carts.json file to fetch current cart data
    fs.readFile('carts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading carts.json:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        let carts = [];
        try {
            carts = JSON.parse(data); // Parse the existing cart data
        } catch (parseError) {
            console.error('Error parsing carts.json:', parseError);
        }

        // Check if a cart for the given email already exists
        const existingCart = carts.find(c => c.email === email);

        if (existingCart) {
            // Update the existing cart
            existingCart.cart = cart;
        } else {
            // Add a new cart entry for the user
            carts.push({ email, cart });
        }

        // Write the updated cart data back to the file
        fs.writeFile('carts.json', JSON.stringify(carts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to carts.json:', err);
                return res.status(500).json({ success: false, message: 'Failed to save cart.' });
            }

            res.status(200).json({ success: true, message: 'Cart saved successfully.' });
        });
    });
});

app.listen(PORT,()=>{
    console.log("server is running on http://localhost:3000");
})
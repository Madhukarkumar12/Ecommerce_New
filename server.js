const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

// const DATABASE_FILE = 'users.json';
const PORT=3000;
app.post('/signup',(req,res)=>{
    const { name, email, password } = req.body;

    // Validate input
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

app.listen(PORT,()=>{
    console.log("server is running on http://localhost:3000");
})
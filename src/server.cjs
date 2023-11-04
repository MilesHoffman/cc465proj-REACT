const mongoLogic = require('./mongoLogic.cjs');
const { validateLogin } = mongoLogic;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// VARIABLES ----------------------------------------------------
let username = '';

// VAR FUNCTIONS ------------------------------------------------
function setUsername( name ) {
    username = name;
}
// --------------------------------------------------------------

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.post('/api/login',  async (req, res) => {
    // Handle login logic here
    const {username, password} = req.body;
    console.log(username);
    console.log(password);

    // Check username and password against your database
    // If login is successful, respond with a success message or token
    // If login fails, respond with an error message

    const isValid = await validateLogin(username, password);

    if (isValid) {
        res.json({message: 'Login successful' + isValid}); // Example response
    }
    else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});

// This will get the request to create a new listing.
app.post('/api/createListing', (req, res) => {

    const { name, location, price, desc, image, username } = req.body;
    const {createListing} = mongoLogic;

    createListing( name, location, price, desc, image, username );

    res.json( {message: "Created listing for: " + username} )
});

app.post('/api/createUser', (req, res) => {
    const { email, username, password } = req.body;
    const { createUser } = mongoLogic;

    createUser( email, username, password );

    res.json( {message: "Created user for: " + username} )
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
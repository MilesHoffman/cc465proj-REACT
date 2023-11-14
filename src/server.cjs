const mongoLogic = require('./mongoLogic.cjs');
const { validateLogin } = mongoLogic;
const express = require('express');
const cors = require('cors');
const {getListings} = require("./mongoLogic.cjs");
const app = express();

app.use(express.json());

// VARIABLES ----------------------------------------------------
let globalUsername = '';

// VAR FUNCTIONS ------------------------------------------------
function setUsername( name ) {
    globalUsername = name;
    console.log("server....THIS IS THE USERNAME..." + globalUsername);
}
// --------------------------------------------------------------

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.get('/api/getListings', async (req, res) => {
    try {

        const{getListings} = mongoLogic;
        // Call the getListing function
        const filterData = 0;
        const listings = await getListings( filterData );

        // Send the listings as a response
        res.json(listings);
    } catch (error) {
        console.error('__________________api/getListings...Error fetching listings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
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
        setUsername(username);
    }
    else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});
//hi
//method to send the filtered data to mongodb so that we can filter for the user

app.post('/api/sendListing', async (req, res) =>{

    const filterData = req.body


    console.log('_________________________api/sendListings.....received filters', filterData)

    try {
        const{getListings} = mongoLogic;
        // Call the getListing function
        const listings = await getListings( filterData );

        // Send the listings as a response
        console.log("\n____________________api/sendListings....\n" & listings);
        res.json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})







// This will get the request to create a new listing.
app.post('/api/createListing', (req, res) => {

    console.log("POST CreateListing");

    const { name, location, price, desc, image, condition, category } = req.body;
    const {createListing} = mongoLogic;

    const listingData = {
        name, location, price, desc, image, username: globalUsername, condition, category
    }

    createListing( listingData );

    res.json( {message: "Created listing for: " + globalUsername} )
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
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

app.get('/api/getListings', async (req, res) => {
    try {

        const{getListings} = mongoLogic;
        // Call the getListing function
        const listings = await getListings();

        // Send the listings as a response
        res.json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
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
    }
    else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
});
//hi
//method to send the filtered data to mongodb so that we can filter for the user
/*
app.post('/api/sendListing', async (req, res) =>{

    const filterData = req.body

    console.log('received filters', filterData)

})
*/

app.post('/api/sendListing', async (req, res) => {
    const filterData = req.body;

    console.log('received filters', filterData);

    try {
        await client.connect(); // Connect to MongoDB

        const listings = await getListings(filterData);

        res.json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close(); // Close MongoDB connection
    }
});

async function getListings(filterData) {
    const query = constructQuery(filterData);

    let listings;
    try {
        await connectListings(); // Connects to the listing collection

        listings = await col.find(query).toArray();
    } catch (err) {
        console.error(err);
    } finally {
        await client.close(); // Close MongoDB connection
    }

    return listings;
}

function constructQuery(filterData) {
    // Example: Construct a query based on filterData
    const query = {};

    if (filterData.city) {
        query.city = filterData.city;
    }

    // Add other conditions based on your filterData properties

    return query;
}

async function connectListings() {
    if (!client.isConnected()) {
        await client.connect();
    }

    const database = client.db('your-database-name');
    const collection = database.collection('your-collection-name');
    col = collection; // Assign to a global variable or adjust your code structure accordingly
}



// This will get the request to create a new listing.
app.post('/api/createListing', (req, res) => {

    console.log("POST CreateListing");

    const { name, location, price, desc, image, username, condition, category } = req.body;
    const {createListing} = mongoLogic;

    createListing( name, location, price, desc, image, username, condition, category );

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
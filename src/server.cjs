const mongoLogic = require('./mongoLogic.cjs');
const { validateLogin } = mongoLogic;
const express = require('express');
const cors = require('cors');
const {getListings} = require("./mongoLogic.cjs");
const app = express();
const MongoLogic = require('./mongoLogic.cjs');

const multer = require('multer');
const { MongoClient } = require('mongodb');
const {Promise} = require("mongoose");

app.use(express.json({ limit: '20mb' }));

//picture storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const url = "mongodb+srv://cc465proj:cc465proj@cluster0.3wpv56y.mongodb.net/?retryWrites=true&w=majority";
const dbName = "CommunityComrades";

let db;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');
    db = client.db(dbName);
});

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

app.post('/api/getListings', async (req, res) => {
    try {

        const{getListings} = mongoLogic;
        // Call the getListing function
        const filterData = req.body;
        const listings = await getListings(filterData);

        // Send the listings as a response
        res.json(listings);
    } catch (error) {
        console.error('__________________api/getListings...Error fetching listings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/getComments', async (req, res) => {
    try {

        const {getComments} = require('./mongoLogic.cjs');

        // Call the getListing function
        console.log("server start getComments")

        const data = req.body;
        const comments = await getComments(data.listingID);

        console.log("Server...GetComments...Comments: ");

        // Send the listings as a response
        res.json(comments);
    } catch (error) {
        console.error('__________________api/getListings...Error fetching listings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Returns an array of sorted replies - MH
app.post('/api/getReplies', async (req, res) => {
    try {

        const {getReplies} = require('./mongoLogic.cjs')

        // Call the getReplies function
        console.log("server start getReplies")

        const data = req.body;
        const comments = await getReplies( data.commentID );

        console.log("commentss", data.commentID)

        console.log("Server...GetReply...replies: ", comments);

        // Send the replies as a response
        res.json(comments);
    } catch (error) {
        console.error('__________________api/getReplies...Error fetching replies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/getProfile', async (req, res) => {
    try {

        const{getListings} = mongoLogic;
        // Call the getListing function
        const filterData = {
            query: true,
            name: "",
            location: "",
            minPrice: "",
            maxPrice: "",
            username: globalUsername,
            condition: {
                new: true,
                used: true,
                refurbished: true,
                damaged: true
            },
            category: "",
            ID: ""
        };
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





// This will get the request to create a new listing.
app.post('/api/createListing', upload.single('image'), async (req, res) => {

    console.log("POST CreateListing");

    const { name, location, price, desc, condition, category } = req.body;
    let imageBase64 = '';
    try{
        imageBase64 = req.file.buffer;
    }
    catch{
        console.log("No image input");
    }

    const {createListing} = mongoLogic;

    const listingData = {
        name, location, price, desc, image: imageBase64, username: globalUsername, condition, category
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

// To edit a listing
app.post('/api/editListing', async (req, res) => {
    try {
        const { editListing } = mongoLogic;
        const updData = req.body;
        console.log(updData) //testing updated data
        // Assuming there's a unique identifier for each listing, like ID
        const listingID = updData.ID;

        console.log(listingID)
        // Call the editListing function with the updated data and listingId

        const result = await editListing(listingID, updData);

        res.json(result);
    } catch (error) {
        console.error('Error editing listing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//to delete a listing
app.post('/api/deleteListing', async (req, res) => {


    const {deleteListing} = mongoLogic;

    const dID = req.body

    const listingID = dID.ID

    console.log('delete id:', listingID)


    const result =  await deleteListing(listingID)

    res.json({message: "Delete successful"});
    //mongoLogic function to delete listing from user
    console.log('request received')

})


app.post('/api/sendComment', async (req, res) => {


    const {createComment} = mongoLogic;


    const lID = req.body
    const commentData = {
        username: globalUsername,
        message: lID.TextBoxMessage,
        listingID: lID.ListingID

    }

    console.log('data', commentData)



    const result =  await createComment(commentData)

    res.json({message: "comment sent"});
    //mongoLogic function to delete listing from user
    console.log('request received')

})





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
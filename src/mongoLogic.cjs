// Initializing the variables to connect to the database.
const {MongoClient} = require("mongodb");
const url = "mongodb+srv://cc465proj:cc465proj@cluster0.3wpv56y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CommunityComrades";
let col = '';



// Starts the connection to the Users collection. Does not close it.
async function connectUsers(){

    try {
        await client.connect();
        const db = client.db(dbName);
        col = await db.collection("Users");
    }
    catch (err){
        console.log(err)
    }
}

// Starts connection to the Listings collection. Does not close connection.
async function connectListings() {

    try {
        await client.connect();
        const db = await client.db(dbName);
        col = await db.collection("Listings");
    }
    catch (err){
        console.log(err)
    }
}

// Calls validateLogin implementation. Returns a bool based on the credentials entered.
function validateLogin(username, password){

    const call = async () => {

        try {
            return await doValidateLogin(username, password);
        }
        catch (error) {
            console.error(error);
        }
    };

    return call();
}


// Checks the database to see if it is a valid login. Returns a bool based on credentials entered.
async function doValidateLogin(username, password ){

    try{

        await connectUsers();

        // Creating the user query
        let userQuery = {
            "Username" : username,
            "Password" : password
        }

        // Searching for the user in the database
        const valid =  col.findOne(userQuery);

        // Outputs if the user was found
        if( valid ) {
            console.log("User login successful: " + valid);
            return true;
        }
        else {
            console.log("User login failed: " + valid);
            return false;
        }
    }
    catch( err ){
        console.log(err)
    }
    finally{
        await client.close()
    }
}


// Calls createUser implementation. Creates a new user.
function createUser( email, username, password ){

    const call = async () => {

        try {
            await doCreateUser(email, username, password);
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}

// Creates a new user
async function doCreateUser( email, username, password ) {

    try {
        await connectUsers(); // Connects to user collection

        // Initializes the user
        let user = {
            "Email" : email,
            "Username" : username,
            "Password" : password
        }

        const product = await col.insertOne(user); // Inserts the user

        if( await col.findOne(user) ) {
            console.log("User found in database. ~Probably created");
        }
        else {
            console.log("User not found in database. ~Probably not created")
        }
    }
    catch (err){
        console.log(err);
    }
    finally {
        await client.close()
    }
}


// Calls implementation for createListing. Creates a new listing.
function createListing( name, location, price, desc, pictures ){

    const call = async () => {

        try {
            await doCreateListing(name, location, price, desc, pictures);
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}


// Implementation to create a listing.
async function doCreateListing( name, location, price, desc, pictures ){

    try {
        await connectListings(); // Connects to user collection

        // Initializes the user
        let listing = {
            "Name" : name,
            "Location" : location,
            "Price" : price,
            "Description" : desc,
            "Pictures" : pictures
        }

        const product = await col.insertOne(listing); // Inserts the user

        if( await col.findOne(listing) ) {
            console.log("Listing found in database. ~Probably created");
        }
        else {
            console.log("Listing not found in database. ~Probably not created")
        }
    }
    catch (err){
        console.log(err);
    }
    finally {
        await client.close()
    }
}


// USE THE WRAPPER CLASS NOT THE IMPLEMENTATION CLASS. Unless you don't want to.
module.exports = {
    validateLogin,
    createUser,
    createListing
}
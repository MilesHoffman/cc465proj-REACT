// Handles the connection to the database, and all functionality related to it.


// Initializing the variables to connect to the database.
const {MongoClient, ObjectId} = require("mongodb");
//const {PRODUCTS} = require("./products.js");
const url = "mongodb+srv://cc465proj:cc465proj@cluster0.3wpv56y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CommunityComrades";
let col = '';



// Starts the connection to the Users collection. Does not close it.
async function connectUsers(){

    try {
        await client.connect();
        const db = client.db(dbName);
        col = db.collection("Users");
    }
    catch (err){
        console.log(err)
    }
}

// Starts connection to the Listings collection. Does not close connection.
async function connectListings() {

    try {
        await client.connect();
        const db = client.db(dbName);
        col = db.collection("Listings");
    }
    catch (err){
        console.log(err)
    }
}

// Calls validateLogin implementation. Returns a bool based on the credentials entered.
function validateLogin(username, password){

    const call = async () => {

        try {
            const valid = await doValidateLogin(username, password);
            return valid;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };

    return call();
}


// Checks the database to see if it is a valid login. Returns a bool based on credentials entered.
async function doValidateLogin(username, password ){

    let valid;

    try{

        await connectUsers();

        // Creating the user query
        let userQuery = {
            "Username" : username,
            "Password" : password
        }

        // Searching for the user in the database
        valid =  await col.findOne(userQuery);

        // Outputs if the user was found
        if( valid ) {
            console.log("User login was successful: " + valid);
        }
        else {
            console.log("User login FAILED: " + valid);
        }
    }
    catch( err ){
        console.log(err)
    }

    await client.close();

    if( valid ) return true;
    else return false;
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
    await client.close()

}


// Calls implementation for createListing. Creates a new listing.
function createListing( listingData ){


    const call = async () => {

        try {
            await doCreateListing( listingData );
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}


// Implementation to create a listing.
async function doCreateListing( listingData ){

    const { name, location, price, desc, image, username, condition, category } = listingData;

    try {
        await connectListings(); // Connects to user collection

        // Initializes the user
        let listing = {
            "Name" : name,
            "Location" : location,
            "Price" : price,
            "Description" : desc,
            "Pictures" : image,
            "Username" : username,
            "Condition" : condition,
            "Category" : category
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
    await client.close()
}


// Calls implementation for getListings.
function getListings( filterData ){

    const call = async () => {

        let listings;

        try {
            listings = await doGetListings( filterData );
        }
        catch (error) {
            console.error(error);
        }

        return listings;
    };

    return call();
}

// Implementation for getting a listing. Returns all listings currently.
async function doGetListings( filterData ){

    console.log("Mongologic..... filterData: ", filterData)

    let listings;
    try {
        await connectListings(); // Connects to listing collection

        let query;
        query = {
            $and: [
                filterData.City ? { Location: filterData.City } : {},
                filterData.Zipcode ? { Zipcode: filterData.Zipcode } : {},
                filterData.minPrice ? { Price: { $gte: filterData.minPrice } } : {},
                filterData.maxPrice ? { Price: { $lte: filterData.maxPrice } } : {},
                //{ Condition: { $in: Object.keys(filterData.conditions).filter(key => filterData.conditions[key]) } },
                filterData.selectedSide ? { Side: filterData.selectedSide } : {}
            ]
        };

        console.log( "mongoLogic..... QUERY: ",  query)

        listings = await col.find( query ).toArray();

        //console.log( "mongoLogic..... listings: ", listings)
    }
    catch (err){
        console.log(err);
    }
    await client.close()

    return listings;
}


// Calls implementation for updateListing.
function editListing( listingID, updData ){

    const call = async () => {

        try {
            await doEditListing( listingID, updData );
        }
        catch (error) {
            console.error(error);
        }
    };

    call();
}


// updates a listing using its ID and the updated data.
async function doEditListing(listingId, updData) {

    try {

        await connectListings();

        // outputs the listing's ID
        console.log( "_________________mongoLogic... DoEditListing..... \n"
            + listingId );

        // Update the listing with the new data
        await col.updateOne({ "_id": listingId }, { $set: updData });
    }
    catch (err){
        console.log(err);
    }

    await client.close();
}



// USE THE WRAPPER CLASS NOT THE IMPLEMENTATION CLASS. Unless you don't want to.
module.exports = {
    validateLogin,
    createUser,
    createListing,
    getListings,
    editListing
}
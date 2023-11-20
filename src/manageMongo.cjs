// Allows for easy manipulation of our mongo database such as delete alls, adding test cases, etc.



// Initializing the variables to connect to the database.
const {MongoClient} = require("mongodb");
//const {PRODUCTS} = require("./products.js");
const url = "mongodb+srv://cc465proj:cc465proj@cluster0.3wpv56y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CommunityComrades";
let col = '';



// Initializes the functions from mongoLogic.
const mongoLogic = require("./mongoLogic.cjs");
const {generateUniqueID} = require("./mongoLogic.cjs");


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


// DELETES ALL LISTINGS!!
async function deleteAllListings() {

    try {

        await connectListings();

        // deletes all listings
        await col.deleteMany();
    }
    catch (err){
        console.log(err);
    }

    await client.close();
}


// DELETES ALL USERS!!
async function deleteAllUsers() {

    try {

        await connectUsers();

        // deletes all users
        await col.deleteMany();
    }
    catch (err){
        console.log(err);
    }

    await client.close();
}


function main(){

    const call = async () => {

        try {

            // Condition: ( New/Good, Used/Pre-owned, Refurbished, Damaged)
            // Category: ( Tech, Home, Apparel, Automobiles, Games )

            const listingData = {
                name : "Testing ID",
                location : "Hickville",
                price : "150", "desc" : "This is a test...",
                image : "TestImage",
                username: "Test....",
                condition : "New/Good",
                category : "Games",
                ID : generateUniqueID()
            }

            await mongoLogic.createListing(listingData)

            //await mongoLogic.createUser( "testEmail@gmail.com", "TestUser", "1234")

            // await deleteAllUsers()
            // await deleteAllListings()
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}

main();
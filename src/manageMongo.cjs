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

// Starts connection to the Comments collection. Does not close connection.
async function connectComments() {

    try {
        await client.connect();
        const db = client.db(dbName);
        col = db.collection("Comments");
    }
    catch (err){
        console.log(err)
    }
}

// Starts connection to the Replies collection. Does not close connection.
async function connectReplies() {

    try {
        await client.connect();
        const db = client.db(dbName);
        col = db.collection("Replies");
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

    console.log( "___________manageMongo... Deleted all listings....")

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

    console.log( "___________manageMongo... Deleted all users....")
    await client.close();
}

// DELETES ALL COMMENTS!!
async function deleteAllComments() {

    try {

        await connectComments();

        // deletes all users
        await col.deleteMany();
    }
    catch (err){
        console.log(err);
    }

    console.log( "___________manageMongo... Deleted all comments....")
    await client.close();
}


function main(){

    const call = async () => {

        try {

            // Condition: ( New/Good, Used/Pre-owned, Refurbished, Damaged)
            // Category: ( Tech, Home, Apparel, Automobiles, Games )

            const listingData = {
                name : "Damaged / Games test",
                location : "Erie",
                price : 55,
                desc : "This is a test...",
                image : "TestImage",
                username: "TestUser",
                condition : "Damaged",
                category : "Games",
                ID : generateUniqueID()
            }

            const filterData = {
                query: true,
                name: "",
                location: "",
                minPrice: '',
                maxPrice: '',
                username: "",
                condition: {
                    new: true,
                    used: true,
                    refurbished: true,
                    damaged: true
                },
                category: "",
                ID: ""
            }

            let commentData = {
                username: "TestUser",
                message: "This is a test comment4",
                listingID: "1701474555820-9716"
            }

            let replyData = {
                username: "TestReplyUser",
                message: "This is a test reply3",
                repliedTo: "TestUser",
                commentID: "1701484711026-7023"
            }

            //await mongoLogic.createListing(listingData)
            //await mongoLogic.createUser( "testEmail@gmail.com", "TestUser", "1234")
            //await mongoLogic.createComment(commentData);
            //await mongoLogic.createReply(replyData);

            //let listings = await mongoLogic.getListings(filterData);
            //console.log( "The listings: ", listings );



            //await deleteAllUsers()
            //await deleteAllListings()
            //await deleteAllComments()
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}

main();
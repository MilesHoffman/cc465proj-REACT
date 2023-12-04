// Handles the connection to the database, and all functionality related to it.


// Initializing the variables to connect to the database.
const {MongoClient} = require("mongodb");
const repl = require("repl");
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

// Starts connection to the Comments collection. Does not close.
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

// Starts connection to the Replies collection. Does not close.
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

async function closeMongo(){
    if( client.isConnected() ){
        await client.close();
    }
}

// Creates a unique ID
function generateUniqueID(){
    const timestamp = new Date().getTime(); // Current timestamp
    const random = Math.floor(Math.random() * 10000); // Random number between 0 and 999
    return timestamp + '-' + random;
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

    let intPrice = parseInt(price);

    try {
        await connectListings(); // Connects to user collection

        // Initializes the user
        let listing = {
            "Name" : name,
            "Location" : location,
            "Price" : intPrice,
            "Description" : desc,
            "Pictures" : image,
            "Username" : username,
            "Condition" : condition,
            "Category" : category,
            "ID" : generateUniqueID()
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

/* Implementation for getting a listing. Returns all listings currently.

        FORMAT FOR filterData!!!!!!!!
        If filterData is empty (returns all listings), then set filterData = { query: false };
        The following will also return all listings.

        filterData = {
            query: true,
            name: "",
            location: "",
            minPrice: "",
            maxPrice: "",
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
 */
async function doGetListings( filterData ){

    //console.log("Mongologic..... filterData: ", filterData)

    let listings;
    try {
        await connectListings(); // Connects to listing collection

        let query = {};
        if( filterData.query === true){

            let newQuery, usedQuery, refurbQuery, damagedQuery, conditionQuery = true;
            let newStr, usedStr, refurbStr, dmgStr;
            newStr = "New/Good"
            usedStr = "Used/Pre-Owned"
            dmgStr = "Damaged"
            refurbStr = "Refurbished"

            for( const key in filterData.condition){
                if( filterData.condition[key] === false){
                    conditionQuery = false;
                }
                else{
                    conditionQuery = true;
                    break;
                }
            }

            if(conditionQuery){
                newQuery = filterData.condition.new
                usedQuery = filterData.condition.used
                refurbQuery = filterData.condition.refurbished
                damagedQuery = filterData.condition.damaged
            }

            query = {
                ...(filterData.name === "" ? {} : { "Name" : filterData.name }),
                ...(filterData.location === "" ? {} : { "Location" : filterData.location }),
                ...(filterData.maxPrice === "" && filterData.minPrice === "" ? {} : {
                    "Price": {
                        $lte: filterData.maxPrice !== "" ? parseInt(filterData.maxPrice) : Infinity,
                        $gte: filterData.minPrice !== "" ? parseInt(filterData.minPrice) : -Infinity,
                    }
                }),
                ...(filterData.username === "" ? {} : { "Username" : filterData.username }),
                $and: [
                { "Condition":
                        (!conditionQuery) ?
                            {
                                $in: [
                                    newStr,
                                    usedStr,
                                    refurbStr,
                                    dmgStr
                                ]
                            } :
                            { $in: [
                                (newQuery) ? newStr : "-1",
                                (usedQuery) ? usedStr : "-1",
                                (refurbQuery) ? refurbStr : "-1",
                                (damagedQuery) ? dmgStr : "-1"
                            ]}}],
                ...(filterData.category === "" ? {} : { "Category" : filterData.category }),
                ...(filterData.ID === "" ? {} : { "ID" : filterData.ID }),
            }
        }

        listings = await col.find( query ).toArray();

    }
    catch (err){
        console.log("ERROR LOG getListings: " + err);
    }

    await client.close()

    return listings;
}

// Calls implementation for getReplies. Input the listing's ID to get its replies.
async function getReplies(listingID) {

    const call = async () => {

        let replies;

        try {
            replies = await doGetReplies(listingID);
        }
        catch (error) {
            console.error(error);
        }

        return replies;
    };

    return await call();
}

// Implementation for getting the replies for a comment. Returns all replies sorted by time.
async function doGetReplies( listingID ){

    let replies;
    try {
        await connectReplies(); // Connects to reply collection

        console.log("2 mongologic getreply.....listingID: ", listingID)

        let query = {
            "ListingID" : listingID
        };

        replies = await col.find( query ).sort({ "TimeStamp" : 1 }).toArray();

        console.log("3 ....Mongologic replies: ",)

    }
    catch (err){
        console.log("ERROR LOG getListings: " + err);
    }

    await client.close();

    return replies;
}

// Calls implementation for getComments. Input the listing's ID to get it's comments.
function getComments( listingID ){

    const call = async () => {

        let comments;

        try {
            comments = await doGetComments( listingID );
        }
        catch (error) {
            console.error(error);
        }

        return comments;
    };

    return call();
}

// Implementation for getting the replies for a listing. Returns all comments sorted by time.
async function doGetComments( listingID ){

    let comments;
    try {
        await connectComments(); // Connects to listing collection

        let query = {
            "ListingID" : listingID
        };

        console.log("Mongologic..getComments... query: ", listingID);

        comments = await col.find( query ).sort({ "Timestamp" : 1 }).toArray();

        //console.log("...GetComments...returned comments: ", comments)

    }
    catch (err){
        console.log("ERROR LOG getListings: " + err);
    }

    await client.close()

    return comments;
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
        console.log( "_________________mongoLogic... DoEditListing..... \n" + listingId );
        
        // Update the listing with the new data
        await col.updateOne({ "ID": listingId }, { $set: updData });
    }
    catch (err){
        console.log(err);
    }

    await client.close();
}

// Calls implementation for deleting a listing.
function deleteListing( listingID ){

    const call = async () => {

        try {
            await doDeleteListing( listingID );
        }
        catch (error) {
            console.error(error);
        }
    };

    return call();
}

// Deletes a listing
async function doDeleteListing( listingID ){
    let valid;
    try {

        await connectListings();

        // outputs the listing's ID
        console.log( "_________________mongoLogic... doDeleteListing..... \n" + listingID );

        // Update the listing with the new data
        valid = await col.deleteOne({ "ID": listingID });
    }
    catch (err){
        console.log(err);
    }

    await client.close();
    return valid;
}

/*
 Creates a new comment.
 Input the username, message, and listingID in the commentData.
 */
function createComment(commentData ){
    const call = async () => {

        try {
            await doCreateComment( commentData );
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}


// Implementation to create a comment.
async function doCreateComment( commentData )   {

    const { username, message, listingID  } = commentData;

    try {
        await connectComments(); // Connects to user collection

        // Initializes the user
        let comment = {
            "Username" : username,
            "Message" : message,
            "Timestamp" : new Date(Date.now()).toLocaleString(),
            "ListingID" : listingID,
            "CommentID": generateUniqueID()
        }

        const product = await col.insertOne(comment); // Inserts the user

        if( await col.findOne(comment) ) {
            console.log("Message found in database. ~Probably created");
        }
        else {
            console.log("Message not found in database. ~Probably not created")
        }
    }
    catch (err){
        console.log(err);
    }
    await client.close()
}



/*
 Creates a new reply.
 Input the username, message, repliedTo, and commentID in the replyData.
 */
function createReply( replyData ){


    const call = async () => {

        try {
            await doCreateReply( replyData );
        }
        catch (error) {
            console.error(error);
        }
    };

    const result = call();
}


// Implementation to create a Reply.
async function doCreateReply( replyData ){

    const { username, message, repliedTo, commentID, listingID  } = replyData;

    try {
        await connectReplies(); // Connects to user collection

        // Initializes the user
        let comment = {
            "Username" : username,
            "Message" : message,
            "RepliedTo": repliedTo,
            "Timestamp" : new Date(Date.now()).toLocaleString(),
            "CommentID" : commentID,
            "ListingID" : listingID
        }

        const product = await col.insertOne(comment); // Inserts the user

        if( await col.findOne(comment) ) {
            console.log("Reply found in database. ~Probably created");
        }
        else {
            console.log("Reply not found in database. ~Probably not created")
        }
    }
    catch (err){
        console.log(err);
    }
    await client.close()
}



// USE THE WRAPPER CLASS NOT THE IMPLEMENTATION CLASS. Unless you don't want to.
module.exports = {
    validateLogin,
    createUser,
    createListing,
    getListings,
    editListing,
    generateUniqueID,
    deleteListing,
    getComments,
    getReplies,
    createComment,
    createReply,
    closeMongo
}
// Initializing the variables to connect to the database.
import {MongoClient} from "mongodb";
const url = "mongodb+srv://cc465proj:cc465proj@cluster0.3wpv56y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CommunityComrades";
let col = '';

// Starts the connection to the Users collection
async function connectUsers(){

    try {
        // Connecting to the Users collection.
        await client.connect();
        const db = client.db(dbName);
        col = db.collection("Users");
    }
    catch (err){
        console.log(err)
    }
}

// Calls validateLogin implementation
export function ValidateLogin(username, password){

    const call = async () => {

        try {
            // Call validateLogin and await its result
            await validateLoginImplementation(username, password);
        }
        catch (error) {
            console.error(error);
        }
    };
}


// Checks the database to see if it is a valid login.
async function validateLoginImplementation(username, password ){

    try{

        await connectUsers();

        // Creating the user query
        let userQuery = {
            "username" : username,
            "password" : password
        }

        // Searching for the user in the database
        const valid = col.findOne(userQuery);

        // Outputs if the user was found
        if( valid ) {
            console.log("User login successful: " + valid);

        }
        else console.log("User login failed: " + valid);
    }
    catch( err ){
        console.log(err)
    }
    finally{
        await client.close()
    }
}


// Creates a new user
async function createUser( email, username, password ) {

    try {
        await connectUsers(); // Connects to user collection

        // Initializes the user
        let user = {
            "email" : email,
            "username" : username,
            "password" : password
        }

        const product = await col.insertOne(user); // Inserts the user
    }
    catch (err){
        console.log(err);
    }
    finally {
        await client.close()
    }
}


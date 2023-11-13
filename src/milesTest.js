import mongoLogic from './mongoLogic.cjs'

const {validateLogin, createUser, createListing, getListings} = mongoLogic;


// READ THIS: Running more than one at once causes an error. I think.

// Condition: ( New/Good, Used/Pre-owned, Refurbished, Damaged)
// Category: ( Tech, Home, Apparel, Automobiles, Games )

// createListing("Person", "Franklin", "450",
//    "This is a person", "Placeholder person picture", "redacted",
//     "Used/Pre-owned", "Tech" );

// getListings();

// createUser( "test@gmail.com", "TestUser", "1234");

// const p = validateLogin("TestUser", "1234");
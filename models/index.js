// Importing the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Importing the dotenv library to load environment variables from a .env file
const dotenv = require("dotenv");

// Loading environment variables from the .env file into process.env
dotenv.config();

// Setting the default Promise library for Mongoose to the global Promise object
mongoose.Promise = global.Promise;

// Retrieving the MongoDB connection URL from the environment variables
const mongoURL = process.env.MONGO_URL;

// Creating an object to store references to the database connection, URL, and models
const db = {};

// Storing the mongoose instance in the db object
db.mongoose = mongoose;

// Storing the MongoDB connection URL in the db object
db.url = mongoURL;

// Importing and storing the Ticket model in the db object
db.tickets = require("./ticketModel")(mongoose);

// Importing and storing the Employee model in the db object
db.employees = require("./employeeModel")(mongoose);

// Exporting the db object for use in other modules
module.exports = db;

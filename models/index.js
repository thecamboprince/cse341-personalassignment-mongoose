const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.Promise = global.Promise;

const mongoURL = process.env.MONGO_URL;

const db = {};
db.mongoose = mongoose;
db.url = mongoURL;
db.tickets = require("./ticketModel")(mongoose);
db.employees = require("./employeeModel")(mongoose);

module.exports = db;

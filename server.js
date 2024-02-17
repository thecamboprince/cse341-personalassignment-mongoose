const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const port = process.env.PORT || 8080;

app.use(bodyParser.json()).use(cors()).use("/", require("./routes"));

db.mongoose
  // Establishing a connection to the MongoDB database using the Mongoose library,
  // and passing the MongoDB connection URI retrieved from environment variables
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `\nConnected to MongoDB and server running on port ${port}.\n`
      );
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

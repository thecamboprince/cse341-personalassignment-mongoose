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
  .connect(process.env.MONGODB_URI, {
    // Accessing MongoDB URI from environment variable
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

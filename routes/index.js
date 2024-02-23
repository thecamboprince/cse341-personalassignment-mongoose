// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();
const { auth } = require("express-openid-connect");

router.use("/", require("./swagger"));
router.use("/tickets", require("./tickets"));
router.use("/employees", require("./employees"));

// Handle the root URL ("/")
router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.send(
      `Logged in as ${req.oidc.user.name}. Click <a href="https://cse341-personalassignment-mongoose.onrender.com/api-docs">here</a> to go to the API docs page!`
    );
  } else {
    res.send(
      'Logged Out. Please <a href="https://cse341-personalassignment-mongoose.onrender.com/login">go to localhost:8080/login</a> to login.'
    );
  }
});

module.exports = router;

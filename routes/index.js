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
    res.send(`Logged in as ${req.oidc.user.name}`);
  } else {
    res.send("Logged Out");
  }
});

module.exports = router;

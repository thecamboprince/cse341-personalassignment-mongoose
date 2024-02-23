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
    // res.send(
    //   `Logged in as ${req.oidc.user.name}.<br><br> Click <a href="https://cse341-personalassignment-mongoose.onrender.com/api-docs">here</a> to go to the API docs page!`
    // );
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=https://cse341-personalassignment-mongoose.onrender.com/api-docs">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
</head>
<body>
    <p>This page has moved. If you are not redirected, <a href="https://cse341-personalassignment-mongoose.onrender.com/api-docs">click here</a>.</p>
</body>
</html>
`);
  } else {
    res.send(
      'Logged Out.<br><br> Please click <a href="https://cse341-personalassignment-mongoose.onrender.com/login">here</a> to login.'
    );
  }
});

module.exports = router;

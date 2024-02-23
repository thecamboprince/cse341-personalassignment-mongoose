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
    // Create an HTML string dynamically
    // Create an HTML string dynamically
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Logged In</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    border: 2px solid #333;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                .message {
                    font-size: 24px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    You are logged in as *<span id="username"></span>*.<br><br><br> Click <a href="https://cse341-personalassignment-mongoose.onrender.com/api-docs">here</a> to go to the api-docs page!
                    <br><br>Or<br><br>You can click <a href="https://cse341-personalassignment-mongoose.onrender.com/logout">here</a> to logout!
                </div>
            </div>
            <script>
                // JavaScript to display the username dynamically
                const username = "${req.oidc.user.name}";
                document.getElementById("username").innerText = username;
            </script>
        </body>
        </html>
        `;

    // Send the HTML content as a response
    res.send(htmlContent);
  } else {
    // res.send(
    //   'Logged Out.<br><br> Please click <a href="https://cse341-personalassignment-mongoose.onrender.com/login">here</a> to login.'
    // );
    // Create an HTML string dynamically
    const htmlContent2 = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Logged Out</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    border: 2px solid #333;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                .message {
                    font-size: 24px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    *Logged Out*.<br><br><br> Click <a href="https://cse341-personalassignment-mongoose.onrender.com/login">here</a> to login.
                    <br><br>Or<br><br>You can click <a href="https://cse341-personalassignment-mongoose.onrender.com/api-docs">here</a> to go the api-docs page!
                </div>
            </div>
        </body>
        </html>
        `;

    // Send the HTML content as a response
    res.send(htmlContent2);
  }
});

module.exports = router;

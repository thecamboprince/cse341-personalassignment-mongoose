// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/", require("./home"));
router.use("/tickets", require("./tickets"));
router.use("/employees", require("./employees"));

module.exports = router;

// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

const ticketsController = require("../controllers/tickets");

// GET Requests (Read)
router.get("/", ticketsController.getAllTickets);
router.get("/:id", ticketsController.getSingleTicket);

// POST Requests (Create)
router.post("/", ticketsController.createTicket);

module.exports = router;

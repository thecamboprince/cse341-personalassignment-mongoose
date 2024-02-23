// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();
const validation = require("../validate/validate");
const authorize = require("../controllers/authenticate");
const ticketsController = require("../controllers/tickets");

// GET Requests (Read)
router.get("/", ticketsController.getAllTickets);
router.get("/:id", ticketsController.getSingleTicket);

// POST Requests (Create)
router.post(
  "/",
  authorize.authUserLogin,
  validation.ticketDataValidation(),
  validation.checkTicketData,
  validation.handleErrors(ticketsController.createTicket)
);

// PUT Requests (Update)
router.put(
  "/:id",
  authorize.authUserLogin,
  validation.ticketDataValidation(),
  validation.checkTicketData,
  validation.handleErrors(ticketsController.updateTicket)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  authorize.authUserLogin,
  validation.handleErrors(ticketsController.deleteTicket)
);

module.exports = router;

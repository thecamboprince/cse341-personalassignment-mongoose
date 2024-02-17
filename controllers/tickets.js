const { ObjectId } = require("mongodb");
const db = require("../models");
const Tickets = db.tickets;

// GET Request Controllers (Read)

const getAllTickets = async (req, res, next) => {
  // #swagger.description = 'Getting all tickets from our database'
  Tickets.find({})
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while getting tickets.",
      });
    });
};

const getSingleTicket = async (req, res, next) => {
  // #swagger.description = 'Getting a single ticket from our database using id'

  const userId = req.params.id;
  Tickets.findOne({ _id: userId })
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No ticket found with id " + userId });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting ticket with id " + userId,
      });
    });
};

// POST Request Controllers (Create)
const createTicket = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single ticket to our database'

    const {
      title,
      description,
      assignee,
      reporter,
      priority,
      status,
      createdDate,
      lastUpdatedDate,
      comments,
    } = req.body;
    const requiredFields = {
      title,
      description,
      assignee,
      reporter,
      priority,
      status,
      createdDate,
      lastUpdatedDate,
      comments,
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).send({ message: `Please provide ${field}.` });
      }
    }

    const ticket = new Tickets({
      title,
      description,
      assignee,
      reporter,
      priority,
      status,
      createdDate,
      lastUpdatedDate,
      comments,
    });

    const data = await ticket.save();
    console.log(data);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occurred while creating a ticket.",
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    // #swagger.description = 'Updating a single ticket to our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid ticket id to update a ticket");
    }

    const userId = req.params.id;
    const ticket = {
      title: req.body.title,
      description: req.body.description,
      assignee: req.body.assignee,
      reporter: req.body.reporter,
      priority: req.body.priority,
      status: req.body.status,
      createdDate: req.body.createdDate,
      lastUpdatedDate: req.body.lastUpdatedDate,
      comments: req.body.comments,
    };

    // Check for missing fields in the updated ticket data
    const requiredFields = [
      "title",
      "description",
      "assignee",
      "reporter",
      "priority",
      "status",
      "createdDate",
      "lastUpdatedDate",
      "comments",
    ];
    const missingFields = requiredFields.filter((field) => !ticket[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const response = await Tickets.findByIdAndUpdate(userId, ticket, {
      new: true,
    });

    if (!response) {
      return res
        .status(404)
        .send({ message: "No ticket found with id " + userId });
    }

    return res.status(204).json(response);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error updating ticket: " + err.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    // #swagger.description = 'Deleting a single ticket to our database'
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid ticket id to delete a ticket");
    }

    const userId = req.params.id;

    const data = await Tickets.deleteOne({ _id: userId });

    if (data.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res
        .status(500)
        .json("Some error occurred while deleting the ticket.");
    }
  } catch (error) {
    return res
      .status(500)
      .json("An error occurred while processing your request.");
  }
};

module.exports = {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};

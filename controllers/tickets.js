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
        message: err.message || "An error occurred while getting tasks.",
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
  // #swagger.description = 'Creating a single task to our database'

  const ticket = new Tickets({
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    reporter: req.body.reporter,
    priority: req.body.priority,
    status: req.body.status,
    createdDate: req.body.createdDate,
    lastUpdatedDate: req.body.lastUpdatedDate,
    comments: req.body.comments,
  });

  await ticket
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating a task.",
      });
    });
};

module.exports = { getAllTickets, getSingleTicket, createTicket };

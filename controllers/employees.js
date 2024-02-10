const { ObjectId } = require("mongodb");
const db = require("../models");
const Employees = db.employees;

const getAllEmployees = async (req, res, next) => {
  // #swagger.description = 'Getting all employees from our database'
  Employees.find({})
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while getting employees.",
      });
    });
};

const getSingleEmployee = async (req, res, next) => {
  // #swagger.description = 'Getting a single ticket from our database using id'
  const userId = req.params.id;
  Employees.findOne({ _id: userId })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "No employee found with id " + userId });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting employee with id " + userId,
      });
    });
};

// POST Request Controllers (Create)
const createEmployee = async (req, res) => {
  // #swagger.description = 'Creating a single employee to our database'
  const employee = new Employees({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await employee
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating a employee.",
      });
    });
};

module.exports = { getAllEmployees, getSingleEmployee, createEmployee };

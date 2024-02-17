const { ObjectId } = require("mongodb");
const db = require("../models");
const Employees = db.employees;
const bcrypt = require("bcryptjs");
const { validatePassword } = require("../passwordUtils/passwordUtils");

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
  try {
    // #swagger.description = 'Creating an account to our database'
    let hashedPassword;

    // Validate password complexity
    const passwordValidation = validatePassword(req.body.password);
    if (passwordValidation.error) {
      const missingRequirements = passwordValidation.error.details.map(
        (detail) => detail.message
      );
      return res.status(400).json({
        error: `Password does not meet complexity requirements. Missing requirements: ${missingRequirements.join(
          ", "
        )}`,
      });
    }

    // Hash password
    hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    const employee = new Employees({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const data = await employee.save();
    console.log(data);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "Some error occurred while creating user.",
    });
  }
};

// Update Employee
// Update Employee
const updateEmployee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid employee id to update an employee");
    }

    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Check for missing fields in the updated employee data
    const requiredFields = ["username", "email"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).json({ error: "Bad Request - " + errorMessage });
    }

    // Validate password complexity
    if (password) {
      const passwordValidation = validatePassword(password);
      if (passwordValidation.error) {
        const missingRequirements = passwordValidation.error.details.map(
          (detail) => `- ${detail.message}`
        );
        const errorMessage = `Password does not meet complexity requirements. Missing requirements: ${missingRequirements.join(
          ", "
        )}`;
        return res.status(400).json({ error: errorMessage });
      }
    }

    // Hash password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hashSync(password, 10);
    }

    // Update employee data
    const updatedEmployeeData = { username, email };
    if (hashedPassword) {
      updatedEmployeeData.password = hashedPassword;
    }

    // Update employee
    const updatedEmployee = await Employees.findByIdAndUpdate(
      userId,
      updatedEmployeeData,
      {
        new: true,
      }
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ error: "No employee found with id " + userId });
    }

    return res.status(204).json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating employee: " + error.message,
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Must use a valid employee id to delete an employee." });
    }

    const userId = req.params.id;

    // Fetch the employee before deletion to get the username
    const employeeToDelete = await Employees.findById(userId);

    if (!employeeToDelete) {
      return res
        .status(404)
        .json({ error: "No employee found with id " + userId });
    }

    // Get the username of the employee
    const { username } = employeeToDelete;

    // Delete the employee
    const deletedEmployee = await Employees.findByIdAndDelete(userId);

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ error: "No employee found with id " + userId });
    }

    return res
      .status(200)
      .json({ message: `Employee: *${username}* was deleted successfully.` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting employee." });
  }
};

module.exports = {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

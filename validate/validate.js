// Importing the 'body' and 'validationResult' objects from the 'express-validator' library
const { body, validationResult } = require("express-validator");
// Loading environment variables from a '.env' file into process.env
require("dotenv").config();

// Defining a function named 'ticketDataValidation'
const ticketDataValidation = () => {
  // Returning an array of middleware functions for validating ticket data
  return [
    // Validation for the 'title' field
    body("title")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please provide a title."), // Custom error message if validation fails

    // Validation for the 'description' field
    body("description")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please provide a description."), // Custom error message if validation fails

    // Validation for the 'assignee' field
    body("assignee")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please provide an assignee."), // Custom error message if validation fails

    // Validation for the 'reporter' field
    body("reporter")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please provide the name of the reporter."), // Custom error message if validation fails

    // Validation for the 'priority' field
    body("priority")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please, provide a job priority."), // Custom error message if validation fails

    // Validation for the 'status' field
    body("status")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please, provide a status."), // Custom error message if validation fails

    // Validation for the 'createdDate' field
    body("createdDate")
      .trim()
      .isISO8601() // Check if the field value is a valid ISO 8601 date string
      .withMessage(
        "Please provide a valid ISO 8601 formatted date as yyyy-mm-dd."
      ) // Custom error message if validation fails
      .toDate(), // Convert the validated date string to a JavaScript Date object

    // Validation for the 'lastUpdatedDate' field
    body("lastUpdatedDate")
      .trim()
      .isISO8601() // Check if the field value is a valid ISO 8601 date string
      .withMessage(
        "Please provide a valid ISO 8601 formatted date as yyyy-mm-dd."
      ) // Custom error message if validation fails
      .toDate(), // Convert the validated date string to a JavaScript Date object

    // Validation for the 'comments' field
    body("comments")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please, provide a comment."), // Custom error message if validation fails
  ];
};

// Define an asynchronous middleware function named 'checkTicketData' with parameters req, res, and next
const checkTicketData = async (req, res, next) => {
  // Destructuring request body to extract specific fields
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

  // Initialize an empty array to store validation errors
  let errors = [];

  // Retrieve validation errors from the request object
  errors = validationResult(req);

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // If there are validation errors, construct an error message
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    // Return a response with a 404 status code and an error message
    return res
      .status(404)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }

  // If there are no validation errors, call the next middleware in the chain
  next();
};

// Define a function named 'employeeDataValidation' to validate employee data
const employeeDataValidation = () => {
  // Return an array of middleware functions for validating employee data
  return [
    // Validation for the 'username' field
    body("username")
      .trim()
      .isLength({ min: 1 }) // Check if the length of the field is at least 1 character
      .withMessage("Please provide a username."), // Custom error message if validation fails

    // Validation for the 'email' field
    body("email")
      .trim()
      .isEmail() // Check if the field value is a valid email address
      .withMessage("Please provide a valid email address."), // Custom error message if validation fails

    // Validation for the 'password' field
    body("password")
      .trim()
      .isLength({ min: 6 }) // Check if the length of the field is at least 6 characters
      .withMessage("Password must be at least 6 characters long."), // Custom error message if validation fails
  ];
};

// Define an asynchronous middleware function named 'checkEmployeeData' with parameters req, res, and next
const checkEmployeeData = async (req, res, next) => {
  // Destructure request body to extract specific fields
  const { username, email, password } = req.body;

  // Initialize an empty array to store validation errors
  let errors = [];

  // Retrieve validation errors from the request object
  errors = validationResult(req);

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // If there are validation errors, construct an error message
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    // Return a response with a 404 status code and an error message
    return res
      .status(404)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }

  // If there are no validation errors, call the next middleware in the chain
  next();
};

// Define a higher-order function named 'handleErrors' which takes a function 'fn' as input
const handleErrors = (fn) => (req, res, next) =>
  // Resolve the promise returned by calling the input function 'fn' with the provided arguments
  Promise.resolve(fn(req, res, next))
    // Catch any errors that occur during the execution of 'fn' and pass them to the next middleware
    .catch(next);

// Export an object containing various functions for handling ticket and employee data validation
module.exports = {
  // Export the 'ticketDataValidation' function for validating ticket data
  ticketDataValidation,
  // Export the 'checkTicketData' function for checking ticket data against validation rules
  checkTicketData,
  // Export the 'employeeDataValidation' function for validating employee data
  employeeDataValidation,
  // Export the 'checkEmployeeData' function for checking employee data against validation rules
  checkEmployeeData,
  // Export the 'handleErrors' function for handling errors in asynchronous middleware functions
  handleErrors,
};

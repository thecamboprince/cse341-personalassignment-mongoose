const { body, validationResult } = require("express-validator");
require("dotenv").config();

const ticketDataValidation = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a title."),

    body("description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    body("assignee")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an assignee."),

    body("reporter")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide the name of the reporter."),

    body("priority")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a job priority."),

    body("status")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a status."),

    body("createdDate")
      .trim()
      .isISO8601()
      .withMessage(
        "Please provide a valid ISO 8601 formatted date as yyyy-mm-dd."
      )
      .toDate(), // Convert to Date object

    body("lastUpdatedDate")
      .trim()
      .isISO8601()
      .withMessage(
        "Please provide a valid ISO 8601 formatted date as yyyy-mm-dd."
      )
      .toDate(), // Convert to Date object

    body("comments")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a comment."),
  ];
};

const checkTicketData = async (req, res, next) => {
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
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");
    return res
      .status(404)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }
  next();
};

const employeeDataValidation = () => {
  return [
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a username."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ];
};

const checkEmployeeData = async (req, res, next) => {
  const { username, email, password } = req.body;
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");
    return res
      .status(404)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }
  next();
};

const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  ticketDataValidation,
  checkTicketData,
  employeeDataValidation,
  checkEmployeeData,
  handleErrors,
};

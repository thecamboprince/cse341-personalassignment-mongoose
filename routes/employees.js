const express = require("express");
const router = express.Router();
const validation = require("../validate/validate");
const authorize = require("../controllers/authenticate");
const employeesController = require("../controllers/employees");

// GET Requests (Read)
router.get("/", employeesController.getAllEmployees);
router.get("/:id", employeesController.getSingleEmployee);

// POST Requests (Create)
router.post(
  "/",
  authorize.authUserLogin,
  validation.employeeDataValidation(),
  validation.checkEmployeeData,
  validation.handleErrors(employeesController.createEmployee)
);

//PUT Request (update)
router.put(
  "/:id",
  authorize.authUserLogin,
  validation.employeeDataValidation(),
  validation.checkEmployeeData,
  validation.handleErrors(employeesController.updateEmployee)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  authorize.authUserLogin,
  validation.handleErrors(employeesController.deleteEmployee)
);

module.exports = router;

const express = require("express");
const router = express.Router();
const validation = require("../validate/validate");

const employeesController = require("../controllers/employees");

// GET Requests (Read)
router.get("/", employeesController.getAllEmployees);
router.get("/:id", employeesController.getSingleEmployee);

// POST Requests (Create)
router.post(
  "/",
  validation.employeeDataValidation(),
  validation.checkEmployeeData,
  validation.handleErrors(employeesController.createEmployee)
);

//PUT Request (update)
router.put(
  "/:id",
  validation.employeeDataValidation(),
  validation.checkEmployeeData,
  validation.handleErrors(employeesController.updateEmployee)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  validation.handleErrors(employeesController.deleteEmployee)
);

module.exports = router;

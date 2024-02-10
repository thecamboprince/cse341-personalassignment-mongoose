const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employees");

// GET Requests (Read)
router.get("/", employeesController.getAllEmployees);
router.get("/:id", employeesController.getSingleEmployee);

// POST Requests (Create)
router.post("/", employeesController.createEmployee);

module.exports = router;

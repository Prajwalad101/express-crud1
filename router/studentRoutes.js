const express = require("express");
const studentController = require("../controller/studentController");

const router = express.Router();

router.param("id", studentController.checkStId);

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.route("/:id").get(studentController.getStudent);

module.exports = router;

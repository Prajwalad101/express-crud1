const express = require("express");

const studentRouter = require("./router/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use("/api/v1/students", studentRouter);

module.exports = app;

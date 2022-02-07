const fs = require("fs");

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/G2.json`)
);

const checkStId = (req, res, next, val) => {
  const student = students.find((st) => st.id === val * 1);

  if (!student) {
    return res.status(400).json({
      status: "fail",
      message: "student not found",
    });
  }
  next();
};

//* GETS ALL THE STUDENTS
const getAllStudents = (req, res) => {
  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students,
    },
  });
};

//* CREATES A NEW STUDENT
const createStudent = (req, res) => {
  const newId = students[students.length - 1].id + 1;

  const newStudent = Object.assign({ id: newId }, req.body);
  students.push(newStudent);

  fs.writeFile(
    `${__dirname}/../dev-data/G2.json`,
    JSON.stringify(students),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          student: newStudent,
        },
      });
    }
  );
};

//* GETS A STUDENT
const getStudent = (req, res) => {
  const id = req.params.id * 1;
  const student = students.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

module.exports = { getAllStudents, createStudent, getStudent, checkStId };

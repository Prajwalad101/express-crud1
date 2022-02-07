const fs = require("fs");

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/G2.json`)
);

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

module.exports = { getAllStudents, createStudent };

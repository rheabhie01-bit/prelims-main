const express = require('express');
const app = express();
const db = require('./db');

const PORT = 3004;

// app.get("/", (req, res) => {
//   res.send("Student api is running")
// });


// app.get("/", (req, res) => {
//   res.json ([
//     { id: 1,
//       name: 'Rhea Benitez', 
//       course: 'BSIT' }
//   ]);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

// ADDED: lets the server read the JSON sent by the React form
app.use(express.json());

app.get("/", (req,res) =>{
  res.json({
    message: "Student APi is running",
  });
});

app.get("/api/student", (req,res) => {
  const sql = "SELECT * FROM student";

  db.query(sql, (err,results)=> {
    if (err){
      console.error(err);

      return res.status(500).json({
        message: "Failed to retrieve student",
      });
    }

    res.json(results);
  });
});

// ADDED: save a new student
app.post("/api/student", (req,res) => {
  const { name, course, age } = req.body;

  if (!name || !course || !age) {
    return res.status(400).json({
      message: "Name, course, and age are required",
    });
  }

  const sql = "INSERT INTO student (name, course, age) VALUES (?, ?, ?)";

  db.query(sql, [name, course, age], (err, result) => {
    if (err){
      console.error(err);

      return res.status(500).json({
        message: "Failed to add student",
      });
    }

    res.status(201).json({
      id: result.insertId,
      name,
      course,
      age,
    });
  });
});

// ADDED: update an existing student
app.put("/api/student/:id", (req,res) => {
  const { name, course, age } = req.body;

  if (!name || !course || !age) {
    return res.status(400).json({
      message: "Name, course, and age are required",
    });
  }

  const sql = "UPDATE student SET name = ?, course = ?, age = ? WHERE id = ?";

  db.query(sql, [name, course, age, req.params.id], (err, result) => {
    if (err){
      console.error(err);

      return res.status(500).json({
        message: "Failed to update student",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      id: Number(req.params.id),
      name,
      course,
      age,
    });
  });
});

// ADDED: delete a student
app.delete("/api/student/:id", (req,res) => {
  const sql = "DELETE FROM student WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err){
      console.error(err);

      return res.status(500).json({
        message: "Failed to delete student",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
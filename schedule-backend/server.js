const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const basicAuth = require("express-basic-auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "schedule_admin",
  password: "password",
  database: "schedule_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Basic Auth Middleware
const adminAuth = basicAuth({
  users: { admin: "password" },
  challenge: true,
});

// Public endpoint to get schedule
app.get("/api/schedule", (req, res) => {
  const sql = "SELECT * FROM schedule";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint to delete an event
app.delete("/api/schedule/:id", adminAuth, (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM schedule WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Event deleted successfully", id });
  });
});

// Password-protected endpoint to modify schedule
app.post("/api/schedule", adminAuth, (req, res) => {
  const { title, start, end } = req.body;
  const sql = "INSERT INTO schedule (title, start, end) VALUES (?, ?, ?)";
  db.query(sql, [title, start, end], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, title, start, end });
  });
});

// Serve React app
app.use(express.static(path.join(__dirname, "../schedule-app/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../schedule-app/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

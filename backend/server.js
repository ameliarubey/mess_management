const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* 🔹 REGISTER */
app.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, password, role], (err, result) => {
        if (err) return res.send(err);
        res.send("User registered successfully");
    });
});

/* 🔹 LOGIN */
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.send(err);

        if (result.length > 0) {
            res.json(result[0]); // send user data
        } else {
            res.send("Invalid credentials");
        }
    });
});

/* 🔒 PROTECTED ROUTE (ADMIN ONLY) */
app.get("/admin", (req, res) => {
    const role = req.query.role;

    if (role === "admin") {
        res.send("Welcome Admin Dashboard");
    } else {
        res.status(403).send("Access Denied");
    }
});

/* 🔒 STUDENT ONLY */
app.get("/student", (req, res) => {
    const role = req.query.role;

    if (role === "student") {
        res.send("Welcome Student Dashboard");
    } else {
        res.status(403).send("Access Denied");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
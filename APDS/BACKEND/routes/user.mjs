import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";

const router = express.Router();
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

// Sign up
router.post("/signup", async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10); // Hash and salt password
    let newDocument = {
        name: req.body.name,
        id_number: req.body.id_number,  // ID number
        account_number: req.body.account_number,  // Account number
        password: password
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.status(201).json({ message: "User registered successfully" });
});

// Login
router.post("/login", bruteforce.prevent, async (req, res) => {
    const { name, account_number, password } = req.body;
    try {
        const collection = await db.collection("users");
        const user = await collection.findOne({ name, account_number });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const token = jwt.sign({ name: req.body.name, account_number: req.body.account_number }, "this_secret_should_be_longer_than_it_is", { expiresIn: "1h" });
        res.status(200).json({ message: "Authentication successful", token: token, name: req.body.name });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

export default router;
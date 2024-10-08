import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/conn.mjs";
import ExpressBrute from "express-brute";

const router = express.Router();
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

// Register new customer
router.post("/signup", async (req, res) => {
    // Input validation with RegEx for ID and account number
    if (!/^[a-zA-Z\s]+$/.test(req.body.name) || !/^\d{13}$/.test(req.body.id_number) || !/^\d{10}$/.test(req.body.account_number)) {
        return res.status(400).json({ message: "Invalid input format" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newCustomer = {
        name: req.body.name,
        id_number: req.body.id_number,
        account_number: req.body.account_number,
        password: hashedPassword
    };

    const collection = await db.collection("users");
    await collection.insertOne(newCustomer);
    res.status(201).json({ message: "Customer registered successfully" });
});

// Login for customer
router.post("/login", bruteforce.prevent, async (req, res) => {
    const { name, account_number, password } = req.body;

    const collection = await db.collection("users");
    const customer = await collection.findOne({ name, account_number });

    if (!customer) {
        return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ name, account_number }, "supersecret", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
});

export default router;
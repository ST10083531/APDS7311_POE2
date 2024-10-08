import express from "express";
import db from "../db/conn.mjs";
import checkauth from "../check_auth.mjs";  // Ensure only authenticated users can make payments

const router = express.Router();

// Make a payment
router.post("/pay", checkauth, async (req, res) => {
    const { amount, currency, provider, account_info, swift_code } = req.body;

    // Input validation with RegEx
    if (!/^\d+(\.\d{1,2})?$/.test(amount) || !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(swift_code)) {
        return res.status(400).json({ message: "Invalid input format" });
    }

    const newTransaction = {
        user: req.user.name,
        amount,
        currency,
        provider,
        account_info,
        swift_code,
        status: "pending"
    };

    const collection = await db.collection("transactions");
    await collection.insertOne(newTransaction);
    res.status(201).json({ message: "Payment successful" });
});

// Get all transactions for employees to review
router.get("/transactions", checkauth, async (req, res) => {
    const collection = await db.collection("transactions");
    const transactions = await collection.find({ status: "pending" }).toArray();
    res.status(200).json(transactions);
});

// Employee verifies a transaction
router.patch("/verify/:id", checkauth, async (req, res) => {
    const { id } = req.params;
    const collection = await db.collection("transactions");

    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "verified" } }
    );

    res.status(200).json({ message: "Transaction verified" });
});

export default router;
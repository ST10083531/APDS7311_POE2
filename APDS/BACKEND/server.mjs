import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import db from "./db/conn.mjs";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

app.use(cors());
app.use(express.json());

app.use("/post", posts);
app.use("/user", users);

// Insert pre-registered employee accounts (only once)
async function insertPreRegisteredAccounts() {
  const collection = await db.collection("users");
  const existingUser = await collection.findOne({ name: "ST10083531" });  // Check if already exists
  if (!existingUser) {
    const preRegisteredAccounts = [
      { name: "ST10083531", password: await bcrypt.hash("Legends69", 10) },
      { name: "ST10034279", password: await bcrypt.hash("Legends69", 10) },
      { name: "ST10201101", password: await bcrypt.hash("Legends69", 10) }
    ];

    await collection.insertMany(preRegisteredAccounts);
    console.log("Pre-registered accounts inserted.");
  }
}

insertPreRegisteredAccounts().catch(console.error);

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});
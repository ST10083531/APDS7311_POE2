import https from "https";
import fs from "fs";
import express from "express";
import cors from "cors";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";

const PORT = 3000;
const app = express();

// SSL options
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

app.use(cors());
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use("/post", posts);
app.use("/user", users);

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const authRoute = require("./routes/api/auth");
const usersRoute = require("./routes/api/users");

// Set up middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Set up MongoDB
connectDB();

// Set up routes
app.get("/", (req, res) => res.send("API Running"));
app.use("/api/auth", authRoute);
app.use("/api/account", usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

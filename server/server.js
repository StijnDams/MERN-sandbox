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

const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Set up websocket
var io = require("socket.io")(server);

io.origins((origin, callback) => {
  if (origin !== "http://localhost:8080") {
    return callback("origin not allowed", false);
  }
  callback(null, true);
});

// Set up websocket events
io.on("connection", function(socket) {
  socket.on("message", message => {
    console.log(message);
  });
});

const express = require("express");
const app = express();
const connectDB = require('./dbConnection')
const Ticket = require('./schema');
const cors = require("cors");

app.use(cors());
//Middleware for parsing Json
app.use(express.json());
//Connecting to Database
connectDB();
app.use(express.urlencoded({ extended: false }))
// creating an api and seperating it.
app.use("/api", require("./routes"));

// Serve static files from the React app build folder using absolute path
const path = require("path");
const buildPath = path.resolve(__dirname, "../front-end/build");
app.use(express.static(buildPath));

// For any route not handled by the API, serve the React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(8080);
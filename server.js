require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

const app = express();



// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());



// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(result => app.listen(PORT, () => console.log("Server is running at port 3000")))
    .catch(err => console.log(err));

// Routes
app.use(authRoutes);
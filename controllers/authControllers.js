require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
    const errors = { username: "", email: "", password: "" };

    // Login Functions
    // Incorrect Username
    if (err.message === "Incorrect username") {
        errors.username = "The username is incorrect";
    }

    // Incorrect Password
    if (err.message === "Incorrect password") {
        errors.password = "The password is incorrect";
    }

    // check for duplication errors
    if(err.code === 11000) {
        const errKeys = Object.keys(err.keyPattern);
        if (errKeys.includes("username")) {
            errors.username = "This username is already registered";
        }

        if (errKeys.includes("email")) {
            errors.email = "This email is already registered";
        }
    }

    // Check for validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
// Function to create jwt
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge,
    })
}

module.exports.home_page_get = (req, res) => {
    res.render("home");
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000,
            httpOnly: true
        });
        res.status(201).json({ user: user._id });
    }
    catch (err){
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
    
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username,  password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge * 1000,
            httpOnly: true
        });
        res.status(200).json({ user: user._id });
    }
    catch (err){
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}


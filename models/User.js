const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "An account already has this username"],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique: [true, "This email is already registered"],
        lowercase: true,
        validate: [isEmail, "This is not a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Your password should have at least 8 characters"]
    }
})


module.exports = mongoose.model("User", userSchema);
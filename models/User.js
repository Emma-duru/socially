const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "This is not a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Your password should have at least 8 characters"]
    }
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect username");
}


module.exports = mongoose.model("User", userSchema);
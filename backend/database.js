const mongoose = require("mongoose");
require('dotenv').config();
const DbUrl = process.env.DATABASE_URL;

mongoose.connect(DbUrl).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => {
    console.error("Failed to connect to MongoDB...", err);
});

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
const User = mongoose.model("User", userSchema);

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = ({
    User, Account
})
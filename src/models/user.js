"use strict"

const { mongoose } = require("../configs/dbConnection")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email field must be required"],
        unique: [true, "This email already exists. Email field must be unique"],
        validate: [
            (email) => {
                const regexEmailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return regexEmailCheck.test(email)
            },
            "Email type is not correct."
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, {
    collection: "users", timestamps: true
})

module.exports = mongoose.model("User", UserSchema)
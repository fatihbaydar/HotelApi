"use strict"

const { mongoose } = require("../configs/dbConnection")

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
        unique: true
    },
    token: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true
    }
}, {
    collection: "tokens", timestamps: true
})

module.exports = mongoose.model("Token", TokenSchema)
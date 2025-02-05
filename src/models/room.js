"use strict"

const { mongoose } = require("../configs/dbConnection")

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    bedType: {
        type: String,
        trim: true,
        required: true,
        enum: ["single", "double", "family", "king"]
    },
    bedSpace: {
        type: Number,
        min: 1,
        default: function (value) {
            if (this.bedType == "single") return 1
            else if (this.bedType == "double") return 2
        },

        transform: function (value) {
            if (this.bedType == "single") return 1
            else if (this.bedType == "double") return 2
        }
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        required: true,
        min: 50
    }
}, {
    collection: "rooms", timestamps: true
})

module.exports = mongoose.model("Room", RoomSchema)
"use strict"

const { mongoose } = require("../configs/dbConnection")

const ReservationSchmea = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    guestNumber: {
        type: Number,
        required: true,
        min: [1, "Guest number must be at least 1."]
    },
    night: {
        type: Number,
        required: true,
        min: [1, "Night number must be at least 1. "]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    totalPrice: {
        type: Number,
    }
},
    {
        collection: "reservation", timestamps: true
    })

module.exports = mongoose.model("Reservation", ReservationSchmea)
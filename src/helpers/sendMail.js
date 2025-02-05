"use strict"

const nodemailer = require("nodemailer")

module.exports = function (to, title, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fatihbaydar2004@gmail.com",
            pass: "gorc mayj kltq wvpx"
        }
    })

    transporter.sendMail({
        to: to,
        subject: title,
        text: message,
        html: message
    }, function (error, success) {
        success ? console.log("SUCCESS:", success) : console.log("ERROR:", error)
    })
}
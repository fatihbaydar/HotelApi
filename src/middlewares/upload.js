"use strict"

const multer = require("multer")

module.exports = multer({
    storage: multer.diskStorage({
        destination: "./upload/",
        filename: function (req, file, returnCallback) {
            returnCallback(null, Date.now() + "_" + file.originalname)
        }
    })
})
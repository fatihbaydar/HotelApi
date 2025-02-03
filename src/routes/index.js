"use strict"

const router = require("express").Router()

router.use("/user", require("./user"))
router.use("/room", require("./room"))
router.use("/token", require("./token"))
router.use("/reservation", require("./reservation"))
router.use("/auth", require("./auth"))

module.exports = router
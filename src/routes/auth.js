"use strict"

const router = require("express").Router()

const auth = require("../controllers/auth")

router.post("/login", auth.login)
router.post("/logout", auth.logout)

module.exports = router
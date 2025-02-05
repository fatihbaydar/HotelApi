"use strict"

const router = require("express").Router()
const upload = require("../middlewares/upload")

const room = require("../controllers/room")

router.route("/")
    .get(room.list)
    .post(upload.array("image"), room.create)

router.route("/:id")
    .get(room.read)
    .put(upload.array("image"), room.update)
    .patch(upload.array("image"), room.update)
    .delete(room.update)

module.exports = router


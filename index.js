"use strict"

const express = require("express")
const app = express()
/* ------------------------------------------------------- */

//? REQUIRED MODULES

require("dotenv").config()
const HOST = process.env?.HOST || "127.0.0.1"
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */

//? CONFIGURATION

const {dbConnection} = require("./src/configs/dbConnection")
dbConnection()
/* ------------------------------------------------------- */

//? MIDDLEWARES

/* ------------------------------------------------------- */

//? ROUTES

// HomePath
app.all("/", (req,res) => {
    res.send({
        error:false,
        message:"Welcome to HOTEL API",
        documents:{
            swagger:"/documents/swagger",
            redoc:"/documents/redoc",
            json:"/documents/json"
        },
        user:req.user
    })
})
/* ------------------------------------------------------- */

//? ERROR HANDLER
app.use(require("./src/middlewares/errorHandler"))
/* ------------------------------------------------------- */

//? RUN SERVER
app.listen(PORT, HOST, () => console.log(`running:http://${HOST}:${PORT}`))
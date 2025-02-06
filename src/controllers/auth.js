"use strict"

const User = require("../models/user")
const passwordEncrypt = require("../helpers/passwordEncrypt")
const Token = require("../models/token")
const jwt = require("jsonwebtoken")

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = "Login with username and password for get simpleToken"
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */
        const { username, password } = req.body

        if (username && password) {
            const user = await User.findOne({ username })

            if (user && user.password == passwordEncrypt(password)) {

                if (user.isActive) {
                    let tokenData = await Token.findOne({ userId: user._id })

                    if (!tokenData) {
                        const tokenKey = passwordEncrypt(user.id + Date.now())
                        tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    }

                    const accessData = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                    }

                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXP })

                    const refreshData = {
                        _id: user._id,
                        password: user.password
                    }

                    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: process.env.REFRESH_EXP })

                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        bearer: {
                          access: accessToken,
                          refresh: refreshToken
                        },
                        user,
                      });
                      
                } else {
                    res.errorStatusCode = 401
                    throw new Error("This account is not active")
                }
            } else {
                res.errorStatusCode = 401
                throw new Error("Wrong username or password")
            }
        } else {
            res.errorStatusCode = 401
            throw new Error("Please enter username and password")
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "SimpleToken: Logout"
            #swagger.description = "Delete token key."
        */
        const auth = req.headers?.authorization || null
        const tokenKey = auth ? auth.split(" ") : null

        const tokenData = await Token.deleteOne({ token: tokenKey[1] })

        res.send({
            error: false,
            message: "Logout is OK",
            data: tokenData
        })
    }
}
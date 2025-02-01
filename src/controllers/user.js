"use strict"

const User = require("../models/user")

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(User)

        const details = await res.getModelListDetails(User)

        res.status(200).send({
            error: false,
            details,
            data
        })
    },

    create: async (req, res) => {
        /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        */
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                req?.body?.password
            )
        )
            throw new BadRequestError(
                "Password must be at least 8 characters including a number and an uppercase letter"
            )

        const data = await User.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },


}
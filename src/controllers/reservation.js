"use strict"

const Reservation = require("../models/reservation")
const Room = require("../models/room")

module.exports = {
    list: async (req, res) => {
        /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "List Reservations"
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
        const data = await res.getModelList(Reservation)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservations"
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    $ref: "#/definitions/Reservation"
            }
        }
        */
        const arrivalDate = new Date(req.body.arrivalDate)
        const departureDate = new Date(req.body.departureDate)

        //! if the arrival date is greater than or equal to departure date,return an error
        if (arrivalDate >= departureDate) throw new Error("arrival date must be before the departure date")

        const oneDay = 24 * 60 * 60 * 1000
        req.body.night = Math.round(departureDate - arrivalDate) / oneDay
        req.body.userId = req.body._id

        const { price } = await Room.findOne(
            { _id: req.body.roomId },
            "price-_id"
        )

        req.body.totalPrice = req.body.night * price
        req.body.price = price
        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservations"
        */
        const data = await Reservation.findOne({ _id: req.params.id }).populate([
            "userId",
            "roomId"
        ])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservations"
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    $ref: "#/definitions/Reservation"
            }
        */
        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */
        const data = await deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount
        })
    }
}
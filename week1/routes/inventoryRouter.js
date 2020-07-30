const express = require('express')
inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')


// get all, post new
inventoryRouter.route("/")
    .get((req, res, next) => {
        Inventory.find((err, items) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(items)
        })
    })


module.exports = inventoryRouter
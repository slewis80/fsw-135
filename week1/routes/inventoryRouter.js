const express = require('express')
inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')
const inventory = require('../models/inventory.js')


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
    .post((req, res, next) => {
        const newItem = new Inventory(req.body)
        newItem.save((err, savedItem) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedItem)
            })
    })

// get one, edit one, delete one
inventoryRouter.route("/:itemId")
    .get((req, res, next) => {
        Inventory.findById(req.params.itemId,
            (err, item) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(item)
            })
    })
    .put((req, res, next) => {
        Inventory.findByIdAndUpdate(req.params.itemId,
            req.body,
            {new: true},
            (err, updatedItem) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedItem)
            })
    })
    .delete((req, res, next) => {
        Inventory.findByIdAndDelete(req.params.itemId,
            (err, deletedItem) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(`Successfully deleted ${deletedItem.name}`)
            })
    })

module.exports = inventoryRouter
const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')

// get all, post new
authRouter.route("/")
    .get((req, res, next) => {
        User.find((err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    })
    .post((req, res, next) => {
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedUser)
            })
    })

// get one, update one, delete one
authRouter.route("/:email")
    .get((req, res, next) => {
        User.findOne({email: req.params.email}, {username, memberSince, email},
            (err, user) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(user)
            })
    })
    .put((req, res, next) => {
        User.findOneAndUpdate({email: req.params.email},
            req.body,
            {new: true},
            (err, updatedUser) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedUser)
            })
    })
    .delete((req, res, next) => {
        User.findOneAndDelete({email: req.params.email},
            (err, deletedUser) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(`Successfully deleted ${deletedUser.username}`)
            })
    })

module.exports = authRouter

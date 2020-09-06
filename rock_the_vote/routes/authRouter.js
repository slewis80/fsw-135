const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const user = require('../models/user.js')

// signup
authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("That username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

// login
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error("Username and password combination is incorrect"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error("Username and password combination is incorrect"))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error("Username and password combination is incorrect"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })    
        })
    })
})

// get all
authRouter.get("/", (req, res, next) => {
        User.find((err, users) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    })


// get one, update one, delete one
authRouter.route("/:username")
    .get((req, res, next) => {
        User.findOne({username: req.params.username},
            {username, memberSince},
            (err, user) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(user)
            })
    })
    .put((req, res, next) => {
        User.findOneAndUpdate({username: req.params.username, user: req.user._id },
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
        User.findOneAndDelete({username: req.params.username, user: req.user._id },
            (err, deletedUser) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(`Successfully deleted ${deletedUser.username}`)
            })
    })

module.exports = authRouter

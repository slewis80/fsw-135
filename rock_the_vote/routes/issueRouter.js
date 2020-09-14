const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const jwt = require('jsonwebtoken')
const user = require('../models/user.js')
const issue = require('../models/issue.js')


// get all, post new
issueRouter.route("/")
    .get((req, res, next) => {
        Issue.find((err, issues) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
        .populate('user', 'username')
        .exec()
    })
    .post((req, res, next) => {
        req.body.user = req.user._id
        const newIssue = new Issue(req.body)
        newIssue.save((err, savedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(`Successfully added new issue...`)
        })
    })


// get all by user
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
    .sort({'postDate': 'descending'})
    .populate('user', 'username')
    .exec()
})

// get all by other user
issueRouter.get("/user/:userId", (req, res, next) => {
    Issue.find({ user: req.userId }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
    .sort({'postDate': 'descending'})
    .populate('user', 'username')
    .exec()
})


// get one, delete one, update one by ID
issueRouter.route("/:issueId")
    .get((req, res, next) => {
        Issue.findOne({ _id: req.params.issueId}, 
            (err, issue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`No item found with the id ${req.params.issueId}`))
                }
                issue.user = user
                return res.status(200).send(foundIssue)
            })
        .populate('user', 'username')
        .exec()
    })
    .delete((req, res, next) => {
        Issue.findOneAndDelete({ _id: req.params.issueId, user: req.user._id},
            (err, deletedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`No item found with the id ${req.params.issueId}`))
                }
                return res.status(200).send(`Successfully deleted Issue: ${deletedIssue.name}`)
            })
        .populate('user', 'username')
        .exec()
    })
    .put((req, res, next) => {
        Issue.findOneAndUpdate({ _id: req.params.issueId},
            req.body,
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`No item found with the id ${req.params.issueId}`))
                }    
                return res.status(200).send(updatedIssue)
            })
        .populate('user', 'username')
        .exec()    
    })

    // add upvotes / downvotes by ID
    issueRouter.put("/upvote/:issueId", 
        (req, res, next) => {
            Issue.findOneAndUpdate({ _id: req.params.issueId},
            { $inc: {upvotes: 1}, $push: {usersVoted: {user: req.user._id}} },
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
            })
            .populate('user', 'username')
            .exec()    
        })
        issueRouter.put("/downvote/:issueId", 
        (req, res, next) => {
            Issue.findOneAndUpdate({ _id: req.params.issueId},
            { $inc: {downvotes: 1}, $push: {usersVoted: {user: req.user._id}} },
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
            })
            .populate('user', 'username')
            .exec()    
        })

    

module.exports = issueRouter
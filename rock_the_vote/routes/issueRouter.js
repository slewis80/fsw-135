const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const jwt = require('jsonwebtoken')

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
    })
    .post((req, res, next) => {
        req.body.user = req.user._id
        const newIssue = new Issue(req.body)
        newIssue.save((err, savedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedIssue)
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
})

// delete one, update one
issueRouter.route("/:issueId")
    .delete((req, res, next) => {
        Issue.findOneAndDelete({ _id: req.params.issueId, user: req.user._id},
            (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Issue: ${deletedIssue.name}`)
        })
    })
    .put((req, res, next) => {
        Issue.findOneAndUpdate({ _id: req.params.issueId, user: req.user._id },
            req.body,
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
        })
    })

module.exports = issueRouter
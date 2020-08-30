const express = require('express')
const publicIssueRouter = express.Router()
const Issue = require('../models/issue.js')

// get all
publicIssueRouter.get("/", (req, res, next) => {
        Issue.find((err, issues) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
    })

module.exports = publicIssueRouter
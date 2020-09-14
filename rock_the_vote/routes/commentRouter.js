const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')
const jwt = require('jsonwebtoken')

// get all, post new
commentRouter.route("/")
    .get((req, res, next) => {
        Comment.find((err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        })
    })

    commentRouter.post("/:issueId", (req, res, next) => {
        req.body.user = req.user._id
        req.body.issue = req.params.issueId
        const newComment = new Comment(req.body)
        console.log(req.body)
        newComment.save((err, savedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedComment)
        })
    })

// get all by user
commentRouter.get("/user", (req, res, next) => {
    Comment.find({ user: req.user._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// get all by issue
commentRouter.get("/issue/:issueId", (req, res, next) => {
    Comment.find({ issue: req.params.issueId }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// delete one, update one
commentRouter.route("/:commentId")
    .delete((req, res, next) => {
        Comment.findOneAndDelete({ _id: req.params.commentId, user: req.user._id},
            (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Comment: ${deletedComment.postTitle}`)
        })
    })
    .put((req, res, next) => {
        Comment.findOneAndUpdate({ _id: req.params.issueId, user: req.user._id},
            req.body,
            { new: true },
            (err, updatedComment) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedComment)
        })
    })

module.exports = commentRouter
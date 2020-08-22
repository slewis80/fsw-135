const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    postDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)

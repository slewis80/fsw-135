const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Issue", issueSchema)

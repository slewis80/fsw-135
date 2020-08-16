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
    }
})

module.exports = mongoose.model("Issue", issueSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)

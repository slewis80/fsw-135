const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    description: String
})

module.exports = mongoose.model("Inventory", inventorySchema)
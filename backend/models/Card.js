const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Card = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('cards', Card)

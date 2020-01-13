const mongoose = require('mongoose')

const QuotesSchema = new mongoose.Schema({
    eng: {
        type: String,
        required: true
    },
    jap: {
        type: String,
        required: true
    }
})

const Quotes = mongoose.model('Quotes', QuotesSchema)
module.exports = Quotes
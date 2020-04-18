const mongoose = require('mongoose')

const QuotesSchema = new mongoose.Schema({ // This is the object schema for inserted quotes
    sentenceEng: {
        type: String,
        required: true
    },
    sentenceJap: {
        type: String,
        required: true
    }
})

const Quotes = mongoose.model('Quotes', QuotesSchema)
module.exports = Quotes
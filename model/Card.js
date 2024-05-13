const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Card = new Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    },
    classification: {
        type: String
    }

},{
    collection: 'cards'
})

module.exports = mongoose.model('Card', Card)
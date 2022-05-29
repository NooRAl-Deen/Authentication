const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    code: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    image: {
       required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    quantity: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Product', Product);
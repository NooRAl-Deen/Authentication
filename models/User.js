const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: '/images/download.png'
    }
})

module.exports = mongoose.model('User', userSchema);
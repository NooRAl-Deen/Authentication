const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: '/images/download.png'
    },
    resetLink: {
        data: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);
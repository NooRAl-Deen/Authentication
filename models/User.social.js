const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    socialId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserSocial', socialSchema);
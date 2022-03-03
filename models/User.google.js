const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGoogleSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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

module.exports = mongoose.model('Usergoogle', userGoogleSchema);
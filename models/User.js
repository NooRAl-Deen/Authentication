const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('User', userSchema);
const User = require('../models/User');
const bcrypt = require('bcrypt');
// Update Name
exports.updateNameRender = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    res.render('dashboard/profile/update_name', {user})
}

exports.updateName = async(req, res) => {
    let currentUser = req.session.user;
    await User.findOneAndUpdate({id: currentUser._id}, {$set:{displayName: req.body.new_name}});
    let user = await User.findOne({_id: currentUser._id})
    req.session.user = user;
    res.redirect('/dashboard')   
}

// Update Email
exports.updateEmailRender = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    res.render('dashboard/profile/update_email', {user})
}

exports.updateEmail = async(req, res) => {
    let currentUser = req.session.user;
    await User.findOneAndUpdate({id: currentUser._id}, {$set:{email: req.body.new_email}});
    let user = await User.findOne({_id: currentUser._id})
    req.session.user = user;
    res.redirect('/dashboard')   
}

// Update Password
exports.updatePasswordRender = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    res.render('dashboard/profile/update_password', {user})
}

exports.updatePassword = async(req, res) => {
    let currentUser = req.session.user;
    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
    await User.findOneAndUpdate({id: currentUser._id}, {$set:{password: hashedPassword}});
    let user = await User.findOne({_id: currentUser._id})
    req.session.user = user;
    res.redirect('/dashboard')   
}
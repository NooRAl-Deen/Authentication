const User = require('../models/User');
const bcrypt = require('bcrypt');
/*************************/
const sendEmail = require('../config/nodeMail');
// Main Controller
exports.main = (req, res) => {
    res.render('index');
}

// Login Controller
exports.login = (req, res) => {
    res.render('login');
}


exports.loginPost = async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) {
            req.session.user = user;
            res.redirect('/dashboard')
            
        } else {
            console.log('does not match');
        }
    } else {
        res.redirect('/login');
    }
}

exports.dashboard = (req, res, next) => {
    let user = req.user ? req.user : req.session.user;
    res.render('dashboard', {user});
}

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
}
exports.signup = (req, res) => {
   res.render("signup")
}

exports.changePassword=(req, res) => {
    res.render("changePassword")
}

exports.enterEmail=(req, res) => {
    res.render("enterEmail")
}

exports.codeVerification = (req, res) => {
    res.send('sent');
}


/************************************************************************************/
exports.enterEmailPost = async(req, res) => {
    console.log(req.body.email);
    let user = await User.findOne({email: req.body.email});
    if(user) {
        sendEmail(user);
        res.redirect('/changePassword');
    } else {
        res.redirect('/login')
        console.log('user not exist');
    }
}



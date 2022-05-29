const User = require('../models/User');
const bcrypt = require('bcrypt');
/*************************/
const sendEmail = require('../config/nodeMail');
const jwt = require('jsonwebtoken');
// Main Controller
exports.main = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    res.render('index', {user});
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
            res.redirect('/login');
            console.log('password does not match');
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
    let tok = req.params.token
    res.render("changePassword", {tok})
}

exports.enterEmail=(req, res) => {
    res.render("enterEmail")
}


exports.verify = (req, res) => {
    res.render('verification');
}


/************************************************************************************/
exports.enterEmailPost = async(req, res) => {
    const re_email = req.body.email;
    let token = jwt.sign({ re_email }, process.env.JWT_TOKEN, {expiresIn: '15m'});
    let user = await User.findOneAndUpdate({email: re_email}, {$set:{resetLink: token}});
    
    if(user) {
        sendEmail(user, token);
        res.redirect('/');
    } else {
        res.redirect('/login')
    }
}

exports.changePasswordPut = async(req, res) => {
    const newPassword = req.body.password;
    const hash = await bcrypt.hash(newPassword, 10);
    let user = await User.findOneAndUpdate({resetLink: req.body.tok}, {$set:{password: hash}});
    if(user)
    {
        res.redirect('/login')
    }
}



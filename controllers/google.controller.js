const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const saltRounds = 10;

const passport = require("passport");
const User = require('../models/User');
const conn = require('../config/db')

module.exports.google = passport.authenticate('google', { scope: ['profile', 'email'] });
module.exports.signup=async(req,res)=>{
   
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    const userExist=await User.findOne({
        email:req.body.email,
    })
    if (userExist != null){
        return res.redirect('/signup')
    }

    user.save()
 return res.send('done')
}
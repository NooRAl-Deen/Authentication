const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require('../models/User');
module.exports.google = passport.authenticate('google', { scope: ['profile', 'email'] });
module.exports.signup=async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        displayName:req.body.name,
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
 return res.redirect('/login')
}
module.exports.enterphone=(req,res)=>{res.render('enter-phone-number')}
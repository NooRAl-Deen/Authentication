const {User,validate} = require("../models/user")
const express = require('express');
const router = express.Router();
const{User} = require('../models/user');
const Token = require('../models/token');
const sendEmail=require('../utils/sendEmail');
const Joi= require('joi');
const crypto =require('crypto');
const express=require('express');
const nodemailer=require('nodemailer');
const { buffer } = require("stream/consumers");

router.post('reset-password',(req,res)=>{
crypto.randomBytes(32,(err,buffer)=>{
    if(err){
        console.log(err)
    }
    const token=buffer.toString("hex")
    user.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"user dosnot exists with that email"})
        }
        user.resetToken=token
        user.expireToken=Date.now()+3600000
        user.save().then((result)=>{
            transporter.sendMail({
                to:user.email,
                from: "no-replay@null.com",
                subject:"password reset",
                html:
                <><p>You requested for password reset</p>
                <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5></>
            })
        res.json({message:"check your email"})
    });
});


});
})
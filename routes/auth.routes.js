const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require("passport");

router.get('/google', authController.google);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  res.redirect('/dashboard');
});

router.get('/facebook', authController.facebook);
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
(req, res) => {
  res.redirect('/dashboard');
});

router.post('/signup',authController.signup)
router.get('/forgetpassword/enterphone',authController.enterphone)
module.exports = router;



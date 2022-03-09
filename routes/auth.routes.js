const express = require('express');
const router = express.Router();
const googleController = require('../controllers/google.controller');
const passport = require("passport");
const { append } = require('express/lib/response');

router.get('/google', googleController.google);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  res.redirect('/dashboard');
});
router.post('/signup',googleController.signup)
module.exports = router;

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


router.get('/', mainController.main);
router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/dashboard', checkAuth, mainController.dashboard);
router.get('/logout', mainController.logout);
router.get('/signup', mainController.signup);
router.get('/changePassword/:token', checkToken ,mainController.changePassword);
router.post('/changePassword', mainController.changePasswordPut);
router.get('/enterEmail',mainController.enterEmail);
router.post('/enterEmail',mainController.enterEmailPost);
router.get('/veri', mainController.verify);

function checkAuth(req, res, next) {
    if(req.isAuthenticated() || req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function checkToken(req, res, next) {
    console.log(req.params.token)
    let decoded = jwt.verify(req.params.token, process.env.JWT_TOKEN)
    if(decoded)
    {
        next();
    }
}

module.exports = router;
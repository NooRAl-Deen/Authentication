const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const dotenv = require('dotenv');
dotenv.config();


router.get('/', mainController.main);
router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/dashboard', checkAuth, mainController.dashboard);
router.get('/logout', mainController.logout);
router.get('/signup', mainController.signup);
router.get('/changePassword',mainController.changePassword);
router.get('/enterEmail',mainController.enterEmail);
router.post('/enterEmail',mainController.enterEmailPost);
router.post('/code_verification',mainController.codeVerification);

function checkAuth(req, res, next) {
    if(req.isAuthenticated() || req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
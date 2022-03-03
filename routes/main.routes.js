const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const dotenv = require('dotenv');
dotenv.config();


router.get('/', mainController.main);
router.get('/login', mainController.login);
router.get('/dashboard', checkAuth, mainController.dashboard);
router.get('/logout', mainController.logout);

function checkAuth(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
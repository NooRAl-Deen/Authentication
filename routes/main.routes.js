const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const secFun = require('../middlewares/security_functions');


router.get('/', mainController.main);
router.get('/login', mainController.login);
router.post('/login', mainController.loginPost);
router.get('/dashboard', secFun.checkAuth, mainController.dashboard);
router.get('/logout', mainController.logout);
router.get('/signup', mainController.signup);
router.get('/changePassword/:token', secFun.checkToken ,mainController.changePassword);
router.post('/changePassword', mainController.changePasswordPut);
router.get('/enterEmail',mainController.enterEmail);
router.post('/enterEmail',mainController.enterEmailPost);
router.get('/veri', mainController.verify);



module.exports = router;
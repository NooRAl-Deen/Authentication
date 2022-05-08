const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller')
const secFun = require('../middlewares/security_functions');

// Update Name
router.get('/profile/update_name', secFun.checkAuth, dashboardController.updateNameRender)
router.post('/profile/update_name', secFun.checkAuth, dashboardController.updateName)

// Update Email
router.get('/profile/update_email', secFun.checkAuth, dashboardController.updateEmailRender)
router.post('/profile/update_email', secFun.checkAuth, dashboardController.updateEmail)

// Update Password
router.get('/profile/update_password', secFun.checkAuth, dashboardController.updatePasswordRender)
router.post('/profile/update_password', secFun.checkAuth, dashboardController.updatePassword)
module.exports = router
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard_profile.controller')
const secFun = require('../middlewares/security_functions');

// Update Name
router.get('/update_name', secFun.checkAuth, dashboardController.updateNameRender)
router.post('/update_name', secFun.checkAuth, dashboardController.updateName)

// Update Email
router.get('/update_email', secFun.checkAuth, dashboardController.updateEmailRender)
router.post('/update_email', secFun.checkAuth, dashboardController.updateEmail)

// Update Password
router.get('/update_password', secFun.checkAuth, dashboardController.updatePasswordRender)
router.post('/update_password', secFun.checkAuth, dashboardController.updatePassword)
module.exports = router
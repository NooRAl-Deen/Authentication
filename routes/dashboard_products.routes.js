const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard_products.controller');
const secFun = require('../middlewares/security_functions');
const upload = require('../config/multer');

router.get('/add_new_product', secFun.checkAuth, dashboardController.addNewProductRender);
router.post('/add_new_product', secFun.checkAuth, upload.single('image'), dashboardController.addNewProduct);

router.get('/product_list', secFun.checkAuth, dashboardController.productListRender)



module.exports = router;
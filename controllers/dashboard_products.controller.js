const Product = require('../models/Product');

exports.addNewProductRender = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    res.render('dashboard/products/add_new_product', {user});
}

exports.addNewProduct = async (req, res) => {
    const product = new Product({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity
    });

    const checkProduct = await Product.findOne({ code: req.body.code });
    if(checkProduct) {
        return res.redirect('/dashboard/products/add_new_product');
    } 
    product.save();
    res.redirect('/dashboard/products/product_list');
}



exports.productListRender = (req, res) => {
    let user = req.user ? req.user : req.session.user;
    Product.find().then((data) => res.render('dashboard/products/product_list', {user: user, data: data}))
    
}
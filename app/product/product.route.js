const {Router} = require('express');
const router = Router();
const ProductController = require('./product.controller');
const {createProduct,updateProduct} = ProductController;
const {authenticateToken} = require('../util/auth')

router.route('/create').post(authenticateToken,createProduct);
router.route('/update').post(updateProduct);

module.exports = router;
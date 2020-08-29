const {Router} = require('express');
const router = Router();
const ProductController = require('./product.controller');
const {createProduct,updateProduct} = ProductController;

router.route('/create').post(createProduct);
router.route('/update').post(updateProduct);

module.exports = router;
import {Router} from 'express'
const router = Router();
const ProductController = require('./product.controller');
const {createProduct,updateProduct,getSellerProducts} = ProductController;
const {authenticateToken} = require('../util/auth');

router.route('/create').post(authenticateToken,createProduct);
router.route('/update').post(updateProduct);
router.route('/:sellerId').get(getSellerProducts);

module.exports = router;
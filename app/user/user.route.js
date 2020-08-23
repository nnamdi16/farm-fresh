const {Router} = require('express');
const router = Router();
const UserController = require('./user.controller');
const {registerUser,authenticateUser} = UserController;

/**
 * @path {POST} /apiv1/register
 */
router.route('/register').post(registerUser);

/**
 * @path {POST} /apiv1/login
 */
router.route('/login').post(authenticateUser);

module.exports = router;
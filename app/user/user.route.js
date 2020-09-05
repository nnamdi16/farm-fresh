const {Router} = require('express');
const router = Router();
const UserController = require('./user.controller');
const {registerUser,authenticateUser,logoutUser,completeRegistration} = UserController;

/**
 * @path {POST} /apiv1/register
 */
router.route('/register').post(registerUser);

/**
 * @path {POST} /apiv1//complete-registration
 */
router.route('/complete-registration').post(completeRegistration);

/**
 * @path {POST} /apiv1/login
 */
router.route('/login').post(authenticateUser);


/**
 * @path {POST} /apiv1/login
 */
router.route('/logout').post(logoutUser);

module.exports = router;
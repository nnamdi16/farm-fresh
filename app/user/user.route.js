const {Router} = require('express');
const router = Router();
const UserController = require('./user.controller');
const {registerUser,authenticateUser} = UserController;

router.route('/register').post(registerUser);
router.route('/login').post(authenticateUser);

module.exports = router;
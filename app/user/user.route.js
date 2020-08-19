const {Router} = require('express');
const router = Router();
const UserController = require('./user.controller');
const {registerUser} = UserController;

router.route('/registerUser').post(registerUser);

module.exports = router;
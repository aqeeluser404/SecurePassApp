var express = require('express')

var userController = require('../src/user/userController');
var passController = require('../src/pass/passController');

const router = express.Router();

router.route('/api/user/login').post(userController.loginUserControllerFn);
router.route('/api/user/create').post(userController.createUserControllerFn);
router.route('/api/user/email/:email').get(userController.getUserByEmailControllerFn);
router.route('/api/user/id/:id').get(userController.getUserByIdControllerFn);

router.route('/api/pass/create/:userId').post(passController.createPassControllerFn);
router.route('/api/pass/read/:passId/:userId').get(passController.getPassByIdControllerFn);
router.route('/api/pass/delete/:passId/:userId').delete(passController.deletePassByIdControllerFn);
router.route('/api/pass/update/:passId/:userId').put(passController.updatePassByIdControllerFn);

module.exports = router;

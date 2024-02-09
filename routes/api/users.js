const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../../controllers/user_controller');

router.post('/signup', passport.isAuthenticated, userController.signup);
router.post('/signin', passport.isAuthenticated, userController.signin);
router.post('/update', passport.authenticate('jwt', { session: false }), userController.update);
router.post('/sendResetPasswordLink', passport.isAuthenticated, userController.sendResetPasswordLink);
router.post('/resetPassword', passport.isAuthenticated, userController.resetPassword);

module.exports = router;
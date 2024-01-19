const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../../controllers/user_controller');

router.post('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/update', passport.authenticate('jwt', {session: false}), userController.update);

module.exports = router;
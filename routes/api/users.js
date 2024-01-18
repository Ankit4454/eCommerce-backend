const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user_controller');

router.post('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/update', userController.update);

module.exports = router;
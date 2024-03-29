const express = require('express');
const router = express.Router();
const passport = require('passport');
const addressController = require('../../controllers/address_controller');

router.get('/getAddressList/:userId', passport.authenticate('jwt', {session: false}), addressController.getAddressList);
router.get('/getAddress/:addressId', passport.authenticate('jwt', {session: false}), addressController.getAddress);
router.post('/create', passport.authenticate('jwt', {session: false}), addressController.create);
router.post('/update', passport.authenticate('jwt', {session: false}), addressController.update);
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), addressController.delete);

module.exports = router;
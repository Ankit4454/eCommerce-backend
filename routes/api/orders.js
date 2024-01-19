const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderController = require('../../controllers/order_controller');

router.get('/', passport.authenticate('jwt', {session: false}), orderController.orders);
router.get('/:id', passport.authenticate('jwt', {session: false}), orderController.getOrderDtls);
router.post('/create', passport.authenticate('jwt', {session: false}), orderController.create);
router.post('/update', passport.authenticate('jwt', {session: false}), orderController.update);
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), orderController.delete);

module.exports = router;
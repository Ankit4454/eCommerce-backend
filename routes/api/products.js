const express = require('express');
const router = express.Router();
const passport = require('passport');
const productController = require('../../controllers/product_controller');

router.get('/', productController.products);
router.post('/create', passport.authenticate('jwt', {session: false}), productController.create);
router.post('/update', passport.authenticate('jwt', {session: false}), productController.update);
router.post('/delete', passport.authenticate('jwt', {session: false}), productController.delete);
router.get('/:id', productController.getProductDtls);

module.exports = router;
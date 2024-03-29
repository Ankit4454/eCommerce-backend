const express = require('express');
const router = express.Router();
const passport = require('passport');
const productController = require('../../controllers/product_controller');

router.get('/all', productController.products);
router.post('/create', passport.authenticate('jwt', { session: false }), productController.create);
router.post('/update', passport.authenticate('jwt', { session: false }), productController.update);
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), productController.delete);
router.get('/getProduct/:id', productController.getProductDtls);
router.get('/getUserProduct/:userId', passport.authenticate('jwt', { session: false }), productController.getProductList);
router.get('/search/:string', productController.searchProducts);
router.get('/category/:string', productController.filterCategoryProducts);

module.exports = router;
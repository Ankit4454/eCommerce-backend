const express = require('express');
const router = express.Router();
const passport = require('passport');
const ratingController = require('../../controllers/rating_controller');

router.post('/create', passport.authenticate('jwt', {session: false}), ratingController.create);
router.post('/update', passport.authenticate('jwt', {session: false}), ratingController.update);
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), ratingController.delete);

module.exports = router;
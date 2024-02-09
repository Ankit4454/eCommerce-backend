const Rating = require('../models/rating');
const Product = require('../models/product');
const textValidator = /[<>\$"'`;^]/;

module.exports.create = function (req, res) {
    if (textValidator.test(req.body.review)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }

    Rating.create({ user: req.body.user, product: req.body.product, star: req.body.star, review: req.body.review }).then(function (rating) {
        Product.findById(rating.product).then(function (product) {
            product.ratings.push(rating._id);
            return product.save().then(function () {
                return res.status(201).json({
                    success: true,
                    data: {
                        rating: rating,
                    },
                    message: 'Rating created successfully'
                });
            });
        }).catch(function (err) {
            console.log(`Error while fetching a product ${err}`);
            return res.status(500).json({
                error: true,
                message: err.message || 'Internal Server Error'
            });
        });
    }).catch(function (err) {
        console.log(`Error while creating a rating ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    if (textValidator.test(req.body.review)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }
    
    Rating.findByIdAndUpdate(req.body.id, { star: req.body.star, review: req.body.review }).then(function (rating) {
        if (!rating) {
            return res.status(404).json({
                error: true,
                message: 'Rating not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                rating: { ...rating._doc, star: req.body.star, review: req.body.review },
            },
            message: 'Rating updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a rating ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function (req, res) {
    Rating.findByIdAndDelete(req.params.id).then(function (rating) {
        if (!rating) {
            return res.status(404).json({
                error: true,
                message: 'Rating not found'
            });
        }
        Product.findByIdAndUpdate(rating.product, { $pull: { ratings: rating.id } }, { new: true }).then(function (product) {
            if (!product) {
                return res.status(404).json({
                    error: false,
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    deletedRating: rating,
                },
                message: 'Rating deleted successfully'
            });
        }).catch(function (err) {
            console.log(`Error while pulling a rating from product ${err}`);
            return res.status(500).json({
                error: true,
                message: err.message || 'Internal Server Error'
            });
        });
    }).catch(function (err) {
        console.log(`Error while deleting a rating ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}
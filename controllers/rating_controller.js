const Rating = require('../models/rating');

module.exports.create = function(req, res){
    Rating.create({user: req.body.user, product: req.body.product, star: req.body.star, review: req.body.review}).then(function(rating){
        return res.status(201).json({
            success: 'Rating created successfully',
            rating: rating
        });
    }).catch(function(err){
        console.log(`Error while creating a rating ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function(req, res){
    Rating.findByIdAndUpdate(req.body.id, {star: req.body.star, review: req.body.review}).then(function(rating){
        if (!rating) {
            return res.status(404).json({
                error: 'Rating not found'
            });
        }
        return res.status(200).json({
            success: 'Rating updated successfully',
            rating: rating
        });
    }).catch(function(err){
        console.log(`Error while updating a rating ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function(req, res){
    Rating.findByIdAndDelete(req.body.id).then(function(rating){
        if (!rating) {
            return res.status(404).json({
                error: 'Rating not found'
            });
        }
        return res.status(200).json({
            success: 'Rating deleted successfully',
            deletedRating: rating
        });
    }).catch(function(err){
        console.log(`Error while deleting a rating ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}
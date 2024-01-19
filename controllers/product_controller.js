const Product = require('../models/product');

module.exports.products = function (req, res) {
    Product.find({}).populate('user').populate({ path: 'ratings', options: { sort: { star: -1 } } }).then(function (products) {
        return res.status(200).json({
            products: products
        });
    }).catch(function (err) {
        console.log(`Error while fetching products ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    })
}

module.exports.create = function (req, res) {
    Product.create({ user: req.body.user, name: req.body.name, description: req.body.description, price: req.body.price }).then(function (product) {
        return res.status(201).json({
            success: 'Product created successfully',
            product: product
        });
    }).catch(function (err) {
        console.log(`Error while creating a product ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.body.id, { name: req.body.name, description: req.body.description, price: req.body.price }).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            success: 'Product updated successfully',
            product: product
        });
    }).catch(function (err) {
        console.log(`Error while updating a product ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function (req, res) {
    Product.findByIdAndDelete(req.params.id).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            success: 'Product deleted successfully',
            deletedProduct: product
        });
    }).catch(function (err) {
        console.log(`Error while deleting a product ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.getProductDtls = function (req, res) {
    Product.findById(req.params.id).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            product: product
        });
    }).catch(function (err) {
        console.log(`Error while fetching a product ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    })
}
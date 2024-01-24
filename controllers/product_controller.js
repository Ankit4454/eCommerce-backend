const Product = require('../models/product');

module.exports.products = function (req, res) {
    Product.find({}).populate('user').populate({ path: 'ratings', options: { sort: { star: -1 } } }).then(function (products) {
        return res.status(200).json({
            success: true,
            data: {
                products: products,
            },
            message: 'All products'
        });
    }).catch(function (err) {
        console.log(`Error while fetching products ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error' 
        });
    })
}

module.exports.create = function (req, res) {
    Product.uploadedPicture(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                error: true,
                message: 'File upload failed. ' + err.message
            });
        }

        if (req.file) {
            let picturePath = path.join(Product.picturePath, req.file.filename);

            Product.create({ picture: picturePath, user: req.body.user, name: req.body.name, description: req.body.description, price: req.body.price }).then(function (product) {
                return res.status(201).json({
                    success: true,
                    data: {
                        product: product,
                    },
                    message: 'Product created successfully'
                });
            }).catch(function (err) {
                console.log(`Error while creating a product ${err}`);
                return res.status(500).json({
                    error: true,
                    message: err.message || 'Internal Server Error'
                });
            });
        }
    });
}

module.exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.body.id, { name: req.body.name, description: req.body.description, price: req.body.price }).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                product: product,
            },
            message: 'Product updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a product ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function (req, res) {
    Product.findByIdAndDelete(req.params.id).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                deletedProduct: product,
            },
            message: 'Product deleted successfully'
        });
    }).catch(function (err) {
        console.log(`Error while deleting a product ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.getProductDtls = function (req, res) {
    Product.findById(req.params.id).then(function (product) {
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                product: product,
            },
            message: 'Product details'
        });
    }).catch(function (err) {
        console.log(`Error while fetching a product ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    })
}
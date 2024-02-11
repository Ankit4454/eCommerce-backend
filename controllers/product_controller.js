const Product = require('../models/product');
const path = require('path');
const firebaseApp = require('../config/firebase');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { v4: uuidv4 } = require('uuid');
const textValidator = /[<>\$"'`;^]/;

const storage = getStorage();

module.exports.products = function (req, res) {
    Product.find({}).populate('user').populate({ path: 'ratings', options: { sort: { star: -1 } } }).sort({ createdAt: -1 }).then(function (products) {
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
    });
}

module.exports.create = function (req, res) {
    Product.uploadedPicture(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                error: true,
                message: 'File upload failed. ' + err.message
            });
        }

        if (req.file) {
            if (textValidator.test(req.body.name) || textValidator.test(req.body.description)) {
                return res.status(400).json({
                    error: true,
                    message: 'Special characters are not allowed'
                });
            }

            const uniqueFilename = `product-${uuidv4()}${path.extname(req.file.originalname).toLowerCase()}`;
            const storageRef = ref(storage, `productImages/${uniqueFilename}`);
            const metadata = {
                contentType: req.file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            Product.create({ picture: downloadURL, user: req.body.user, name: req.body.name, description: req.body.description, price: req.body.price, category: req.body.category }).then(function (product) {
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
    Product.uploadedPicture(req, res, async function (err) {
        if (err) {
            return res.status(400).json({
                error: true,
                message: 'File upload failed. ' + err.message
            });
        }

        if (textValidator.test(req.body.name) || textValidator.test(req.body.description)) {
            return res.status(400).json({
                error: true,
                message: 'Special characters are not allowed'
            });
        }

        const updateObj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        }

        if (req.file) {
            const uniqueFilename = `product-${uuidv4()}${path.extname(req.file.originalname).toLowerCase()}`;
            const storageRef = ref(storage, `productImages/${uniqueFilename}`);
            const metadata = {
                contentType: req.file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            updateObj.picture = downloadURL;
        }

        Product.findByIdAndUpdate(req.body.id, updateObj).then(function (product) {
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
    Product.findById(req.params.id).populate({ path: 'ratings', options: { sort: { star: -1 } }, populate: { path: 'user', select: 'name' } }).then(function (product) {
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
    });
}

module.exports.getProductList = function (req, res) {
    Product.find({ user: req.params.userId }).populate({ path: 'ratings', options: { sort: { star: -1 } } }).then(function (products) {
        return res.status(200).json({
            success: true,
            data: {
                products: products,
            },
            message: 'Users products'
        });
    }).catch(function (err) {
        console.log(`Error while fetching products ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    })
}

module.exports.searchProducts = function (req, res) {
    const searchQuery = req.params.string;

    const query = {
        $or: [
            { name: { $regex: new RegExp(searchQuery, 'i') } },
            { description: { $regex: new RegExp(searchQuery, 'i') } },
            { category: { $regex: new RegExp(searchQuery, 'i') } },
        ],
    };

    Product.find(query).populate({ path: 'ratings', options: { sort: { star: -1 } } }).then(function (products) {
        return res.status(200).json({
            success: true,
            data: {
                products: products,
            },
            message: 'Search products'
        });
    }).catch(function (err) {
        console.log(`Error while fetching products ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.filterCategoryProducts = function (req, res) {
    Product.find({ category: req.params.string }).populate({ path: 'ratings', options: { sort: { star: -1 } } }).then(function (products) {
        return res.status(200).json({
            success: true,
            data: {
                products: products,
            },
            message: 'Category products'
        });
    }).catch(function (err) {
        console.log(`Error while fetching products ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}
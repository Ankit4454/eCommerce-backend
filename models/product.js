const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PICTURE_PATH = path.join('/tmp');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Fashion', 'Home and Furniture', 'Beauty and Personal Care', 'Sports and Outdoors', 'Books and Stationery', 'Toys and Games', 'Health and Wellness', 'Automotive', 'Electrical Appliances', 'Jewelry and Watches', 'Food and Groceries', 'Pet Supplies', 'Art and Craft Supplies', 'Garden and Outdoor Living', 'Travel and Luggage', 'Fitness and Sports Equipment']
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ]
}, {
    timestamps: true
});

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Only jpeg, jpg, and png files are allowed.'));
    }
};

productSchema.statics.uploadedPicture = multer({ storage: storage, fileFilter: fileFilter }).single('picture');
productSchema.statics.picturePath = PICTURE_PATH;

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
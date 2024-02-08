const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productList: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered', 'Cancelled', 'Replacement Completed']
    },
    statusHistory: [
        {
            status: {
                type: String,
                required: true,
                enum: ['Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered', 'Cancelled', 'Replacement Completed']
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

orderSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.statusHistory.push({ status: this.status });
    }
    next();
});

orderSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.status) {
        this._update.$push = this._update.$push || {};
        this._update.$push.statusHistory = { status: this._update.status };
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
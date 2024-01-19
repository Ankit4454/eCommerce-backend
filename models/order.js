const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
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
        enum: ['Order Confirmed', 'Shipped', 'Out For Delivery', 'Delivered']
    }
},{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
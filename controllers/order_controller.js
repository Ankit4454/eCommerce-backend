const Order = require('../models/order');

module.exports.orders = function(req, res){
    Order.find({user: req.query.user}).then(function(orders){
        return res.status(200).json({
            orders: orders
        });
    }).catch(function(err){
        console.log(`Error while fetching orders of particular user ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.getOrderDtls = function(req, res){
    Order.findById(req.params.id).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        return res.status(200).json({
            order: order
        });
    }).catch(function(err){
        console.log(`Error while fetching a order ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.create = function(req, res){
    Order.create({user: req.body.user, productList: req.body.productList, address: req.body.address, status: req.body.status}).then(function(order){
        return res.status(201).json({
            success: 'Order created successfully',
            order: order
        });
    }).catch(function(err){
        console.log(`Error while creating a order ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function(req, res){
    Order.findByIdAndUpdate(req.body.id, {status: req.body.status}).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        return res.status(200).json({
            success: 'Order updated successfully',
            order: order
        });
    }).catch(function(err){
        console.log(`Error while updating a order ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function(req, res){
    Order.findByIdAndDelete(req.body.id).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }
        return res.status(200).json({
            success: 'Order deleted successfully',
            deletedOrder: order
        });
    }).catch(function(err){
        console.log(`Error while deleting a order ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}
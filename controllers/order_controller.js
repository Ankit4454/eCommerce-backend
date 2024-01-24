const Order = require('../models/order');

module.exports.orders = function(req, res){
    Order.find({user: req.query.user}).then(function(orders){
        return res.status(200).json({
            success: true,
            data: {
                orders: orders,
            },
            message: 'All orders'
        });
    }).catch(function(err){
        console.log(`Error while fetching orders of particular user ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.getOrderDtls = function(req, res){
    Order.findById(req.params.id).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: true,
                message: 'Order not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                order: order,
            },
            message: 'Order details'
        });
    }).catch(function(err){
        console.log(`Error while fetching a order ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.create = function(req, res){
    Order.create({user: req.body.user, productList: req.body.productList, address: req.body.address, status: req.body.status}).then(function(order){
        return res.status(201).json({
            success: true,
            data: {
                order: order,
            },
            message: 'Order created successfully'
        });
    }).catch(function(err){
        console.log(`Error while creating a order ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function(req, res){
    Order.findByIdAndUpdate(req.body.id, {status: req.body.status}).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: true,
                mesaage: 'Order not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                order: order,
            },
            message: 'Order updated successfully'
        });
    }).catch(function(err){
        console.log(`Error while updating a order ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function(req, res){
    Order.findByIdAndDelete(req.body.id).then(function(order){
        if (!order) {
            return res.status(404).json({
                error: true,
                message: 'Order not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                deletedOrder: order,
            },
            message: 'Order deleted successfully'
        });
    }).catch(function(err){
        console.log(`Error while deleting a order ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}
const Address = require('../models/address');

module.exports.create = function (req, res) {
    Address.create({ user: req.body.user, name: req.body.name, mobileNumber: req.body.mobileNumber, pincode: req.body.pincode, addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2, landmark: req.body.landmark, city: req.body.city, state: req.body.state, addressType: req.body.addressType }).then(function (address) {
        return res.status(201).json({
            success: 'Address created successfully',
            address: address
        });
    }).catch(function (err) {
        console.log(`Error while creating a address ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    Address.findByIdAndUpdate(req.body.id, { name: req.body.name, mobileNumber: req.body.mobileNumber, pincode: req.body.pincode, addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2, landmark: req.body.landmark, city: req.body.city, state: req.body.state, addressType: req.body.addressType }).then(function (address) {
        if (!address) {
            return res.status(404).json({
                error: 'Address not found'
            });
        }
        return res.status(200).json({
            success: 'Address updated successfully',
            address: address
        });
    }).catch(function (err) {
        console.log(`Error while updating a address ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.delete = function (req, res) {
    Address.findByIdAndDelete(req.body.id).then(function (address) {
        if (!address) {
            return res.status(404).json({
                error: 'Address not found'
            });
        }
        return res.status(200).json({
            success: 'Address deleted successfully',
            deletedAddress: address
        });
    }).catch(function (err) {
        console.log(`Error while deleting a address ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}
const Address = require('../models/address');
const User = require('../models/user');

module.exports.create = function (req, res) {
    Address.create({ user: req.body.user, name: req.body.name, mobileNumber: req.body.mobileNumber, pincode: req.body.pincode, addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2, landmark: req.body.landmark, city: req.body.city, state: req.body.state, addressType: req.body.addressType }).then(function (address) {
        User.findById(address.user).then(function (user) {
            user.addressList.push(address._id);
            return user.save().then(function () {
                return res.status(201).json({
                    success: true,
                    data: {
                        address: address,
                    },
                    message: 'Address created successfully'
                });
            });
        }).catch(function (err) {
            console.log(`Error while fetching a user ${err}`);
            return res.status(500).json({
                error: true,
                message: err.message || 'Internal Server Error'
            });
        });
    }).catch(function (err) {
        console.log(`Error while creating a address ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    Address.findByIdAndUpdate(req.body.id, { name: req.body.name, mobileNumber: req.body.mobileNumber, pincode: req.body.pincode, addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2, landmark: req.body.landmark, city: req.body.city, state: req.body.state, addressType: req.body.addressType }).then(function (address) {
        if (!address) {
            return res.status(404).json({
                error: true,
                message: 'Address not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                address: address,
            },
            message: 'Address updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a address ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
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
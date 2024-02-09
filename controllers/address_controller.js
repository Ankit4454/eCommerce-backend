const Address = require('../models/address');
const User = require('../models/user');
const textValidator = /[<>\$"'`;^]/;
const mobileRegex = /^[0-9]{10}$/;
const pincodePattern = /^\d{6}$/;

module.exports.getAddressList = function (req, res) {
    Address.find({ user: req.params.userId }).then(function (data) {
        return res.status(200).json({
            success: true,
            data: {
                addressList: data
            },
            message: 'Address list'
        });
    }).catch(function (err) {
        console.log(`Error while fetching addresses ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.getAddress = function (req, res) {
    Address.findById(req.params.addressId).then(function (data) {
        return res.status(200).json({
            success: true,
            data: {
                address: data
            },
            message: 'Address'
        });
    }).catch(function (err) {
        console.log(`Error while fetching addresse ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.create = function (req, res) {
    if (textValidator.test(req.body.name) || textValidator.test(req.body.addressLine1) || textValidator.test(req.body.addressLine2) || textValidator.test(req.body.landmark) || textValidator.test(req.body.city) || textValidator.test(req.body.state)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }

    if (!mobileRegex.test(req.body.mobileNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid phone number format'
        });
    }

    if (!pincodePattern.test(req.body.pincode)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid pincode'
        });
    }

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
    if (textValidator.test(req.body.name) || textValidator.test(req.body.addressLine1) || textValidator.test(req.body.addressLine2) || textValidator.test(req.body.landmark) || textValidator.test(req.body.city) || textValidator.test(req.body.state)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }

    if (!mobileRegex.test(req.body.mobileNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid phone number format'
        });
    }

    if (!pincodePattern.test(req.body.pincode)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid pincode'
        });
    }

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
    Address.findByIdAndDelete(req.params.id).then(function (address) {
        if (!address) {
            return res.status(404).json({
                error: true,
                message: 'Address not found'
            });
        }
        User.findByIdAndUpdate(address.user, { $pull: { addressList: address.id } }, { new: true }).then(function (user) {
            if (!user) {
                return res.status(404).json({
                    error: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: {
                    deletedAddress: address,
                },
                message: 'Address deleted successfully',
            });
        }).catch(function (err) {
            console.log(`Error while pulling a address from user ${err}`);
            return res.status(500).json({
                error: true,
                message: err.message || 'Internal Server Error'
            });
        });
    }).catch(function (err) {
        console.log(`Error while deleting a address ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}
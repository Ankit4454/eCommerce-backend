const User = require('../models/user');
const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = function (req, res) {
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailValidator.test(req.body.email)) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    if (!passwordValidator.test(req.body.password)) {
        return res.status(400).json({
            error: 'Invalid password format. Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.'
        });
    }

    User.findOne({ email: req.body.email }).then(function (data) {
        if (!data) {
            User.create({ email: req.body.email, name: req.body.name, password: req.body.password, mobileNumber: req.body.mobileNumber }).then(function (user) {
                return res.status(201).json({
                    success: 'Registration successful'
                });
            }).catch(function (err) {
                return res.status(500).json({
                    error: err.message || 'Internal Server Error'
                });
            });
        } else {
            return res.status(409).json({
                error: 'This email is already in use'
            });
        }
    }).catch(function (err) {
        console.log(`Error while fetching a user ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.signin = function (req, res) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }
        const isPasswordValid = compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ user }, process.env.SECRET_JWT_LC, { expiresIn: '1h' });
        return res.status(200).json({
            success: 'You have successfully logged in',
            token: token
        });
    }).catch(function (err) {
        console.log(`Error while fetching a user ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    User.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email }).then(function (user) {
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        return res.status(200).json({
            success: 'Profile updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a user ${err}`);
        return res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    });
}
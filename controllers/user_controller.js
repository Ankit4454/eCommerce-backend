const User = require('../models/user');
const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const ResetPasswordMailer = require('../mailers/reset_password_mailer');
const textValidator = /[<>\$"'`;^]/;
const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10}$/;
const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEmailOrMobile = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    return emailRegex.test(input) || mobileRegex.test(input);
};

module.exports.signup = function (req, res) {
    if (textValidator.test(req.body.name)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }

    if (!emailValidator.test(req.body.email)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid email format'
        });
    }

    if (!mobileRegex.test(req.body.mobileNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid phone number format'
        });
    }

    if (!passwordValidator.test(req.body.password)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid password format. Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.'
        });
    }

    User.findOne({ email: req.body.email }).then(function (data) {
        if (!data) {
            User.create({ email: req.body.email, name: req.body.name, password: req.body.password, mobileNumber: req.body.mobileNumber }).then(function (user) {
                return res.status(201).json({
                    success: true,
                    message: 'Registration successful'
                });
            }).catch(function (err) {
                return res.status(500).json({
                    error: true,
                    message: err.message || 'Internal Server Error'
                });
            });
        } else {
            return res.status(409).json({
                error: true,
                message: 'This email is already in use'
            });
        }
    }).catch(function (err) {
        console.log(`Error while fetching a user ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.signin = function (req, res) {
    const emailOrMobileNumber = req.body.emailOrMobileNumber;

    if (!isEmailOrMobile(emailOrMobileNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid email or mobile number format'
        });
    }

    User.findOne({ $or: [{ email: emailOrMobileNumber }, { mobileNumber: emailOrMobileNumber }] }).populate('addressList').then(function (user) {
        if (!user) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials'
            });
        }
        const isPasswordValid = compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ user }, process.env.SECRET_JWT_LC, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            data: {
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    addressList: user.addressList,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            },
            message: 'You have successfully logged in'
        });
    }).catch(function (err) {
        console.log(`Error while fetching a user ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.update = function (req, res) {
    if (textValidator.test(req.body.name)) {
        return res.status(400).json({
            error: true,
            message: 'Special characters are not allowed'
        });
    }

    if (!emailValidator.test(req.body.email)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid email format'
        });
    }

    if (!mobileRegex.test(req.body.mobileNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid phone number format'
        });
    }

    User.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email, mobileNumber: req.body.mobileNumber }).then(function (data) {
        if (!data) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        }
        const user = {
            _id: data._id,
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            addressList: data.addressList,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
        const token = jwt.sign({ user }, process.env.SECRET_JWT_LC, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            data: {
                user: user,
                token: token
            },
            message: 'Profile updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a user ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.sendResetPasswordLink = function (req, res) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        }
        const token = jwt.sign({ user }, process.env.SECRET_JWT_LC, { expiresIn: '600s' });
        // const link = `${req.protocol}://${req.get('host')}/users/resetPassword/${token}`;
        const link = `http://localhost:8000/users/reset-password/${token}`;
        ResetPasswordMailer.newResetPassword({
            user: user,
            link: link
        });

        return res.status(200).json({
            success: true,
            message: 'We have sent a reset password link to your email. Please check.'
        });
    }).catch(function (err) {
        console.log(`Error while fetching a user ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}

module.exports.resetPassword = function (req, res) {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_JWT_LC);
    let dateNow = new Date();

    if (decoded.exp < dateNow.getTime() / 1000) {
        return res.status(400).json({
            error: true,
            message: 'Reset password link expired'
        });
    }

    if (!passwordValidator.test(req.body.password)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid password format. Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.'
        });
    }

    if (req.body.password != req.body.confirmPassword) {
        return res.status(400).json({
            error: true,
            message: 'Password and Confirm Password does not match'
        });
    }

    User.findByIdAndUpdate(decoded.user._id, { password: req.body.password }).then(function (data) {
        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }).catch(function (err) {
        console.log(`Error while updating a password ${err}`);
        return res.status(500).json({
            error: true,
            message: err.message || 'Internal Server Error'
        });
    });
}
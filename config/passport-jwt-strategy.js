const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let opts = {}
opts.secretOrKey = process.env.SECRET_JWT_LC;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.user?._id).then(function (user) {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (err) {
        return done(err, false);
    });
}));

passport.isAuthenticated = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next();
        }

        return res.status(403).json({
            error: true,
            message: "You are already authenticated."
        });
    })(req, res, next);
}

module.exports = passport;
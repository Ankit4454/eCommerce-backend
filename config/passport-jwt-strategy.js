const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {}
opts.secretOrKey = process.env.SECRET_JWT_LC;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id).then(function (user) {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }).catch(function (err) {
        return done(err, false);
    });
}));

module.exports = passport;
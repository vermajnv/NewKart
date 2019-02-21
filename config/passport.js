var Passport = require('passport');
var User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

Passport.serializeUser(function(user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

Passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    console.log('sdfhsjk');
    User.findOne({
        'email': email
    }, function(err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Email is Already in Use'
            });
        }
        var newUser = new User();
        newUser.email = email,
            newUser.password = newUser.encryptPassword(password),
            newUser.save(function(err, result) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                console.log('sdfhsjk');
                return done(null, newUser);
            });
    });
}));

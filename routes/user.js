var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
let csrfProtection = csrf();

router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.use('/', notLoggedIn, function(req, res, next) {
    return next();
})

// GET sign up form
router.get('/signup', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length
    });
});

// Store user
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

// Sign In User

router.get('/signin', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasError: messages.length
    });
});

// Post Sign inspect
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

// Log out routes

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

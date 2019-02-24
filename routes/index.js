var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var csrf = require('csurf');
var passport = require('passport');
let csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
        res.render('shop/index', {
            title: 'Shopping Kart new',
            products: docs
        });
    });
});

// GET sign up form
router.get('/user/signup', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages : messages,
        hasError : messages.length
    });
});

// Sign In User

router.get('/user/signin', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages : messages,
        hasError : messages.length
    });
});

// Post Sign inspect
router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

// Store user
router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;

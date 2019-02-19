var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var csrf = require('csurf');

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
   res.render('user/signup', {
      csrfToken: req.csrfToken()
   });
});

// Store user
router.post('/user/signup', function(req, res, next) {
   res.redirect('/');
});

module.exports = router;

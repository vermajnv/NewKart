var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true });
var Product = require('../models/Product');
let products = [
  new Product({
    imagePath: 'https://loremflickr.com/320/240/dog',
    title: 'IPhone X',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 23,
  }),
  new Product({
    imagePath: 'https://loremflickr.com/g/320/240/paris,girl/all',
    title: 'Moto G5 Plus',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 34,
  }),
  new Product({
    imagePath: 'https://loremflickr.com/320/240/brazil,rio',
    title: 'Samsung X-Force',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 78,
  }),
  new Product({
    imagePath: 'https://loremflickr.com/g/320/240/paris',
    title: 'Micromax X5',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    price: 24,
  }),
];
done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
  });
}

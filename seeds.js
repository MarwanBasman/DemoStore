const Product = require('./Models/product');

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017/Store')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const seedProducts = [
  {
    name: 'Banana',
    price: 1.0,
    category: 'fruit',
  },
  {
    name: 'Apple',
    price: 1.89,
    category: 'fruit',
  },
  {
    name: 'Carrot',
    price: 0.69,
    category: 'vegetable',
  },
  {
    name: 'Onion',
    price: 0.29,
    category: 'Vegetable',
  },
  {
    name: 'Milk',
    price: 1.49,
    category: 'dairy',
  },
];
Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

// const p = new Product({
//   name: 'Grapes',
//   price: 1.99,
//   category: 'fruit',
// });
// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log('OH NO Error');
//     console.log(e);
//   });

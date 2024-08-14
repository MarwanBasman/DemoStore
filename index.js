const express = require('express');
const app = express();
const path = require('path');
const Product = require('./Models/product');
const Category = require('./Models/category');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose
  .connect('mongodb://127.0.0.1:27017/Store')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/categories', async (req, res) => {
  const categories = await Category.find({});
  res.render('categories/index', { categories });
});
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index.ejs', { products });
});
app.get('/products/newProduct', async (req, res) => {
  const categories = await Category.find({});
  res.render('products/newProduct', { categories });
});
app.get('/categories/newCategory', async (req, res) => {
  const categories = await Category.find({});
  res.render('categories/newCategory', { categories });
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});
app.post('/categories', async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory.save();
  res.redirect('/categories');
});
app.get('/categories/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name);
  const products = await Product.find({ category: name });
  if (products.length == 0) {
    res.send('NO Products under This Category');
  } else res.render('products', { products });
});
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show.ejs', { product });
});
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const categories = await Category.find({});
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});
app.delete('/products/:id/Delete', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});
app.delete('/categories', async (req, res) => {
  const category = await Category.findOneAndDelete(req.body);
  res.redirect('/categories');
});
app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});

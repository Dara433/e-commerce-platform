const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Setup app instance
const app = express();
app.use(bodyParser.json());

// Import and register routes
const productRoutes = require('./routes/products');
const loginRoutes = require('./routes/Login');
const orderPageRoutes = require('./routes/OrderPage');

app.use('/products', productRoutes);
app.use('/login', loginRoutes);
app.use('/orders', orderPageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




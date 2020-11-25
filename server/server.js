require('dotenv').config();
const express = require('express');
const path = require('path');
const models = require('./models/index');
// const { sequelize } = require('./models');

const app = express();
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const testRouter = require('./routes/test');

const port = 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// router for customer logins

app.use('/user', userRouter);

// router to access products
app.use('/products', productsRouter);

// router for shopping cart
app.use('/cart', cartRouter);

// router for testing
app.use('/test', testRouter);

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server

models.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  });
});

module.exports = app;

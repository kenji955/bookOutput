import express = require('express');
// import express from 'express';
import bodyParser = require('body-parser');
import mongoose = require('mongoose');

import bookRoutes from './routes/book-routes';
import userRoutes from './routes/user-routes';
import HttpError from './models/http-error';

const app:express.Express = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://kenji:ojYQZvcl41CWSeOJ@cluster0-9uog6.mongodb.net/products_test?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log('接続完了！');
  })
  .catch(err => {
    console.log(err);
  });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const workRouter = require('./routers/workRouter');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use(express.static('./public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/works', workRouter);

module.exports = app;

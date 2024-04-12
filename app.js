const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const workRouter = require('./routers/workRouter');
const projectRequestRouter = require('./routers/projectRequestRouter');
const userRouter = require('./routers/userRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests have been made!',
});

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(morgan('dev'));

app.use(cors());

app.use(mongoSanitize());

app.use(xssClean());

app.use(express.static('./public'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//Posso criar um limiter para receber project requests. Anti spam.
app.use('/api', limiter);

app.use('/api/v1/works', workRouter);

app.use('/api/v1/project-requests', projectRequestRouter);

app.use('/api/v1/users', userRouter);

app.get('/api/v1/active-server', (req, res, next) => {
  res.status(200).json({
    status: 'sucess',
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

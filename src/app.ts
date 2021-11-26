import  createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response }  from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import authorRouter from './routes/author'

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import cors from 'cors';

const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:5500"],
  optionsSuccessStatus: 200
}

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




export default app;



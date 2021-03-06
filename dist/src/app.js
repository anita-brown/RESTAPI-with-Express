"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const authorRoute_1 = __importDefault(require("./routes/authorRoute"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
// import postRouter from './routes/post';
const users_1 = __importDefault(require("./routes/users"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5500"],
    optionsSuccessStatus: 200
};
var app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../../views'));
app.set('view engine', 'jade');
app.use((req, res, next) => {
    // allow different IP address
    res.setHeader('Access-Control-Allow-Origin', '*');
    // allow different header field 
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    next();
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)(corsOptions));
// app.use('/posts', postRouter);
app.use('/book', bookRoute_1.default);
app.use('/users', users_1.default);
app.use('/author', authorRoute_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
//
const createError = require('http-errors');
const app = express();
const indexRouter = require('./routes');
//
const PORT = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.listen(PORT, () => {
  console.log(`TS-Bucks server running at http://localhost:${PORT}`);
});

app.use('/api', indexRouter);
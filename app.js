require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const controller = require('./controllers');
const methodOverride = require('method-override');
const { PORT, HOST } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.set('view-engine', 'ejs');
app.use(methodOverride('_method'));
app.get('/', controller.hello);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  // res.end(res.sentry + "\n");
  res.status(500).json({
    status: false,
    message: err
  });
});

const server = app.listen(PORT, console.log(`Running on port = ${PORT}`));

// create the socket
const io = require('socket.io')(server, {
  cors: {
    origin: HOST,
    methods: ["GET", "POST"]
  }
});

// set to io library into global
global.io = io


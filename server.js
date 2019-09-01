const fs = require('fs');
const path = require('path');
const express = require('express');
// const routing = require('./routing/index.js');
// const controllers = require('./controllers/app.controller.js');

// // LOGGING
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

// set environment variable port or set 3000 as default
const PORT = process.env.PORT || 3000;

const app = express();

// npm morgan; create log directory
const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

// ======================= MIDDLEWARE =========================

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORE UI - REACT
app.use(express.static(path.join(__dirname, 'build')));

// ============================================================
// ROUTER THIS
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// ============================================================

// // routing and controllers
// app.use(routing);
// app.use(controllers);

// start server and listen for client requests
app.listen(PORT, function () {
    // log (server-side) when server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
});



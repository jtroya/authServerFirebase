const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

const config = require('./config');
const router = require('./router');

const app = express();

firebase.initializeApp(config.fireBaseSettings);
// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port: ', port);

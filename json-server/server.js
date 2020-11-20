'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
var jsonServer = require('json-server');

app.use('/api', jsonServer.router(path.resolve(__dirname, 'db.json')));

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.json('./db.json');
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

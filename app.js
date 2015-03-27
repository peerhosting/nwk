var path = require('path');
var express = require('express');
var app = express();

var home = require('./lib/home');
var browse = require('./lib/browse');
var upload = require('./lib/upload');
var navigate = require('./lib/navigate');
app.use(express.static(path.join(__dirname, 'client')));

app.use(home);
app.use(browse);
app.use(upload);
app.use(navigate);


app.listen(3000);
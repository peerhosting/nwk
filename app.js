var path = require('path');
var express = require('express');
var app = express();
var home = require('./lib/home');
var browse = require('./lib/browse');
var upload = require('./lib/upload');
var navigate = require('./lib/navigate');
var files = require('./lib/files');
var update = require('./lib/update');
// console.log(path.join(__dirname, './local'));
app.use(express.static(path.join(__dirname, './lib/local')));

app.use(home);
app.use(browse);
app.use(upload);
app.use(navigate);
app.use(update);
app.use(files);


app.listen(3000, function(){
	console.log('listening on port 3000');
});


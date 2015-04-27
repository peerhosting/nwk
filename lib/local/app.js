var path = require('path');
var express = require('express');
var app = express();

var home = require('./lib/home');
var browse = require('./lib/browse');
var upload = require('./lib/upload');
var navigate = require('./lib/navigate');
// console.log(path.join(__dirname, './local'));
app.use(express.static(path.join(__dirname, './lib/local')));

app.use(home);
app.use(browse);
app.use(upload);
app.use(navigate);

/*fs.exists(path.join(__dirname, '.keys/private'), function(sec) {
	if (! sec){
	console.log("no")
	}
else{
	console.log("yes");}
});*/

app.listen(3000);

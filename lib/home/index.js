var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);


app.get('/', function (req, res){
	console.log('home! - index.html');
	res.render('index.html');
})
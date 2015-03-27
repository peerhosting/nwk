var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);


app.get('/browse', function (req, res){
	res.render('index.html');
})
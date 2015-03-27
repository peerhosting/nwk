var express = require('express');
var path = require('path');
var app = module.exports = express();
// statically serves files, works!!
// app.use(express.static(path.join(__dirname + '/../local')));

app.set('views', path.join(__dirname + '/../local'));
app.engine('html', require('ejs').renderFile);


app.get('/:url', function (req, res){
	// res.send(req.params.url);
	res.render('mysite/test.html');
})
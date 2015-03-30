var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
   
var app = module.exports = express();
app.use(bodyParser.json());  

// webtorrent stuff
var fs = require('fs');
var http = require('http');
var xhr = require('xhr');
var WebTorrent = require('webtorrent');
var client = new WebTorrent();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);


app.get('/browse', function (req, res){

	download(function(info){
		res.send(info);
	})
})

function download (next) {
    client.add(magnet, function ontorrent(torrent){
    	var file = torrent.files[0];
    	next(file.name);
    });
}

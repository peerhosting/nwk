var express = require('express');
var path = require('path');
var async = require('async');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var fs = require('fs');
var Client = require('bittorrent-tracker')
var parseTorrent = require('parse-torrent');
var inspect = require('util').inspect;
var mkdirp = require('mkdirp');
var log = bunyan.createLogger({
    name: 'upload'});
   
var app = module.exports = express();
app.use(bodyParser.json());  

// webtorrent stuff
var fs = require('fs');
var http = require('http');
var xhr = require('xhr');
var WebTorrent = require('webtorrent');
var busboy = require('connect-busboy');
//...
app.use(busboy()); 

app.get('/update', function(req, res){
	
});




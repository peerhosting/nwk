var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var Client = require('bittorrent-tracker');
var parseTorrent = require('parse-torrent');
var createTorrent = require('create-torrent');
var fs = require('fs');
var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'browse'});
   
var app = module.exports = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


// webtorrent stuff
var fs = require('fs');
var http = require('http');
var xhr = require('xhr');
var WebTorrent = require('webtorrent');
var client = new WebTorrent();

var viewDir = path.resolve(__dirname ,'../local/');
app.set('views', viewDir);
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);



app.get('/browse', function (req, res){
	res.render('index.html');
});

app.get('/magnetURI', function (req, res){
	
	http.get('http://cs240-homes.pugetsound.edu:3006', function(resp) {
		
		var body = '';
	  	
	  	resp.on('data', function(chunk) {
	    	body += chunk;
	  	});
	  	
	  	resp.on('end', function() {
	    	res.send(body);
	  	});

	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});

});



app.post('/browse', function (req, res){

	var maglink = req.body.mag;

	download(maglink, function(file){
		log.info(file.name);
		res.send(file.name);  
		// res.send(info.name);
	})
})

// var themaglink = 'magnet:?xt=urn:btih:4488373b8b12f296a502f638e57708e7975dc273&tr=udp%3A%2F%2Fcs240-homes.pugetsound.edu%3A3005';
 


function download (maglink, next) {

	log.info('starting download : ' + maglink);
    
    client.add(maglink, function ontorrent(torrent){
    	// var server = torrent.createServer();
    	// server.listen(4000); // start the server listening to a port
    	log.info('Torrent info hash:', torrent.infoHash);

    	torrent.files.forEach(function (file) {
    		// Stream each file to the disk
    		var upload = path.resolve(__dirname ,'../local');
    		upload = upload + '/' + file.name;
    		var source = file.createReadStream();
    		var destination = fs.createWriteStream(upload);
    		source.pipe(destination);

    		destination.on('close', function() {

    			next(torrent.files[0]);	

    		});

    	});
    	
    	
    
    });
}
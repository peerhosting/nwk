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

function onTorrent (torrent) {
	// $('#files').text('Torrent magnet link: ' + torrent.magnetURI);
	// console.log(torrent);
	// console.log('Torrent info hash: ' + torrent.infoHash + ' <a href="/#'+torrent.infoHash+'">(link)</a><br>')
	// console.log('Downloading from ' + torrent.swarm.wires.length + ' peers<br>')
	// console.log('progress: starting...');



  	// console.log(torrent.addPeer('131.191.35.92:59384'));
	// console.log(torrent.addPeer('131.11.5.92:59384'));

	torrent.swarm.on('download', function () {


	}
		// console.log('swarm on download!!');

	// var progress = (100 * torrent.downloaded / torrent.parsedTorrent.length).toFixed(1)
	// $('#testing').text('progress: ' + progress + '% -- download speed: ' + prettysize(torrent.swarm.downloadSpeed()));
	// if(progress == 100)
	// 	console.log(torrent.files);
	// for (var i = 0; i < torrent.files.length; i++) {
	// 	console.log(torrent.files[i]);
	// };
	// console.log(torrent.files);
	// 
	// torrent.files.forEach(function (file) {
	// 	console.log(file);
	// 	var source = file.createReadStream();
	// 	var destination = fs.createWriteStream('./system/files/'+file.name);
	// 	source.pipe(destination);
	// 	destination.on('finish', function(){
	// 		console.log('done writing!!');
	// 		$('#download').text('Ready!');
	// 		// $('#download').href('./system/files/'+file.name);

	// 	})
	

	});
// upload 
var express = require('express');
var path = require('path');
var app = module.exports = express();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());       // to support JSON-encoded bodies

app.set('views', __dirname);
// console.log(path.join(__dirname, 'js'));
app.engine('html', require('ejs').renderFile);


app.get('/upload', function (req, res){
	console.log('message2.0');
	// res.send('woo');
	res.render('index.html');
});

app.post('/upload', function (req, res){
	console.log('MESSSAGE!!!!!');
	res.send('uploaded!!');
});




// var fs = require('fs');
// var http = require('http');
// var xhr = require('xhr');
// var WebTorrent = require('webtorrent');
// var prettysize = require('prettysize');


// // seeding functions

// function seed (files) {
// 	var client = new WebTorrent();
// 	// console.log('works');
//     client.seed(files, onTorrent);
// }

// function onTorrent (torrent) {
// 	console.log('Torrent magnet link: ' + torrent.magnetURI);
// 	// console.log(torrent);
// 	// console.log('Torrent info hash: ' + torrent.infoHash + ' <a href="/#'+torrent.infoHash+'">(link)</a><br>')
// 	// console.log('Downloading from ' + torrent.swarm.wires.length + ' peers<br>')
// 	// console.log('progress: starting...');



//   	// console.log(torrent.addPeer('131.191.35.92:59384'));
// 	// console.log(torrent.addPeer('131.11.5.92:59384'));

// 	// torrent.swarm.on('download', function () {
// 	// 	// console.log('swarm on download!!');

// 	// var progress = (100 * torrent.downloaded / torrent.parsedTorrent.length).toFixed(1)
// 	// $('#testing').text('progress: ' + progress + '% -- download speed: ' + prettysize(torrent.swarm.downloadSpeed()));

    
      	
//  //  });

//   torrent.swarm.on('upload', function () {
//   	console.log('uploading!!');
//     // $('#upload').text('upload speed:' + prettysize(torrent.swarm.uploadSpeed()) + '/s<br>')

//     console.log('Torrent info hash:', torrent.infoHash);
//   });

// }


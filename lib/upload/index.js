// upload 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var fs = require('fs');
var Client = require('bittorrent-tracker')
var parseTorrent = require('parse-torrent');



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
//...
app.post('/fileupload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        //log.info("Uploading: " + filename); 
        console.log("About to create & seed a torrent for "+filename);
        var upload = path.resolve(__dirname ,'../local');
        //log.info(upload);
        upload = upload + '/' + filename;
        fstream = fs.createWriteStream(upload);
        file.pipe(fstream);

        fstream.on('close', function () {
        	
        	seed(upload, function(torrent){

        		var saveTorrent = path.resolve(__dirname ,'../../torrents');
        		//log.info(saveTorrent);
        		saveTorrent = saveTorrent + '/' + 'my.torrent';


        		fstream = fs.createWriteStream(saveTorrent);
        		file.pipe(fstream);

        		fstream.on('close', function() {
        			console.log('Done creating the torrent file '+saveTorrent);
        			// log.info(torrent.swarm.port);
        			// var peerz = torrent.swarm._peers;
        			//log.info(torrent.announceList);

        			res.render("index.html");	
        		})

        		
        	});
        });
    });
});


// var bodyParser = require('body-parser');

// app.use(bodyParser.json());       // to support JSON-encoded bodies

app.set('views', __dirname);
// log.info(path.join(__dirname, 'js'));
app.engine('html', require('ejs').renderFile);

app.get('/upload', function (req, res){
//	log.info('message2.0');
	res.render('index.html');
});

app.post('/upload', function (req, res){

	
	seed(function(infohash){
		//log.info(infohash.swarm);
		// infohas.swarm.addPeer();
		var peerz = infohash.swarm._peers;
		

		// client.remove(infohash);

		res.send(JSON.stringify(peerz));
	});
});





// var prettysize = require('prettysize');

var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

// // // seeding functions

function seed (file, next) {
    // log.info('works');
    
    var options = {
	announceList: [['udp://cs240-homes.pugetsound.edu:3005'], ['wss://cs240-homes.pugetsound.edu:3005']]
    }
    var client = new WebTorrent();
    client.seed(file, options, function onseed(torrent){
    	var parsedTorrent = parseTorrent(torrent) // { infoHash: 'xxx', length: xx, announce: ['xx', 'xx'] }
	
	
    	var peerId = new Buffer(randomValueHex(10));
    	var port = 6881;
	
    	var client = new Client(peerId, port, parsedTorrent);
//    	log.info(peerId);
	
    	client.on('error', function (err) {
    	  // fatal client error!
    	  log.info(err.message);
    	})

    	client.on('warning', function (err) {
    	  // a tracker was unavailable or sent bad data to the client. you can probably ignore it
    	  log.info(err.message);
    	})

    	// start getting peers from the tracker
    	client.start();

    	client.on('update', function (data) {
    	  console.log('got an announce response from tracker: ' + data.announce)
    	  //log.info('number of seeders in the swarm: ' + data.complete)
    	  //log.info('number of leechers in the swarm: ' + data.incomplete)
    	})

    	client.once('peer', function (addr) {
    	  console.log('found a peer: ' + addr) // 85.10.239.191:48623
    	})

    	// announce that download has completed (and you are now a seeder)
    	// client.complete()

    	// // force a tracker announce. will trigger more 'update' events and maybe more 'peer' events
    	// client.update()


    	
    	next(torrent);
    });
}

// function onTorrent (torrent) {
// 	log.info('Torrent magnet link: ' + torrent.magnetURI);
// 	// log.info(torrent);
// 	// console.log('Torrent info hash: ' + torrent.infoHash + ' <a href="/#'+torrent.infoHash+'">(link)</a><br>')
// 	// console.log('Downloading from ' + torrent.swarm.wires.length + ' peers<br>')
// 	// console.log('progress: starting...');



//   	// console.log(torrent.addPeer('131.191.35.92:59384'));
// 	// console.log(torrent.addPeer('131.11.5.92:59384'));

// 	// torrent.swarm.on('download', function () {
// 	// 	// console.log('swarm on download!!');

// 	// var progress = (100 * torrent.downloaded / torrent.parsedTorrent.length).toFixed(1)
// 	// $('#testing').text('progress: ' + progress + '% -- download speed: ' + prettysize(torrent.swarm.downloadSpeed()));

    
      	
//  });

//   torrent.swarm.on('upload', function () {
//   	console.log('uploading!!');
//     // $('#upload').text('upload speed:' + prettysize(torrent.swarm.uploadSpeed()) + '/s<br>')

//     console.log('Torrent info hash:', torrent.infoHash);
//   });

// }


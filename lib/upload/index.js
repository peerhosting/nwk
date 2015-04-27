// upload 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var tracking_server = new XMLHttpRequest();
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

app.post('/fileupload', function(req, res) {
    // we want name and description of the website here!
    var upload = path.resolve(__dirname ,'../local/' + req.body.name);
    
    mkdirp(upload, function (err) {
        if (err) console.error(err)
        else {
            res.send(req.body.name);
        }
    });
});



<<<<<<< HEAD
// app.post('/fileupload', function(req, res) {
=======
var siteName;
>>>>>>> 659dadbbab6cf40e62ee5323acf73f4753b5be8e

//     var fstream;
//     var fName;
//     var siteName;
//     var upload;
//     var finalLoc;
//     var asyncTODO = [];

<<<<<<< HEAD
//     req.pipe(req.busboy);
=======
    var fstream;
    var fName;
    var upload;
    var finalLoc;
    var asyncTODO = [];
>>>>>>> 659dadbbab6cf40e62ee5323acf73f4753b5be8e

//     upload = path.resolve(__dirname ,'../local/temp');
    
//     var makeDir = function(callback){
//         mkdirp(upload, function (err) {
//             if (err) console.error(err)
//             else {
//                 callback(null, 'madeDir');
//             }
//         });
//     }

//     var fileRename = function(){
//         fs.rename(upload, finalLoc, function (err) {
//           if (err) throw err;
//           fs.stat(finalLoc, function (err, stats) {
//             if (err) throw err;

//               log.info('we reneamed it');
//               doTheSeed();
            
//           });
//         });
//     }

    
//     var doTheSeed = function(){
//         seed(finalLoc, function(torrent){

//             // var saveTorrent = path.resolve(__dirname ,'../../torrents');
//             // //log.info(saveTorrent);
//             // saveTorrent = saveTorrent + '/' + siteName +'.torrent';


//             // var fstream = fs.createWriteStream(saveTorrent);
//             // // torrent.pipe(fstream);

//             // fstream.on('close', function() {
//             //     console.log('Done creating the torrent file '+saveTorrent);
//             //     res.redirect("/");  
//             // })

//             log.info('Done creating the torrent file : '+torrent.magnetURI);
//             res.redirect("/");  

//         });

//     }

//     var fileCount = 0;
//     var filesDone = 0;
//     var gotName = false;
//     req.busboy.on('file', function (fieldname, file, filename) {
//         log.info("Uploading: " + filename); 
//         fileCount++;
//         mkdirp(upload, function (err) {
//             if (err) console.error(err)
//             else {
//                 var up = upload + '/' + filename;
//                 var fstream = fs.createWriteStream(up);
//                 file.pipe(fstream);
//                 fstream.on('close', function () {
//                     filesDone++;

//                     log.info(upload + ' completed writing');
                
//                     if(fileCount === filesDone){
//                         log.info('woahh! all done!');
//                         fileRename();
//                     }

//                 });
//             }
//         });
    
        
//     });

//     req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
//         log.info('got my field - > ' + val);
//         gotName = true;
//         siteName = val;
//         finalLoc = path.resolve(__dirname ,'../local/' + siteName);
        
        
//     });



//     req.busboy.on('finish', function(){
        
//         log.info('all finished');
//     });






// });


// var bodyParser = require('body-parser');

// app.use(bodyParser.json());       // to support JSON-encoded bodies

app.set('views', __dirname);
// log.info(path.join(__dirname, 'js'));
app.engine('html', require('ejs').renderFile);

app.get('/upload', function (req, res){
//	log.info('message2.0');
	res.render('index.html');
});

// app.post('/upload', function (req, res){

	
// 	seed(function(infohash){
// 		//log.info(infohash.swarm);
// 		// infohas.swarm.addPeer();
// 		var peerz = infohash.swarm._peers;
		

// 		// client.remove(infohash);

// 		res.send(JSON.stringify(peerz));
// 	});
// });





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
	announceList: [['udp://cs240-homes.pugetsound.edu:3005'], ['wss://cs240-homes.pugetsound.edu:3005']],
//	name: "hello world"
    }
    var client = new WebTorrent();
    client.seed(file, options, function onseed(torrent){
    	var parsedTorrent = parseTorrent(torrent) // { infoHash: 'xxx', length: xx, announce: ['xx', 'xx'] }
	
//	console.log("P: "+parseTorrent.infoHash+" t"+torrent.infoHash);
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
    	client.start({name: "Hello world"});


    	var postData = JSON.stringify({
	    'name' : siteName,
	    'info': torrent.infoHash,
	});
	
	var options = {
	    hostname: 'cs240-homes.pugetsound.edu',
	    port: 3006,
	    path: '/',
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	    }
	};
	var newreq = http.request(options, function(res) {
	});
	
	newreq.write(postData);
	newreq.end();
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


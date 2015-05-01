// upload 
var express = require('express');
var path = require('path');
var async = require('async');
var http = require('http');
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

var crypto = require('crypto');
var ursa = require('ursa');

var privPem = fs.readFileSync('.keys/private', {"encoding":'utf8'});
var privateKey = ursa.createPrivateKey(privPem, '', 'base64');
var pubPem = fs.readFileSync('.keys/public', {"encoding":'utf8'});
var publicKey = ursa.createPublicKey(pubPem, 'base64');
 

app.set('views', __dirname);
// log.info(path.join(__dirname, 'js'));
app.engine('html', require('ejs').renderFile);

app.get('/upload', function (req, res){
//  log.info('message2.0');
    res.render('index.html');
});

var siteName;
function siteExists(siteName, next){
    http.get('http://cs240-homes.pugetsound.edu:3006', function(resp) {
        
        var body = '';
        
        resp.on('data', function(chunk) {
            body += chunk;
        });
        
        resp.on('end', function() {
          console.log(body);
          console.log(siteName);
            var info = JSON.parse(body);
            for(var i = 0; i < info.length; i++){
                
                if(info[i][siteName]){
                    console.log(console.log(info[i][siteName]));
                    console.log('shoot! dont make a thing, quit');
                    next('That is already a site!');
                } else {
                    console.log("didnt find in it at i = " + i);
                }
            }
            next();            
        });

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
}

app.post('/fileupload', function(req, res) {
    // we want name and description of the website here!


    siteExists(req.body.name, function(err){
        if (err) {
            // res.send("site name exists, try again");
            res.end();
        } else {
            var upload = path.resolve(__dirname ,'../local/' + req.body.name);
            var names = req.body.name;
            
            mkdirp(upload, function (err) {
                if (err) console.error(err)
                else {
                    res.send(names);
                }
            });    
        }
    })
    
});

app.post('/beginseed', function(req, res){

    var up = path.resolve(__dirname ,'../local/' + req.body.loc);
    siteName = req.body.loc+"/";

    //console.log(siteName);
    //console.log('^^^ site name ^^^');
    var up = path.resolve(__dirname ,'../local/' + siteName);
    
    // console.log(up + '/');
    // console.log('^^^ upload dir name ^^^');

    seed(up + '/', function(torrent){
        console.log('torrent successfully created, infohash -> '+ torrent.infoHash);
        // console.log(torrent.infoHash);
        // console.log();
        var toRet = 'my files + ';
        for (var i = 0; i < torrent.files.length; i++) {
            toRet += 'file: ' +torrent.files[i].name + '\n';
            
        };
        // res.send(toRet);
        res.render(siteName + 'index.html');
    })
});



function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

// // // seeding functions

function seed (file, next) {

    
    var options = {
	   announceList: [['udp://cs240-homes.pugetsound.edu:3005'], ['wss://cs240-homes.pugetsound.edu:3005']],
    }


    var client = new WebTorrent();
    // console.log(file);
    // console.log('we are in seed, this is the dir ^^^');
    client.seed(file, options, function onseed(torrent){
        var toRet = 'my files + '+ '\n';
        for (var i = 0; i < torrent.files.length; i++) {
            toRet += 'file: ' +torrent.files[i].name + '\n';
            toRet += 'path: ' +torrent.files[i].path + '\n'; 
        };
        // console.log(toRet);

    	var parsedTorrent = parseTorrent(torrent) // { infoHash: 'xxx', length: xx, announce: ['xx', 'xx'] }
	
        console.log("P: "+parseTorrent.infoHash+" t"+torrent.infoHash);
	
	var message = privateKey.privateEncrypt(Date.now()+"",'utf8', 'base64');
	//console.log("Message is "+publicKey.publicDecrypt(message, 'base64',  'utf8'));
    	var postData = JSON.stringify({
	    'name' : siteName,
	    'info': torrent.infoHash,
	    'pk': pubPem,
	    'message': message,
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
    	var peerId = new Buffer(randomValueHex(10));
    	var port = 6881;
	
    	var client = new Client(peerId, port, parsedTorrent);
    	console.log(peerId);
	
    	client.on('error', function (err) {
    	  // fatal client error!
    	  console.log(err.message);
    	})

    	client.on('warning', function (err) {
    	  // a tracker was unavailable or sent bad data to the client. you can probably ignore it
    	  console.log(err.message);
    	})

    	// start getting peers from the tracker
    	client.start({name: "Hello world"});
    	client.on('update', function (data) {
    	  console.log('got an announce response from tracker: ' + data.announce)
    	  //console.log('number of seeders in the swarm: ' + data.complete)
    	  //console.log('number of leechers in the swarm: ' + data.incomplete)
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




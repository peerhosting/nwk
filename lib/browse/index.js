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

app.get('/browse/:url', function (req, res){
	console.log(req.params.url);
	var siteName = req.params.url;
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
	    	          var maglink = info[i][siteName].info;
	    	          console.log('cool we found it!');
	    	          download(maglink, siteName, function(index){
	    	          	log.info(index);

	    	          	// res.send(file.name);  
	    	          	res.render(index);
	    	          })
	    	          
	    	      } else {
	    	          console.log("didnt find in it at i = " + i);
	    	      }
	    	  }

	    	// res.send(req.params.url);
	  	});

	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
});

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
	  	console.log(body);
	  	var info = JSON.parse(body);
		var data = Array();
	  	for(var i = 0; i < info.length; i++){
	  	    data.push(info[i].info);
	  	}
	    	res.send(body);
	    });
	    
	}).on('error', function(e) {
	    console.log("Got error: " + e.message);
	});
    
});



app.post('/browse', function (req, res){

	var maglink = req.body.mag;
	var name = req.body.namez;
	console.log("I am browsing");
	download(maglink, name, function(filename){
		log.info(filename+" FILE NAMEMEEMEME");
		res.send(filename);  
		// res.send(info.name);
	})
})

// var themaglink = 'magnet:?xt=urn:btih:4488373b8b12f296a502f638e57708e7975dc273&tr=udp%3A%2F%2Fcs240-homes.pugetsound.edu%3A3005';
 


function download (maglink, siteName, next) {

	log.info('starting download : ' + maglink);
    
    client.add(maglink, function ontorrent(torrent){
    	// var server = torrent.createServer();
    	// server.listen(4000); // start the server listening to a port
    	log.info('Torrent info hash:', torrent.infoHash);
    	var upload = path.resolve(__dirname ,'../local/' +siteName);

	if (! fs.existsSync(upload)) fs.mkdirSync(upload);
    	var countDown = torrent.files.length;
    	var index = '';
	//console.log(torrent)
    	torrent.files.forEach(function (file) {
    	    // Stream each file to the disk
    	    //console.log(file)
    	    //upload = upload + '/' + file.name;
	    var folders = file.path.split('/');
	    if (folders[0]+'/' === siteName) folders = folders.slice(1,folders.length-1);
	    else folders = folders.slice(0,folders.length-1);
	    var total = upload+"/";
	    for(var f in folders) {
		if (! fs.existsSync(total+folders[f])) fs.mkdirSync(total+folders[f]);
		total = total + folders[f] + "/";}
	    var source = file.createReadStream();
	    console.log(file.name)
	    console.log(total)
    	    var destination = fs.createWriteStream(total+file.name);
    	    source.pipe(destination);

    	    destination.on('close', function() {
    		countDown--;
    		if(countDown === 0){
    		    // console.log(torrent.files[]);
    		    next(siteName + '/index.html');		
    		}
    		

    	    });
	    
    	});
    	
    	
    
    });
}

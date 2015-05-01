var express = require('express');
var bodyParser = require('body-parser');
var parseTorrent = require('parse-torrent');
var inspect = require('util').inspect;
var mkdirp = require('mkdirp');
var path = require('path');
// webtorrent stuff
var fs = require('fs');
var http = require('http');
var xhr = require('xhr');
var WebTorrent = require('webtorrent');
var client = new WebTorrent();
var ursa = require('ursa');


//express   
var app = module.exports = express();
app.use(bodyParser.json());  
// var viewDir = path.resolve(__dirname ,'../local/');
// app.set('views', viewDir);
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);




var mySite;
app.get('/getMyDir', function (req, res){
	console.log(mySite);
	console.log('waited for my site ^^^');

	res.send(mySite);
})

app.get('/:url', function (req, res){
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
	    	siteName = siteName + '/';
	    	  var info = JSON.parse(body);
	    	  for(var i = 0; i < info.length; i++){
	    	      if(info[i][siteName]){
	    	          console.log('we found the site we navigated to');
	    	          var maglink = info[i][siteName].info;
					  var privPem = fs.readFileSync('.keys/private', {"encoding":'utf8'});
					  var privateKey = ursa.createPrivateKey(privPem, '', 'base64');
					  var datetime = parseInt(privateKey.decrypt(info[i][siteName].message, 'base64', 'utf8'));
					  
					  if ((datetime>1.43*10^12) && (datetime < 1.75*10^12)){
					  	//console.log('ooo, decrypted');
					  	console.log('successfully decrypted time, serve file');
					  	mySite = siteName;
					  	// console.log(mySite);
					  	//console.log('so sick, we figured it out^^^');
					  	res.render('index.html');
					  } else {

	    	              download(maglink, siteName, function(index){
	    	          	  console.log(index);
				  
	    	          	  // res.send(file.name);  
	    	          	  res.render(index);
	    	              })
	    	          }
	    	              

	    	      } else {
	    	      	
	    	        console.log("didnt find in it at i = " + i);
	    	      }
	    	  }
	  	});

	});
});

function download (maglink, siteName, next) {

	console.log('starting download : ' + maglink);
    
    client.add(maglink, function ontorrent(torrent){
    	// var server = torrent.createServer();
    	// server.listen(4000); // start the server listening to a port
    	console.log('Torrent info hash:', torrent.infoHash);
    	var upload = path.resolve(__dirname ,'../local/' +siteName);
    	var countDown = torrent.files.length;
    	var index = '';
    	torrent.files.forEach(function (file) {
    		// Stream each file to the disk
    		
    		upload = upload + '/' + file.name;
    		var source = file.createReadStream();
    		var destination = fs.createWriteStream(upload);
    		source.pipe(destination);

    		destination.on('close', function() {
    			countDown--;
    			if(countDown === 0){
    				console.log(siteName + ' download complete');
    				// console.log(torrent.files[]);
    				next(siteName + '/index.html');		
    			}
    			

    		});

    	});
    	
    	
    
    });
}




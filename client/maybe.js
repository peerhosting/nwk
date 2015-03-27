// // index.js

// var fs = require('fs');
// var http = require('http');
// var xhr = require('xhr');
// var WebTorrent = require('webtorrent');
// var prettysize = require('prettysize');
// var dragDrop = require('drag-drop/buffer');
// var mkdirp = require('mkdirp');
// var html = require('html').HTML;
// var express = require('express');
// var app = express();
// var http = require('http');
// var httpServer = http.Server(app);
// alert('asdfa');

// global.document = window.document;


// var magnetUri = 'magnet:?xt=urn:btih:b415c913643e5ff49fe37d304bbb5e6e11ad5101&dn=ubuntu-14.10-desktop-amd64.iso';



// var client = new WebTorrent();

// var options = {
//   name: "My Site",            // name of the torrent (default = basename of `path`)
//   comment: "A pretty cool thing!",         // free-form textual comments of the author
//   createdBy: "Jon Sims"       // name and version of program used to create torrent
// }

// // var magURI = 'magnet:?xt=urn:btih:f760d2d7981fd37151cd2a499a1c05afd5d841b8&dn=Idiot%27s+Guides%3A+Basic+Math+and+Pre-Algebra+-+Carolyn+Wheater+&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
// var localURI = './my.torrent'; 

// var hasht = 'cf17126d32c8a92e4a2f3708a4ead83412248499';



// $(document).ready(function(){
// 	// if(typeof document === "object"){
// 	// 	console.log('working');
// 	// }
// 	// console.log(document);
// 	$('#download').click(function(){
// 		download(magnetUri);
// 	});

// 	$('#upload').click(function(){
// 		seed(localURI);
// 	});
	

// 	// dragDrop('#seedMe', function (files) {
// 	// 	console.log('message');
// 	// })
// });



// // When user drops files on the browser, create a new torrent and start seeding it!
// // dragDrop('body', function (files) {
// // 	console.log('message');
// // 	download(magURI);
// // })


// function download (magnet) {
//     client.add(magnet, onTorrent);
// }

// function seed (files) {
// 	// console.log('works');
//     client.seed(files, onTorrent);
// }

// function onTorrent (torrent) {
// 	$('#files').text('Torrent magnet link: ' + torrent.magnetURI);
// 	// console.log(torrent);
// 	// console.log('Torrent info hash: ' + torrent.infoHash + ' <a href="/#'+torrent.infoHash+'">(link)</a><br>')
// 	// console.log('Downloading from ' + torrent.swarm.wires.length + ' peers<br>')
// 	// console.log('progress: starting...');



//   	// console.log(torrent.addPeer('131.191.35.92:59384'));
// 	// console.log(torrent.addPeer('131.11.5.92:59384'));

// 	torrent.swarm.on('download', function () {
// 		// console.log('swarm on download!!');

// 	var progress = (100 * torrent.downloaded / torrent.parsedTorrent.length).toFixed(1)
// 	$('#testing').text('progress: ' + progress + '% -- download speed: ' + prettysize(torrent.swarm.downloadSpeed()));
// 	// if(progress == 100)
// 	// 	console.log(torrent.files);
// 	// for (var i = 0; i < torrent.files.length; i++) {
// 	// 	console.log(torrent.files[i]);
// 	// };
// 	// console.log(torrent.files);
// 	// 
// 	// torrent.files.forEach(function (file) {
// 	// 	console.log(file);
// 	// 	var source = file.createReadStream();
// 	// 	var destination = fs.createWriteStream('./system/files/'+file.name);
// 	// 	source.pipe(destination);
// 	// 	destination.on('finish', function(){
// 	// 		console.log('done writing!!');
// 	// 		$('#download').text('Ready!');
// 	// 		// $('#download').href('./system/files/'+file.name);

// 	// 	})
// 	// });

    
      	
//   });

//   torrent.swarm.on('upload', function () {
//     $('#upload').text('upload speed:' + prettysize(torrent.swarm.uploadSpeed()) + '/s<br>')

//     console.log('Torrent info hash:', torrent.infoHash);
//   })

//   // torrent.files.forEach(function (file) {
//   //   var extname = path.extname(file.name)
//   //   if (extname === '.mp4' || extname === '.webm') {
//   //     var video = document.createElement('video')
//   //     video.controls = true
//   //     media.appendChild(video)
//   //     file.createReadStream().pipe(video)
//   //   } else if (extname === '.mp3') {
//   //     var audio = document.createElement('audio')
//   //     audio.controls = true
//   //     media.appendChild(audio)
//   //     file.createReadStream().pipe(audio)
//   //   } else {
//   //     file.getBlobURL(function (err, url) {
//   //       if (err) throw err
//   //       var a = document.createElement('a')
//   //       a.download = file.name
//   //       a.href = url
//   //       a.textContent = 'Download ' + file.name
//   //       log.innerHTML += a.outerHTML + '<br>'
//   //     })
//   //   }
//   // })

// }



// var serve = function(file){
// 	    console.log('alll --- done');
//       	app.use(express.static('./system/files/' + file.name));

//       	app.get('/', function(req, res){
//       	    res.sendfile('./system/files/' + file.name);
//       	});
//       	app.listen(3000);
// }






// // fs.readFile('system/test/test.html','utf8' , function(err, data){
// // 	if(!err){
// // 		var file = new Buffer(data, 'utf8');
// // 		// console.log(options);
// // 		// console.log(data);
// // 		// console.log(file);
// // 		client.seed(file, options, function onSeed (torrent) {
// // 		  // Client is seeding the file!
// // 		  console.log('Torrent info hash:', torrent.magnetURI);

// // 		  console.log(torrent.addPeer('131.191.35.92:48970'));
// // 		  // alert(torrent.magnetURI);

// // 		  torr = torrent;
// // 		  // torrent.magnetURI
// // 		  // addClient(torrent.magnetURI);
// // 		  // $('#upload').text(torrent.magnetURI);
// // 		  fs.writeFile('system/test/test.txt', torr.magnetURI , 'utf8', function(err){
// // 		  	if(err) throw err;
		  	
// // 		  	// $('#upload').text();
// // 		  	console.log('saved uri');
// // 		  });

// // 		});
// // 	}
// // });

// // setTimeout(function(){

// // 	var srv = http.createServer();

// // 	srv.listen(1337, '127.0.0.1', function() {
// // 		var options = {
// // 		    host: '127.0.0.1',
// // 		    path: '/',
// // 		    port: '8080',
// // 		    path: '/0',
// // 		    method: 'GET'
// // 		};

// // 		var req = http.request(options, function(res){

// // 			var string = '';
// // 			res.on('data', function (chunk) {
// // 			  console.log('BODY: ' + chunk);
// // 			  string += chunk;
// // 			});
// // 			res.on('end', function(){
// // 				console.log(string);
// // 			})


// // 		});
		
// // 		req.end();
// // 	});

// // }, 5000);





// // // console.log('message');
// // client.seed('./test.html', function onSeed (torrent) {
// //   // Client is seeding the file!
// //   console.log('Torrent info hash:', torrent.infoHash);
// //   // torrent.magnetURI
// //   // addClient(torrent.magnetURI);
// // });

// // var addClient = function(uri){
// // 	client.add(uri, function (tor) {
// //   		console.log(tor.name);
// //   	});
// // }


// // var fileArray = [];
// // var f = new File([""], ".");
// // fileArray.push(f);

// // console.log(fileArray);


// // var createTorrent = require('create-torrent');

// // var dragDrop = require('drag-drop/buffer');




// // dragDrop('#upload', function (files) {

// // 	console.log("ALIVE");

// // 	console.log(files);
// // 	// client.seed(files, function onTorrent (torrent) {
// // 	// 	// Client is seeding the file!
// // 	// 	console.log('Torrent info hash:', torrent.infoHash);
// // 	// });
// // });



// // createTorrent('./system/test/test.html', function (err, torrent) {
// //   if (!err) {
// //     // `torrent` is a Buffer with the contents of the new .torrent file
// //     fs.writeFile('my.torrent', torrent);
// //     console.log(torrent.magnetURI);
// //     console.log(torrent.swarm);
// //   } 
// //   console.log(err);
// // })

// // createTorrent('', options, function(err, torrent){
// // 	if(err)
// // 		alert('error!');
// // 	else {
		
	
// // 	}
// // });
  
// var makeDir = function() {
// 	mkdirp('./system', function(err){
// 		if(err)
// 			alert('failed to create system folder. ');
// 	});
// }

// var putFiles = function() {

// }


// // mkdirp('./system', function(err){
// // 	if(err)
// // 		alert('ahhh!');
// // 	else {
// // 		fs.writeFile('./system/info.txt', content, function(err){
// // 			if(err) 
// // 				alert('err writing file');
// // 			else
// // 				fs.readFile('./system/info.txt', function(err, content){
// // 					if(err)
// // 						alert('err');
// // 					else {
						
// // 					}
// // 				});
// // 		});
// // 	}
// // });






// 		// torrent.files[0].getBuffer(function(err, buffer){

// 		// 	if(err) {
// 		// 		console.log('there is an err!!');
// 		// 	}
// 		// 	console.log(buffer);
// 		// });

// 		// var stream = torrent.files[0].createReadStream();

// 		// stream.on('readable', function(){
// 		// 	console.log('message');
// 		// 	var chunk;
// 		// 	console.log(stream.read());
// 		// 	while(null !== (chunk = stream.read())) {
// 		// 		console.log('got some bytes : ', chunk.length);
// 		// 	}
// 		// })

// 		// stream.on('data', function(chunk){
// 		// 	console.log(chunk);
// 		// });
// 		// stream.on('end', function(){
// 		// 	console.log('THE END');
// 		// });

// 		// console.log(stream);

// 		// torrent.files[0].getBuffer(function(err, buff){
// 		// 	if (err) throw err;
// 		// 	console.log(buff);
// 		// });





// 		// server.on('request', function(req, res){
// 		// 	console.log(res);
// 		// 	res.on('data', function (chunk) {
// 		// 	  console.log('BODY: ' + chunk);

// 		// 	});
// 		// 	res.on('end', function(){
// 		// 		res.write()
// 		// 	})

// 		// });



// 		// server.on('request', function(req, res){
// 		// 	console.log('STATUS: ' + res.statusCode);
// 		// 	console.log('HEADERS: ' + JSON.stringify(res.headers));
// 		// 	res.setEncoding('utf8');
// 			// res.on('data', function (chunk) {
// 			//   console.log('BODY: ' + chunk);
// 			// });
// 			// req.on('error', function(e) {
// 			//   console.log('problem with request: ' + e.message);
// 			// });
// 		// });







// 		// });




// 		// var stream = torrent.files[2].createReadStream();
// 		// console.log(stream);
// 		// stream.on('data', function(chunk){
// 		// 	console.log('got data: ' + chunk.length);
// 		// })

// 		// stream.on('end', function(){
// 		// 	console.log('all done!!');
// 		// })





// // client.on('torrent', function(torrent){
	
// // 	// makeDir();
// // 	console.log('message');
// // 	// Got torrent metadata!
// // 	console.log('Torrent info hash:', torrent.infoHash);

// // 	// torrent.files.forEach(function (file) {
// // 	    // Stream each file to the disk
// // 	    console.log(file.name);
// // 	    var source = file.createReadStream();
// //     	source.on('data', function(chunk) {
// //     	  console.log('got %d bytes of data', chunk.length);
// //     	});
// // 		source.on('end', function() {
// // 		  console.log('there will be no more data. Item : ' + i);
// // 		});

// // 	    var destination = fs.createWriteStream(file.name)
// // 	    source.pipe(destination);
// // 	  // });

// // 	// // console.log(torrent.files.length);
// // 	// for (var i = 0; i < torrent.files.length; i++) {
// // 	// 	console.log(torrent.files[i].name);
// // 	// 	var source = torrent.files[i].createReadStream();
// // 	// 	source.on('data', function(chunk) {
// // 	// 	  console.log('got %d bytes of data', chunk.length);
// // 	// 	});
	
// // 	// };
// // })
// // // string we will write to file
// // var content = '';

// // // platform value

// // content += '[Platform]' + os.EOL;
// // content += 'OS Type: ' + os.platform() + os.EOL;
// // content += 'OS Version: ' + os.release() + os.EOL;
// // content += 'OS Arch: ' + os.arch() + os.EOL;
// // content += os.EOL;


// // content += '[Memory]' + os.EOL;
// // content += 'Total (bytes) :' + os.totalmem() + os.EOL;
// // content += 'Free (bytes) :' + os.freemem() + os.EOL;
// // content += '[Platform] :' + (os.freemem() / os.totalmem() *100).toFixed() + os.EOL;


// // // document.write(content);


// // // write to file




// // var dragDrop = require('drag-drop');
// // console.log(dragDrop);
 
// // dragDrop(document.body, function (files, pos) {
// //   console.log('Here are the dropped files', files);
// //   console.log('Dropped at coordinates', pos.x, pos.y);
// // });


// // var readTorrent = require( 'read-torrent' );





// // //console.log(client);
// // // OS Node module
// // var os = require('os');

// // // FS Node module


// // index.js
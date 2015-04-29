// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');
var http = require('http');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
// Make your Express server:


var app = module.exports = express()
    .use(SocketIOFileUpload.router);

// Start up Socket.IO:
var server = http.createServer(app);
server.listen(4000, function(){
    console.log('listening on 4000');
});

var io = socketio.listen(server);

io.sockets.on("connection", function(socket){
    // console.log('CONNECTION \n\n\n\n\n\n');

    var siteName;
    socket.on('makeDir', function (data) {
        console.log(data.name);
        console.log(uploader.dir);
    

        var upload = uploader.dir + '/' + data.name;

        
        mkdirp(upload, function (err) {
            if (err) console.error(err)
            else {
                console.log('we made a new dir!!');
            }
        });
    });

    socket.on('getStatus', function (data) {
        fs.readdir(uploader.dir, function(err, files){  
            console.log(files.length);
            socket.emit('sendStatus', { files: files });
        })
        
    });

    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    //uploader.dir = path.resolve(__dirname ,'../local/hey');
    uploader.listen(socket);
    uploader.on("start", function(event){
        console.log('started');  
        console.log(event.file.meta.name);

        uploader.dir = path.resolve(__dirname ,'../local/' + event.file.meta.name);
    });
    uploader.on("progress", function(event){
        console.log('progress being made');
    });

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log('saved');
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });


});
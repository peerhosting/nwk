// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');
var http = require('http');
// Make your Express server:


var app = module.exports = express()
    .use(SocketIOFileUpload.router);

// Start up Socket.IO:
var server = http.createServer(app);
server.listen(4000);


var io = socketio.listen(server);

io.sockets.on("connection", function(socket){
    console.log('CONNECTION \n\n\n\n\n\n');

    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = "/srv/uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});
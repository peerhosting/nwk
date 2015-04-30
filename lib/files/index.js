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
var currentDir = '';
var uploader = new SocketIOFileUpload();




io.sockets.on("connection", function(socket){

    var readContent = function(dir){
        console.log('this is the dir - > ' + dir);
        fs.readdir(dir, function(err, files){  
            if(files === undefined || files == undefined){
                console.log('nothing in the file, return nothing');
                var fi = {};
                socket.emit('sendStatus', { files: fi });
                // socket.emit('sendStatus', { files: nothing });
            } else {
                console.log(files.length);
                // socket.emit('sendStatus', { files: files });   
                socket.emit('sendStatus', { files: files }); 
            }
        });
    }

    socket.on('setRoot', function (data){

        currentDir = path.resolve(__dirname ,'../local/' + data.root);
        uploader.dir = currentDir;
        readContent(currentDir);
        

    });

    socket.on('makeDir', function (data) {
        console.log(data.name);
        console.log(uploader.dir);
    

        var upload = uploader.dir + '/' + data.name;

        
        mkdirp(upload, function (err) {
            if (err) console.error(err)
            else {
                currentDir = uploader.dir;
                readContent(currentDir);
                socket.emit('madeDir');
                // socket.emit('sendStatus', { files: fi });
                // console.log('we made a new dir!!');
            }
        });
    });

    socket.on('getStatus', function (data) {
        // fs.readdir(currentDir, function(err, files){  
        //     if(files === null || files == null){
        //         console.log('nothing in the file, return nothing');
        //         var nothing = {};
        //         socket.emit('sendStatus', { files: nothing });
        //     } else {
        //         console.log(files.length);
        //         socket.emit('sendStatus', { files: files });    
        //     }

        readContent(currentDir);
        // socket.emit('sendStatus', { files: fi });

 //       });
        
    });

    socket.on('changeFolder', function (dest){
        
        console.log(currentDir);
        currentDir = currentDir + '/' + dest.loc;
        console.log(currentDir + ' changed!'); 
        uploader.listen(socket);
        uploader.dir = currentDir;
        console.log('current dir - > ' + currentDir + '\n uploader dir - > ' + uploader.dir);
        readContent(currentDir);
    });

    socket.on('goUp', function (dest){
       
        console.log(currentDir);
        var index = currentDir.lastIndexOf('/');
        console.log('the last index is : ' + index);
        var n = currentDir.lastIndexOf('/');

        var newString = currentDir.substring(0, n);
        console.log(newString);
        currentDir = newString;

        uploader.listen(socket);
        uploader.dir = currentDir;

        readContent(currentDir);
    });

    socket.on('deleteFile', function (file){
        var toDelete = currentDir + '/' + file.fileName;
        console.log(toDelete);
       
        fs.unlink(toDelete, function(){
             console.log('we deleted!');
             readContent(currentDir);

        })

    });

    socket.on('deleteFolder', function (folder){
        console.log('le us delete');
        var toDelete = currentDir + '/' + folder.folderName;
        console.log(toDelete);
        fs.readdir(toDelete, function(data){
            console.log(data);
            if(data === undefined || data === null){
                console.log('folder is empty, lets delete');
                fs.rmdir(toDelete, function(){
                    console.log('we deleted!');
                    readContent(currentDir);
                })
            } else {
                console.log('folder is not empty, cant delete');
            }
        });

        // console.log('could have deleted if we wanted!');

    });

    // Make an instance of SocketIOFileUpload and listen on this socket:
    
    //uploader.dir = path.resolve(__dirname ,'../local/hey');
    uploader.listen(socket);
    uploader.on("start", function(event){
        console.log('started');  
        // console.log(event.file.meta.name);

        // uploader.dir = path.resolve(__dirname ,'../local/' + event.file.meta.name);
        
    });
    uploader.on("progress", function(event){
        console.log('progress being made');
    });

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log('saved, now report' + event.file.name);
        readContent(currentDir);
        // socket.emit('sendStatus', { files: fi });

    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });


});
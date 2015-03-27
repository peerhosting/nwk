var express = require('express');
var path = require('path');
var app = express();


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);



app.get('/home', function(req, res) {
  res.end('Hello World!');
});

app.get('/', function (req, res) {
    res.render('index.html');
});



// app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));



// app.listen(process.argv[2]);





// var path = require('path');
// var express = require('express')
// var app = express();

// var server = express(); // better instead
// // server.configure(function(){
// //   server.use('/media', express.static(__dirname + '/media'));
// //   server.use(express.static(__dirname + '/public'));
// // });



// // server.listen(3000);


// // var routes = require('./routes');

// // app.get('/', function (req, res) {
// //   res.render('../index.html');
// // })
// // app.use(express.static(path.join(__dirname, 'system')));


// // app.configure(function() {
// //   app.use(express.static(__dirname + '/system'));
// // });

// // server.listen(3000);

// // app.use(express.static(path.join(__dirname, '')));

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Exaexmple app listening at http://%s:%s', host, port)

// });

// var express = require('express');
// var app = express();
// 

// app.use('/', routes.index);
// // 
// // app.use(app.router);
//  app.get('/', routes.index);

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log('Example app listening at http://%s:%s', host, port);

// 	


//   app.listen(3000, function() { console.log('listening')});

// })
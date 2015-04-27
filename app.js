var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var home = require('./lib/home');
var browse = require('./lib/browse');
var upload = require('./lib/upload');
var navigate = require('./lib/navigate');
// console.log(path.join(__dirname, './local'));
app.use(express.static(path.join(__dirname, './lib/local')));

var ursa = require('ursa');
fs.exists(path.join(__dirname, '.keys/private'), function(sec) {
	if (! sec){
	console.log("generating private & public keys")
	    //var PassPhrase = Math.random().toString(36).substring(128); 
	    // The length of the RSA key, in bits. 
	    //var Bits = 1024; 
	    var keys = ursa.generatePrivateKey();
	    //console.log('keys:', keys);
	    // reconstitute the private key from a base64 encoding
	    var privPem = keys.toPrivatePem('base64');
	    //console.log('privPem:', privPem);
	    var priv = ursa.createPrivateKey(privPem, '', 'base64');
	    // make a public key, to be used for encryption
	    var pubPem = keys.toPublicPem('base64');
	    //console.log('pubPem:', pubPem);
	    var pub = ursa.createPublicKey(pubPem, 'base64');
	    fs.writeFile(path.join(__dirname, '.keys/private'), privPem, function (err) {
		if (err) throw err;
		console.log('wrote new private key');
	    });
	    fs.writeFile(path.join(__dirname, '.keys/public'), pubPem, function (err) {
		if (err) throw err;
		console.log('wrote new public key');
	    });
	}
    else{
	console.log("private key exists");
	fs.exists(path.join(__dirname, '.keys/public'), function(sec) {
	    if (! sec){
		fs.readFile('.keys/private', function (err, data) {
		    if (err) throw err;
		var priv = ursa.createPrivateKey(data, '', 'base64');
		    // make a public key, to be used for encryption
		    var pubPem = priv.toPublicPem('base64');
		    //console.log('pubPem:', pubPem);
		    var pub = ursa.createPublicKey(pubPem, 'base64');
		    fs.writeFile(path.join(__dirname, '.keys/public'), pubPem, function (err) {
			if (err) throw err;
			console.log('wrote new public key');
		    });
		});}
	    else {
		console.log("public key exists");}
	});}
    
});



app.use(home);
app.use(browse);
app.use(upload);
app.use(navigate);

app.listen(3000);

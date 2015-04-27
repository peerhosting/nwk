var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');

var ursa = require('ursa');
if (! fs.existsSync( '.keys/private')) {
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
    fs.writeFileSync('.keys/private', privPem);
    console.log('wrote new private key');
    fs.writeFileSync( '.keys/public', pubPem);
    console.log('wrote new public key');
}  else {
    console.log("private key exists");
    if (! fs.existsSync('.keys/public')) {
	var data = fs.readFileSync('.keys/private', {"encoding":"utf8"});
	var priv = ursa.createPrivateKey(data, '', 'base64');
	// make a public key, to be used for encryption
	var pubPem = priv.toPublicPem('base64');
	//console.log('pubPem:', pubPem);
	var pub = ursa.createPublicKey(pubPem, 'base64');
	fs.writeFileSync('.keys/public', pubPem);
	console.log('wrote new public key');
    }
    else {
	console.log("public key exists");}
}



var home = require('./lib/home');
var browse = require('./lib/browse');
var upload = require('./lib/upload');
var navigate = require('./lib/navigate');
// console.log(path.join(__dirname, './local'));
app.use(express.static(path.join(__dirname, './lib/local')));


app.use(home);
app.use(browse);
app.use(upload);
app.use(navigate);
app.listen(3000);

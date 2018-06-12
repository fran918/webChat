var express = require('express');
var bodyParser = require('body-parser');
var _path = require('path');
var ejs = require('ejs');
var morgan = require('morgan'); 
var proxy = require('express-http-proxy');
var cors = require('cors');
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/test";

var api=require("./api/api.js")

var app = express();

Object.assign = require('object-assign');

var server = require("http").createServer(app);
var io= require('socket.io')(server);  

//MONGODB
/*mongodb.connect(url, function(err, db){
	if(err) throw err;
	console.log("iniciando MONGODB")
	var dbo = db.db("test");
	dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  }); 
})*/
//MONGODB

app.use(morgan("combined"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api',api);

app.set('views', __dirname + '/html')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(_path.join(__dirname , 'html')));


io.on('connection', function (socket) { 
	socket.on('listaMensajes', function (data) {
		console.log(data);
		console.log('-------*---------');
		socket.broadcast.emit('refreshMensajes', { hello: 'world' });
	  
	});
	socket.on('listaUsuarios', function (data) {
		console.log(data);
		console.log('-------*---------');
		socket.broadcast.emit('refreshUsuarios', { hello: 'world' });
	  
	});
	socket.on('escribo', function (data) {
		socket.broadcast.emit('escribiendo', { "id": data });
		socket.emit('escribiendo', { "id": data });
		console.log(data);
		console.log('-------*---------');
	  
	});
  }); 

app.get('/',function(req,res){
 
	res.render('index.html')
});

app.use(function(err, req, res, next){
	console.log(err.stack)
	res.status(500).send("ALGO ANDA MAL!");
});

var port=8000;
var ip="0.0.0.0"
server.listen(port, ip);
console.log('SERVIDOR CORRIENDO EN EL '+ip+':'+port)

module.exports = app;
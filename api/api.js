var express = require("express");
var router = express.Router();
var http = require("http")
const {ObjectId} = require('mongodb');
var mongojs = require('mongojs');

var mongodb = require("mongodb").MongoClient;
var baseDatos="test2"
var url = "mongodb://localhost:27017/"+baseDatos;


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
})
*///MONGODB


router.get('/',function(req,res){
	res.render('index.html')
});

router.post('/add-user',function(req,res){
	var items= req.body;
	//console.log(items)
	mongodb.connect(url, function(err, db){
	if(err) throw err;
	//console.log("iniciando MONGODB") 
	 var dbo = db.db(baseDatos);
	 dbo.collection("users").insertOne(items,function(err, respuesta){
		 if(err) throw err;
		// console.log("se añadio un usuario");
			res.json({status:200, message:"fue creado con exito"})
		db.close();
	 })
	 
})
	//res.render('index.html')
});

router.post('/add-mensaje',function(req,res){
	var items= req.body;
	//console.log(items)
	mongodb.connect(url, function(err, db){
	if(err) throw err; 
	 var dbo = db.db(baseDatos);
	 dbo.collection("mensajes").insertOne(items,function(err, respuesta){
		 if(err) throw err;
		 //console.log("se añadio un mensaje");
			res.json({status:200, message:"fue creado con exito"})
		db.close();
	 })
	 
})
	//res.render('index.html')
});

router.get('/get-users',function(req,res){
	mongodb.connect(url, function(err, db){
	if(err) throw err;
	//console.log("iniciando MONGODB")
	var dbo=db.db(baseDatos);
	dbo.collection("users").find({}).toArray(function(err,users){
		//console.log(users)
	//	console.log(res.json(users))
		res.json(users)
	})
})
})

router.get('/get-mensajes',function(req,res){
	mongodb.connect(url, function(err, db){
	if(err) throw err;
	//console.log("iniciando MONGODB")
	var dbo=db.db(baseDatos);
	dbo.collection("mensajes").find({}).toArray(function(err,mensajes){
		//console.log(mensajes)
		res.json(mensajes)
	})
})
})

router.post('/edit-user/:id',function(req,res){
	var items= req.body;
	var id=req.params.id;
	console.log(items)
	mongodb.connect(url, function(err, db){
	if(err) throw err;
	console.log("iniciando MONGODB") 
	 var dbo = db.db(baseDatos);
	 dbo.collection("users").update({_id:mongojs.ObjectId(id)},items,function(err, respuesta){
		 if(err) throw err;
		 console.log("se edito un usuario");
			res.json({status:200, message:"fue creado con exito"})
		db.close();
	 })
	 
}) 
}) 

router.post('/delete-user/:id',function(req,res){
	var items= req.body;
	var id=req.params.id;
	console.log(items)
	mongodb.connect(url, function(err, db){
	if(err) throw err;
	console.log("iniciando MONGODB") 
	 var dbo = db.db(baseDatos);
	 dbo.collection("users").remove({_id:mongojs.ObjectId(id)},items,function(err, respuesta){
		 if(err) throw err;
		 console.log("se edito un usuario");
			res.json({status:200, message:"fue creado con exito"})
		db.close();
	 })
	 
}) 
});







module.exports=router;








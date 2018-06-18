 
/*
	var socket = io.connect('http://localhost:8000/');
  socket.emit("listaUsuarios","FRAN");
  socket.on('listaUsuarios2', function (data) {
	  console.log(data)
   // socket.emit('hi!');
  });*/
  
  
	//var usuarios=["pepe", "juan", "jose", "luis"];
	var usuarios=[];
	var miUsuario="";
	var miId="";
	
	refreshUsuarios=function(){
		$.get("http://localhost:8000/api/get-users", function(data, status){
           //console.log(data);
		   usuarios=data; 
	listaUsuarios(); 
        });
	}
	
	listaUsuarios=function(){
	document.getElementById("usuarios").innerHTML="";
	for(var i=0;i< usuarios.length; i++){
	if(usuarios[i].nickname == miUsuario){
		miId=usuarios[i]._id;
	document.getElementById("usuarios").innerHTML+="<li>YO - "+usuarios[i].nickname+"</li>";}
	else{
	document.getElementById("usuarios").innerHTML+="<li>"+usuarios[i].nickname+"</li>";
	}
	}
	}
	listaUsuarios();
	
	var escribiendo=false;
	escribiendoUsuario=function(id){ 
	document.getElementById("usuarios").innerHTML="";
	for(var i=0;i< usuarios.length; i++){
	if(id == usuarios[i]._id){
	if(usuarios[i]._id == miId){
	document.getElementById("usuarios").innerHTML+="<li>YO - "+usuarios[i].nickname+" escribiendo...</li>";}
	else{
	document.getElementById("usuarios").innerHTML+="<li>"+usuarios[i].nickname+" escribiendo...</li>";
	}
	}else{
	if(usuarios[i]._id == miId){
	document.getElementById("usuarios").innerHTML+="<li>YO - "+usuarios[i].nickname+"</li>";}
	else{
	document.getElementById("usuarios").innerHTML+="<li>"+usuarios[i].nickname+"</li>";
	}
	}
	}
	escribiendo=true;
	setTimeout(function(){
		escribiendo=false;
		},1500)
	}
	
	escribo=function(){
		   socket.emit("escribo",miId);
	}
	
	addUsuario=function(){
	var nickname=document.getElementById("miUsuario").value.toLowerCase();
	//alert(nickname)
	$.get("http://localhost:8000/api/get-users", function(data, status){
		
		usuarios=data
		console.log(data)
	var existe=false;
	for(var i=0;i< usuarios.length; i++){
	if((usuarios[i].nickname == nickname) || (nickname == '')){
		existe=true;
	}
	}
	if((existe == false) && (usuarios.length < 10)){
	$.post("http://localhost:8000/api/add-user",{nickname:nickname, status:true} ,function(data, status){
           console.log(data);
		$.get("http://localhost:8000/api/get-users", function(data, status){
           //console.log(data);
		   usuarios=data; 
	listaUsuarios(); 
        });
        });
	miUsuario=nickname;
	
	document.getElementById("ingresar").style.display = "none";
	document.getElementById("salaChat").style.display = "block";
	$('#exampleModal').modal('hide');
	
	var mensaje="Se acaba de conectar.";
	//alert(nickname)
	var msj={"usuario":" "+nickname, "mensaje":mensaje}
	
	$.post("http://localhost:8000/api/add-mensaje",msj ,function(data, status){
           //console.log(data);
	listaMensajes();
	socket.emit("listaMensajes",msj);
		   socket.emit("listaUsuarios",msj);
        });
	
	}else{
		alert("por favor cambia tu nickname")
	}
        });
	}
	
	removeUsuario=function(){
	 
	 document.getElementById("miUsuario").value='';
	/*for(var i=0;i< usuarios.length; i++){
	if((usuarios[i] == miUsuario) ){
		//splice
		usuarios.splice(i, 1);
		break;//parar el for
	}
	}*/
	$.post("http://localhost:8000/api/delete-user/"+miId,{nickname:"mar", status:false} ,function(data, status){
           //console.log(data);
	document.getElementById("ingresar").style.display = "block";
	document.getElementById("salaChat").style.display = "none";
	
	var mensaje="Se acaba de desconectar.";
	var msj={"usuario":" "+miUsuario, "mensaje":mensaje}
	miUsuario="";
	miId="";
	$.post("http://localhost:8000/api/add-mensaje",msj ,function(data, status){
           //console.log(data);
	listaMensajes();
	socket.emit("listaMensajes",msj);
		   socket.emit("listaUsuarios",msj);
	
	
	listaUsuarios(); 
        });
	 
        });
	}
	var mensajes=[];
	
	listaMensajes=function(){
	
	$.get("http://localhost:8000/api/get-mensajes", function(data, status){
		if(data && mensajes){
		document.getElementById("mensajes").innerHTML="";
           //console.log(data);
		   mensajes=data.reverse();
	for(var i=0;i< 6; i++){{
		if(mensajes[i])
	if((mensajes[i].usuario == miUsuario)){ 
	document.getElementById("mensajes").innerHTML+='<div class="col-sm-12 text" style="overflow:hidden;"><div class=" mensajes yo"><span>Yo</span> <p class="text">'+mensajes[i].mensaje+ '  </p></div></div>';
	
	}
	else{
	document.getElementById("mensajes").innerHTML+='<div class="col-sm-12 text" ><div class=" mensajes"><span>'+mensajes[i].usuario+'</span> > <p class="text">'+mensajes[i].mensaje+'  </p></div></div>';
	}
	}
	}
	}
        });
	}
	listaMensajes()
	
	
	addMensaje=function(){
	
	var mensaje=document.getElementById("texto").innerHTML; 
	//alert(nickname)
	var msj={"usuario":miUsuario, "mensaje":mensaje}
	
	mensajes.push(msj);
	$.post("http://localhost:8000/api/add-mensaje",msj ,function(data, status){
           //console.log(data);
		   socket.emit("listaMensajes",msj);
		   
		   //
	listaMensajes();
	document.getElementById("texto").innerHTML='';
        });
	}
	eliminar_usuario=function(){
		var id=document.getElementById("idEliminar").value;
		$.post("http://localhost:8000/api/delete-user/"+id,{nickname:"mar", status:false} ,function(data, status){
           alert("eliminado")
        });
	}
	
	pedir=function(){
	/*$.post("http://localhost:8000/api/add-user",{nickname:"ff", status:true} ,function(data, status){
           console.log(data);
        });
	$.get("http://localhost:8000/api/get-users", function(data, status){
           console.log(data);
        });*/
/*		
		$.post("http://localhost:8000/api/edit-user/5b1816ff2dcba618ac43ecd8",{nickname:"mar", status:false} ,function(data, status){
           console.log(data);
        });*//*
		$.post("http://localhost:8000/api/delete-user/5b1bf5b0bdd8143308753346",{nickname:"mar", status:false} ,function(data, status){
           console.log(data);
        });*/
		
		$.get("http://localhost:8000/api/get-users", function(data, status){
           //console.log(data);
        });
	}
	
	
	
var socket = io('http://localhost:8000');
 
socket.on('refreshMensajes', function (data) {
  console.log(data); 
  listaMensajes();
});
socket.on('refreshUsuarios', function (data) {
  console.log(data); 
  refreshUsuarios();
});
socket.on('escribiendo', function (data) {
  
		escribiendoUsuario(data.id)
		setTimeout(function(){
		if(escribiendo==false){listaUsuarios();}
		},2000)
});

socket.on('desconectar', function (data) {
var nickname=document.getElementById("miUsuario").value.toLowerCase();
$.post("http://localhost:8000/api/add-user",{nickname:nickname, status:true} ,function(data, status){
           console.log(data);
		$.get("http://localhost:8000/api/get-users", function(data, status){
			listaUsuarios(); 
  refreshUsuarios();
        });
        });
 
});
  
var empleados = [{id:'1234',nombre:'Juan',apellido:'Pirulo',email:'pirulo@gmail.com'},
{id:'1235',nombre:'Gabriel',apellido:'Batistuta',email:'batigol@gmail.com'},
{id:'1236',nombre:'Ricardo',apellido:'Gimenez',email:'ricardo@gmail.com'},
{id:'1237',nombre:'Ramon',apellido:'Alvarez',email:'ramon@gmail.com'},
{id:'1238',nombre:'Roberto',apellido:'Mondongo',email:'roberto@gmail.com'}];
var tableUI = document.getElementById("listaEmpleados");
var tbTableUI = document.getElementById("tbTable");

var getDataItem;
var getDataItemID;
var inputNombre = document.querySelector('#modal-nombre');
var inputApellido = document.querySelector('#modal-apellido');
var inputEmail = document.querySelector('#modal-email');

var guardado;


init ();

function init(){

	guardado = localStorage.getItem('datos');

 	if (guardado !== null && guardado !== undefined){
 		getData(JSON.parse(guardado));
 		empleados = JSON.parse(guardado);
 	} else { 	
 		getData(empleados); 
 	}


}

function getData (empleados) {



	for (var i = 0; i < empleados.length; i++) {
 		tbTableUI.innerHTML += '<tr id="'+empleados[i].id+'"><td>'+empleados[i].nombre+'</td><td>'+empleados[i].apellido+'</td><td>'+empleados[i].email+'</td><td><button class="btn btn-danger">Delete</button><button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" style="margin-left: 10px">Details</button></td></tr>';
	}
	
	//Acciones boton 
	var btInfos = document.querySelectorAll('button.btn.btn-info');

	for(var i = 0; i<btInfos.length; i++) {
		btInfos[i].addEventListener('click', function(){ 
			getDataItem = this.parentNode.parentNode;
			getDataItemID = getDataItem.id;
			//console.log("id:" + getDataItem.id)
			//console.log(empleados.findIndex(getDataItem.id))
			var index = empleados.map(function(o) { return o.id; }).indexOf(getDataItem.id);
			console.log(index);
			console.log(empleados[index]);
			inputNombre.value = empleados[index].nombre;
			inputApellido.value = empleados[index].apellido;
			inputEmail.value = empleados[index].email;
			localStorage.setItem('datos', JSON.stringify(empleados));

		});

	}		  	

	var btBorrar = document.querySelectorAll('button.btn.btn-danger');
	for(var i = 0; i<btBorrar.length; i++) {
		btBorrar[i].addEventListener('click', function(){ 
			borrarItem(this.parentNode.parentNode.rowIndex)
		});
	}	


}

var btModificar = document.querySelector("#btModificar");
btModificar.addEventListener('click',function(){

		var index = empleados.map(function(o) { return o.id; }).indexOf(getDataItemID);
		if(index != null){
		empleados[index].nombre = inputNombre.value;
		empleados[index].apellido = inputApellido.value;
		empleados[index].email = inputEmail.value;
		localStorage.setItem('datos', JSON.stringify(empleados));

		//console.log("nombre: " + empleados[index].nombre);
		//console.log("nombre campo: "+ inputNombre.value);
		tablaReset ("#listaEmpleados tr");
		getData (empleados);
	}
})

function getItemByID (id){
	empleados.findIndex(x => x.id === id)
}		  	


function borrarItem (id) {
	var idSplice = id-1;
	
	//borrarBase(idSplice);
	empleados.splice(idSplice,1);

	tablaReset ("#listaEmpleados tr");

	localStorage.setItem('datos', JSON.stringify(empleados));

 	//console.log('objetoObtenidoD: ', JSON.parse(guardado));

	//getData (JSON.parse(guardado));

	getData (empleados);
}

function tablaReset (elemento){

	var elem = document.querySelectorAll(elemento);
	
	for (var i = 1; i < elem.length; i++) {
		elem[i].parentNode.removeChild(elem[i])
	}
}



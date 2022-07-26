var tbody=document.getElementById('tbody');
var PuntosDeInteres=[];
var IdModificarPuntoDeInteres;
var main=document.getElementById('main');
var InformacionPuntoDeInteres;
function CargarFormularioPuntoDeInteres(){
  let contacto='"'+`[${$('#TelefonoPuntoDeInteres').val()},${$('#CelularPuntoDeInteres').val()},${$('#FacebookPuntoDeInteres').val()},${$('#InstagramPuntoDeInteres').val()}]`+'"';
  let horario='"'+`[${$('#HoraDeApertura').val()},${$('#HoraDeCierre').val()}]`+'"';
  console.log(contacto);
  console.log(horario);
  InformacionPuntoDeInteres={
          Nombre:$('#NombrePuntoDeInteres').val(),
          Departamento:$('#DepartamentoPuntoDeInteres').val(),
          Ciudad:$('#CiudadPuntoDeInteres').val(),
          Direccion:$('#DireccionPuntoDeInteres').val(),
          Contacto:contacto,
          Horario:horario,
          Descripcion:$('#DescripcionPuntoDeInteres').val(),
          Imagen:$('#Imagen').val()
  }
  JSON.stringify(InformacionPuntoDeInteres);
  console.log(InformacionPuntoDeInteres);
}
//ALTA *******************************************************************************************
$('#btnRegistrarPuntosInteres').click(function (e) { 
  e.preventDefault();
  let contacto='"'+`[${$('#TelefonoPuntoDeInteres').val()},${$('#CelularPuntoDeInteres').val()},${$('#FacebookPuntoDeInteres').val()},${$('#InstagramPuntoDeInteres').val()}]`+'"';
  let horario='"'+`[${$('#HoraDeApertura').val()},${$('#HoraDeCierre').val()}]`+'"';
  console.log(contacto);
  console.log(horario);
  InformacionPuntoDeInteres={
          Nombre:$('#NombrePuntoDeInteres').val(),
          Departamento:$('#DepartamentoPuntoDeInteres').val(),
          Ciudad:$('#CiudadPuntoDeInteres').val(),
          Direccion:$('#DireccionPuntoDeInteres').val(),
          Contacto:contacto,
          Horario:horario,
          Descripcion:$('#DescripcionPuntoDeInteres').val(),
          Imagen:$('#Imagen').val()
  }
  JSON.stringify(InformacionPuntoDeInteres);
  console.log(InformacionPuntoDeInteres);
  AltaDePuntoDeInteres(InformacionPuntoDeInteres);
});

function AltaDePuntoDeInteres(InformacionPuntoDeInteres){
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type:'POST',
    dataType: 'json',
    data:InformacionPuntoDeInteres
}).done(function(data){
  console.log(data);
       alert('Se registro correctamente');
       $('#NombrePuntoDeInteres').val('');
       $('#DepartamentoPuntoDeInteres').val('');
       $('#CiudadPuntoDeInteres').val('');
       $('#DireccionPuntoDeInteres').val('');
       $('#ContactoPuntoDeInteres').val('');
       $('#HorarioPuntoDeInteres').val('');
       $('#DescripcionPuntoDeInteres').val('');    
}).fail( function( jqXHR, textStatus, errorThrown ) {

if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});
}
function AltaDeServicioEscencial(){
  //AltaDePuntoDeInteres(InformacionPuntoDeInteres);
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type:'POST',
    dataType: 'json',
    data:{Tipo:$('#TipoDeServicioEsencial').val()}
}).done(function(data){
  console.log(data);   
}).fail( function( jqXHR, textStatus, errorThrown ) {

if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});
}
//CONSULTA *******************************************************************************************
function ConsultarPuntosDeInteres(){
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type:'GET',
    dataType: 'json',
}).done(function(data){
  let js=data.puntointeres;
      tbody.innerHTML="";
      for(var i=0; i<js.length; i++){
        tbody.innerHTML=tbody.innerHTML+
        '<tr class="table-active">'+
        '<th scope="row">'+js[i].Nombre+'</th>'+
        '<td>'+js[i].Departamento+'</td>'+
        '<td>'+js[i].Ciudad+'</td>'+
        '<td>'+js[i].Direccion+'</td>'+
        '<td>'+js[i].Contacto+'</td>'+
        '<td>'+js[i].Horario+'</td>'+
        '<td>'+js[i].Descripcion+'</td>'+
        '<td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="EliminarPuntoDeInteres('+js[i].id+');" class="bi bi-trash">viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear ms-3" onclick="CargarModalPuntosDeInteres('+'\''+js[i].id+''+'\','+'\''+js[i].Nombre+''+'\','+'\''+js[i].Departamento+''+'\','+'\''+js[i].Ciudad+''+'\','+'\''+js[i].Direccion+''+'\','+'\''+js[i].Contacto+''+'\','+'\''+js[i].Horario+''+'\','+'\''+js[i].Descripcion+''+'\');" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/></svg></td>'+
        '</tr>';
        let puntointeres={
          id:js[i].id,
          Nombre:js[i].Nombre,
          Departamento:js[i].Departamento,
          Ciudad:js[i].Ciudad,
          Direccion:js[i].Direccion,
          Contacto:js[i].Contacto,
          Horario:js[i].Horario,
          Descripcion:js[i].Descripcion
        }
        PuntosDeInteres.push(puntointeres);
      }  
}).fail( function( jqXHR, textStatus, errorThrown ) {

if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});
}
function PuntosDeInteresDOM(){
  tbody.innerHTML="";
  for(var i=0; i<PuntosDeInteres.length; i++){
    tbody.innerHTML=tbody.innerHTML+`
    <tr class="table-active">
    <th scope="row">${PuntosDeInteres[i].Nombre}</th>
    <td>${PuntosDeInteres[i].Departamento}</td>
    <td>${PuntosDeInteres[i].Ciudad}</td>
    <td>${PuntosDeInteres[i].Direccion}</td>
    <td>${PuntosDeInteres[i].Contacto}</td>
    <td>${PuntosDeInteres[i].Horario}</td>
    <td>${PuntosDeInteres[i].Descripcion}</td>
    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="EliminarPuntoDeInteres();" class="bi bi-trash">viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear ms-3" onclick="CargarModalPuntosDeInteres();" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/></svg></td>
    </tr>
    
    `
  }  
}
function BuscarUnPuntoDeInteres (){
  tbody.innerHTML='';
  for(var i=0; i<PuntosDeInteres.length; i++){
   if($('#txt-buscar').val()==PuntosDeInteres[i].Nombre){
    tbody.innerHTML=tbody.innerHTML+`
    <tr class="table-active">
    <th scope="row">${PuntosDeInteres[i].Nombre}</th>
    <td>${PuntosDeInteres[i].Departamento}</td>
    <td>${PuntosDeInteres[i].Ciudad}</td>
    <td>${PuntosDeInteres[i].Direccion}</td>
    <td>${PuntosDeInteres[i].Contacto}</td>
    <td>${PuntosDeInteres[i].Horario}</td>
    <td>${PuntosDeInteres[i].Descripcion}</td>
    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="EliminarPuntoDeInteres();" class="bi bi-trash">viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear ms-3" onclick="CargarModalPuntosDeInteres();" data-bs-toggle="modal" data-bs-target="#exampleModal" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/></svg></td>
    </tr>
    
    `
   }

  }  
}
//BAJA *******************************************************************************************
function EliminarPuntoDeInteres(id) {
  $.ajax({
    url:`http://127.0.0.1:8000/api/PuntosInteres/${id}`,
    type:'DELETE',
    //method_field:'DELETE',
    dataType: 'json',
}).done(function(data){
    alert(data);
    ConsultarPuntosDeInteres();
}).fail( function( jqXHR, textStatus, errorThrown ) {

if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});  

// const options={
//   method:"PATCH",
//   headers:{
//       "Content-Type":"application/json"
//   },
// };
// const request=fetch('http://127.0.0.1:8000/api/PuntosInteres/14',options);
// request.then(function(response){
//   console.log('funciono')
//   console.log(response);  
// });
}
//MODIFICACION *******************************************************************************************
function CargarModalPuntosDeInteres(id,Nombre,Departamento,Ciudad,Direccion,Contacto,Horario,Descripcion){
$('#NombrePuntoDeInteres').val(Nombre);
$('#DepartamentoPuntoDeInteres').val(Departamento);
$('#CiudadPuntoDeInteres').val(Ciudad);
$('#DireccionPuntoDeInteres').val(Direccion);
$('#ContactoPuntoDeInteres').val(Contacto);
$('#HorarioPuntoDeInteres').val(Horario);
$('#DescripcionPuntoDeInteres').val(Descripcion);
IdModificarPuntoDeInteres=id;
}
function ModificarPuntosDeInteres (id) {
  $.ajax({
    url:`http://127.0.0.1:8000/api/PuntosInteres/${id}`,
    type:'PATCH',
    dataType: 'json',
    data:{
      Nombre:$('#NombrePuntoDeInteres').val(),
      Departamento:$('#DepartamentoPuntoDeInteres').val(),
      Ciudad:$('#CiudadPuntoDeInteres').val(),
      Direccion:$('#DireccionPuntoDeInteres').val(),
      Contacto:$('#ContactoPuntoDeInteres').val(),
      Horario:$('#HorarioPuntoDeInteres').val(),
      Descripcion:$('#DescripcionPuntoDeInteres').val()
    }
}).done(function(data){
    alert(data.respuesta);
    location.reload();
}).fail( function( jqXHR, textStatus, errorThrown ) {

if (jqXHR.status === 0) {

alert('Not connect: Verify Network.');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('Time out error.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

} else {

alert('Uncaught Error: ' + jqXHR.responseText);

}

});  
}
$('#btnModificarPuntoDeInteres').click(function (e) { 
  e.preventDefault();
  ModificarPuntosDeInteres(IdModificarPuntoDeInteres);
});
function FormularioDeAlojamiento(){
  main.innerHTML='';
  main.innerHTML=`<div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">CONTACTO ALOJAMIENTO</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                        Horario
                      </button>
                    </h2>
                    <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                          </div>
                      
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">CONFORT</h3>
          <div class="mb-3">
              <select class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="1">Hotel</option>
                  <option value="2">Hostel</option>
                  <option value="3">Motel</option>
                  <option value="4">Casa</option>
                  <option value="5">Camping</option>
                  <option value="5">Estancia</option>
                </select>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Costos">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Cantidad de Habitaciones">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Calificaciones">
          </div>
          <div class="mb-3">
             
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Piscina Climatizada
              </label>
          </div>
          <div class="mb-3">
              
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  TV Cable
              </label>
          </div>
          <div class="mb-3">
              
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Wifi
              </label>
          </div>
          <div class="mb-3">
            
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Aire Acondicionado
              </label>
          </div>
          <div class="mb-3">
            
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Baño Privado
              </label>
          </div>
          <div class="mb-3">
             
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Casino
              </label>
          </div>
          <div class="mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Bar
              </label>
          </div>
          <div class="mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Restaurante
              </label>
          </div>
          <div class="mb-3">
              
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Desayuno Incluido
              </label>
          </div>
      </form>
      
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
</div>`
}
function FormularioDeGastronomia(){
  main.innerHTML='';
  main.innerHTML=`
  <div class="row justify-content-center">
                    <div class="col-sm-6 mt-3">
                        <form action="" method="POST">
                            <h3 class="text-center">CONTACTO GASTRONOMIA</h3>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
                            </div>
                            <!--CONTACTO--------------------------------------------------------------------------------------------------->
                            <div class="mb-3">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                                          Contacto
                                        </button>
                                      </h2>
                                      <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                                        <div class="accordion-body">
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                                            </div>
                                            <div class="mb-3 input.input-group">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                  </svg>
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                                            </div>
                                            <div class="mb-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                                  </svg>
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  
                                  </div>
                            </div>
                            <!--HORARIO--------------------------------------------------------------------------------------------------->
                            <div class="mb-3">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                                          Horario
                                        </button>
                                      </h2>
                                      <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                                        <div class="accordion-body">
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                                            </div>
                                        
                                        </div>
                                      </div>
                                    </div>
                                  
                                  </div>
                            </div>
                            <div class="mb-3">
                                <input class="form-control" type="file" id="formFile">
                              </div>
                            <div class="mb-3">
                                <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
                            </div>
                            
                        </form>
                        
                    </div>
                    <!--SEGUNDO FORMULARIO------------------------------------------------------------------------------------------------------------------>
                    <div class="col-sm-6 mt-3">
                        <form action="" method="POST">
                            <h3 class="text-center">ESPECIFICACIONES</h3>
                            <div class="mb-3">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Seleccionar Tipo</option>
                                    <option value="1">Restaurante</option>
                                    <option value="2">Bar</option>
                                    <option value="3">Cerveceria</option>
                                    <option value="4">Comida Rapida</option>
                                    <option value="5">PUB</option>
                                  
                                  </select>
                            </div>
                            <div class="mb-3">
                               
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                <label class="form-check-label" for="flexCheckChecked">
                                    Comida Veggie
                                </label>
                            </div>
                            <div class="mb-3">
                                
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                <label class="form-check-label" for="flexCheckChecked">
                                    Alcohol
                                </label>
                            </div>
                            <div class="mb-3">
                                
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                <label class="form-check-label" for="flexCheckChecked">
                                    Comida
                                </label>
                            </div>
                            <div class="mb-3">
                              
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                <label class="form-check-label" for="flexCheckChecked">
                                    Menu Infantil
                                </label>
                            </div>
                            <div class="mb-3">
                              
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                <label class="form-check-label" for="flexCheckChecked">
                                    Baño Privado
                                </label>
                            </div>
                        </form>
                        
                    </div>
                </div>
                <div class="row mb-3 justify-content-center">
                    <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
                </div>`
}
function FormularioDeActividadesNocturnas(){
  main.innerHTML='';
  main.innerHTML=`
  <div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">Actividades Nocturnas</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                        Horario
                      </button>
                    </h2>
                    <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                          </div>
                      
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">CONFORT</h3>
          <div class="mb-3">
              <select class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="1">Discoteca</option>
                  <option value="2">Casino</option>
                  <option value="3">Pool</option>
                  <option value="4">Cantina</option>
                  <option value="5">Bowling</option>
                </select>
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Costos">
          </div>
          <div class="mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Mayores de Edad
              </label>
          </div>
          <div class="mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Alcohol
              </label>
          </div>
          <div class="mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
              <label class="form-check-label" for="flexCheckChecked">
                  Comida
              </label>
          </div>
      </form>
      
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
</div>`
}
function FormularioDeActivdadesAlAireLibre(){
  main.innerHTML='';
  main.innerHTML=`
  <div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">Actividades al Aire Libre</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                        Horario
                      </button>
                    </h2>
                    <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                          </div>
                      
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">DETALLES</h3>
          <div class="mb-3">
              <select class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="1">Playa</option>
                  <option value="2">Ejercicios</option>
                  <option value="3">Cerro</option>
                  <option value="4">Sierra</option>
                  <option value="5">Reserva</option>
                </select>
          </div>
          <div class="mb-3">
              <h4 class="text-center">Recomendaciones</h4>
              <textarea class="form-control" name="" id="" cols="30" rows="10">
-
-
-
-
-
-
-
-
-
              </textarea>
          </div>
      </form>
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
</div>`
}
function FormularioDeServiciosEscenciales(){
  main.innerHTML='';
  main.innerHTML=`<div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">Servicios Escenciales</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                                          Horario
                                        </button>
                                      </h2>
                                      <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                                        <div class="accordion-body">
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="HoraDeApertura" name="HoraApertura" placeholder="Horario de Apertura">
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" class="form-control" id="HoraDeCierre" name="HoraCierre" placeholder="Horario de Cierre">
                                            </div>
                                        
                                        </div>
                                      </div>
                                    </div>
                                  
                                  </div>
            </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">DETALLES</h3>
          <div class="mb-3">
              <select id="TipoDeServicioEsencial" class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="Hospitales">Hospitales</option>
                  <option value="Farmacias">Farmacias</option>
                  <option value="Cerrajerias">Cerrajerias</option>
                  <option value="Estaciones de Servicio">Estaciones de Servicio</option>
                  <option value="Seccionales">Seccionales</option>
              </select>
          </div>
          
      </form>
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" onclick="AltaDeServicioEscencial();" value="Registrar">
</div>`
}
function FormularioDeEspectaculos(){
  main.innerHTML='';
  main.innerHTML=`<div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">Espectaculos</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                        Horario
                      </button>
                    </h2>
                    <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                          </div>
                      
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">DETALLES</h3>
          <div class="mb-3">
              <select class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="1">Cine</option>
                  <option value="2">Carnaval</option>
                  <option value="3">Teatro</option>
                  <option value="4">Evento Deportivo</option>
              </select>
          </div>
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#artista" aria-expanded="true" aria-controls="collapseOne">
                        Artistas
                      </button>
                    </h2>
                    <div id="artista" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="" name="" placeholder="Artista">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="" name="" placeholder="Artista">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="" name="" placeholder="Artista">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="" name="" placeholder="Artista">
                          </div>                  
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
      </form>
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
</div>`
}
function FormularioDeActividadesInfantiles(){
  main.innerHTML='';
  main.innerHTML=`<div class="row justify-content-center">
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">Actividades Infantiles</h3>
          <div class="mb-3">
              <input type="text" class="form-control" id="NombrePuntoDeInteres" name="NombrePuntoDeInteres"  placeholder="Nombre">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DepartamentoPuntoDeInteres" name="DepartamentoPuntoDeInteres" placeholder="Departamento">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="CiudadPuntoDeInteres" name="CiudadPuntoDeInteres" placeholder="Ciudad">
          </div>
          <div class="mb-3">
              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Direccion">
          </div>
          <!--CONTACTO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#contactos" aria-expanded="true" aria-controls="collapseOne">
                        Contacto
                      </button>
                    </h2>
                    <div id="contactos" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#contactos">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Telefono">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Celular">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                          <div class="mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres">
                          </div>
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <!--HORARIO--------------------------------------------------------------------------------------------------->
          <div class="mb-3">
              <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button form-control" type="button" data-bs-toggle="collapse" data-bs-target="#horarios" aria-expanded="true" aria-controls="collapseOne">
                        Horario
                      </button>
                    </h2>
                    <div id="horarios" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#horarios">
                      <div class="accordion-body">
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Apertura">
                          </div>
                          <div class="mb-3">
                              <input type="text" class="form-control" id="DireccionPuntoDeInteres" name="DireccionPuntoDeInteres" placeholder="Horario Cierre">
                          </div>
                      
                      </div>
                    </div>
                  </div>
                
                </div>
          </div>
          <div class="mb-3">
              <input class="form-control" type="file" id="formFile">
            </div>
          <div class="mb-3">
              <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
          </div>
          
      </form>
      
  </div>
  <!--SEGUNDO FORMULARIO----------------------------------------------------------------------------------->
  <div class="col-sm-6 mt-3">
      <form action="" method="POST">
          <h3 class="text-center">DETALLES</h3>
          <div class="mb-3">
              <select class="form-select" aria-label="Default select example">
                  <option selected>Seleccionar Tipo</option>
                  <option value="1">Circo</option>
                  <option value="2">Calesita</option>
                  <option value="3">Maquinitas</option>
                  <option value="4">Juegos Infantiles</option>
              </select>
          </div>
          
      </form>
  </div>
</div>
<div class="row mb-3 justify-content-center">
  <input type="button" class="w-50 btn btn-primary form-control" id="btnRegistrarPuntosInteres" value="Registrar">
</div>`
}
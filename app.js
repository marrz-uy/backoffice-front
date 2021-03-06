var tbody=document.getElementById('tbody');
var PuntosDeInteres=[];
var IdModificarPuntoDeInteres;
//ALTA *******************************************************************************************
$('#btnRegistrarPuntosInteres').click(function (e) { 
  e.preventDefault();
$.ajax({
      url: 'http://127.0.0.1:8000/api/PuntosInteres',
      type:'POST',
      dataType: 'text',
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
});
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
    console.log(data);
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
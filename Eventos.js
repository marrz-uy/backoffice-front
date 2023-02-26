var InformacionLugar;
var idEvento;
var respuestaHTTP;
var EndPoint='Eventos?page=';
function sendError(errorText){alert(errorText);}
function ErrorHandler(jqXHR, textStatus){
  if (jqXHR.status === 0)  return sendError('Not connect: Verify Network');
  if (jqXHR.status == 404) return sendError('Requested page not found [404]');
  if (jqXHR.status == 500) return sendError('Internal Server Error [500].');
  if (textStatus === 'parsererror') return sendError('Requested JSON parse failed.');
  if (textStatus === 'timeout') return sendError('Time out error.');
  if (textStatus === 'abort') return sendError('Ajax request aborted.');

  return sendError('Uncaught Error: ' + jqXHR.responseText);

}
$('#btnConsultarLugar').click(function (e) { 
    e.preventDefault();
    $('#ModalDeLugares').modal('show');
    $('#mensaje').text('');
    ConsultarPuntosDeInteres('PuntosDeInteres');
    
});
//CONSULTAS----------------------------------------------------------------------------------------------------------------------------------->
function ConsultarPuntosDeInteres(categoria) {
    $.ajax({
      url: `http://127.0.0.1:8000/api/PuntosInteres/${categoria}`,
      type: 'GET',
      dataType: 'json',
    }).done(function (data) {
      var js = data.data;
      console.log(js);
      respuestaHTTP=data;
      pagination(respuestaHTTP,'PuntosInteres/PuntosDeInteres?page=');
      $('#tbody').html('');
      for (var i = 0; i < js.length; i++) {
        if(categoria==='PuntosDeInteres'){
          $('#tbody').append(`<tr class="table-active">
          <th scope="row">${js[i].Nombre}</th>
          <td>${js[i].Departamento}</td>
          <td>${js[i].Ciudad}</td>
          <td>${js[i].Direccion}</td>
          <td>
                <svg onclick="getInputLugarDelEvento('${js[i].id}','${js[i].Nombre}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
          </td>
          </tr>`);
         
        }
        
      }
      
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarEventos() {
  $('#txt-buscar').val('');
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    console.log(js);
    $('#TablaEventos').html('');
    for (var i = 0; i < js.length; i++) {
      $('#TablaEventos').append(`<tr class="table-active">
      <th scope="row">${js[i].NombreEvento}</th>
      <td>${js[i].FechaInicio}</td>
      <td>${js[i].HoraInicio}</td>
      <td>${js[i].TipoEvento}</td>
      <td><i onclick="EliminarEvento(${js[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${js[i].Eventos_id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
    }
    respuestaHTTP=data;
    pagination(respuestaHTTP,EndPoint);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarEvento(id){
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'GET',
    dataType: 'json',
    data:{
      Eventos_id:id,
      Opcion:'Unico'
    }
  }).done(function (data) {
    console.log(data[0]);
    return respuestaHTTP=data[0];
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function BuscarEventoPorNombre(){
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'GET',
    dataType: 'json',
    data:{
      "Opcion":"BusquedaPorNombre",
      "Nombre":$('#txt-buscar').val()
    }
  }).done(function (data) {
    console.log(data);
    if($('#txt-buscar').val()===''){
      return ConsultarEventos();
    }
    if(data.Mensaje==='No hubo resultado'){
      
      Avisos(data.Mensaje);
      return ConsultarEventos();
    }
    $('#TablaEventos').html('');
    $('#TablaEventos').append(`<tr class="table-active">
      <th scope="row">${data[0].NombreEvento}</th>
      <td>${data[0].FechaInicio}</td>
      <td>${data[0].HoraInicio}</td>
      <td>${data[0].TipoEvento}</td>
      <td><i onclick="EliminarEvento(${data[0].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${data[0].Eventos_id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
//ALTAS--------------------------------------------------------------------------------------------------------------------------------------->
function RegistrarEvento(InformacionDelEvento){
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'POST',
    dataType: 'json',
    data:InformacionDelEvento
  }).done(function (data) {
    alert(data.respuesta);
    CleanInput();
    location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnRegistrarEvento').click(function (e) { 
  e.preventDefault();
  getInputEvento();
  RegistrarEvento(InformacionDelEvento);
});
//BAJAS------------------------------------------------------------------------------------------------------------------------------------>
function EliminarEvento(id) {
  $('#ModalConsultaEvento').modal('show');
  $('#btnEliminarEvento').click(function (e) { 
    $.ajax({
      url: `http://127.0.0.1:8000/api/Eventos/${id}`,
      type: 'DELETE',
      dataType: 'json',
    }).done(function (data) {
      console.log(data);
      alert(data.respuesta);
      location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  });

}
//MODIFICACIONES---------------------------------------------------------------------------------------------------------------------------->
function CargarModalEvento(id){
  idEvento=id;
  $('#ModalDeEventos').modal('show');
  CleanInput();
  $('#mensaje').text('');
  ConsultarEvento(id);
  $('#divBotonImagen').append(`<input onclick="NuevaImagen(${id});" type="button" class="btn btn-success" value="Agregar Imagen">`);
  setTimeout(function(){
    setInputEvento(respuestaHTTP.NombreEvento,'',respuestaHTTP.LugarDeVentaDeEntradas,respuestaHTTP.FechaInicio,respuestaHTTP.FechaFin,respuestaHTTP.HoraInicio,respuestaHTTP.HoraFin,respuestaHTTP.TipoEvento)
    getInputLugarDelEvento(respuestaHTTP.puntosinteres_id,'');
    ConsultarUnPuntoDeInteres(respuestaHTTP.puntosinteres_id,'PuntosDeInteres','Unico');
    setTimeout(function(){console.log($('#LugarDelEvento').val(respuestaHTTP.Nombre))},1000);
  },1000);

}
function ModificarEvento(InformacionDelEvento,id){
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos/${id}`,
    type: 'PATCH',
    dataType: 'json',
    data:InformacionDelEvento
  }).done(function (data) {
    alert(data.respuesta);
    CleanInput();
    location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnModificarEvento').click(function (e) { 
  e.preventDefault();
  getInputEvento();
  ModificarEvento(InformacionDelEvento,idEvento);
});
//AUXILIARES---------------------------------------------------------------------------------------------------------------------------------->
function pagination(respuestaHTTP,EndPoint) {
  $('#pagination').html('');
  $('#pagination').append(`<li class="page-item"><a class="page-link" href="#">Anterior</a></li>`);  
  for(i=respuestaHTTP.current_page;i<=respuestaHTTP.last_page;i++){
  $('#pagination').append(`<li onclick="ConsultarPorPagina('${EndPoint}','${i}')" class="page-item"><a class="page-link" href="#">${i}</a></li>`);
  
}
$('#pagination').append(`<li onclick="ConsultarPorPagina('${EndPoint}','${respuestaHTTP.current_page+1}');" class="page-item"><a class="page-link" href="#">Siguiente</a></li>`);
  }
  function ConsultarPorPagina(EndPoint,Pagina){
    $.ajax({
      url: `http://127.0.0.1:8000/api/${EndPoint}${Pagina}`,
      type: 'GET',
      dataType: 'json',
    }).done(function (data) {
      var js = data.data;
      console.log(data);
      console.log(js);
      $('#TablaEventos').html('');
      for (var i = 0; i < js.length; i++) {
        $('#TablaEventos').append(`<tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].FechaInicio}</td>
        <td>${js[i].HoraInicio}</td>
        <td>${js[i].Tipo}</td>
        <td><i onclick="EliminarEvento(${js[i].id});" class="bi bi-trash" ></i><i onclick="CargarModalEvento(${js[i].id});" class="bi bi-gear"></i></td>
        </tr>`);
      }
      // respuestaHTTP=data;
      // pagination(respuestaHTTP);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  }
  function getInputLugarDelEvento(id,nombre){
    InformacionLugar = {
        id: id,
        Nombre: nombre,
      }
      JSON.stringify(InformacionLugar);
      $('#LugarDelEvento').val(nombre);
      //$('#mensaje').text('Se agrego correctamente');
      return InformacionLugar;
}
function getInputEvento(){
  InformacionDelEvento = {
    NombreEvento:$('#NombreDelEvento').val(),
    LugarDelEvento:InformacionLugar.id,
    LugarDeVentaDeEntradas:$('#LugarDeVentaDeEntradas').val(),
    FechaInicio:$('#FechaDeApertura').val(),
    FechaFin:$('#FechaDeCierre').val(),
    HoraInicio:$('#HoraDeApertura').val(),
    HoraFin:$('#HoraDeCierre').val(),
    TipoDeEvento:$('#TipoDeEvento').val()
  }
  return JSON.stringify(InformacionDelEvento);
}
function setInputEvento(Nombre,LugarDelEvento,LugarDeVentaDeEntradas,FechaInicio,FechaFin,HoraInicio,HoraFin,TipoDeEvento) {
  
  $('#NombreDelEvento').val(Nombre);
  $('#LugarDelEvento').val(LugarDelEvento);
  $('#LugarDeVentaDeEntradas').val(LugarDeVentaDeEntradas);
  $('#FechaDeApertura').val(FechaInicio);
  $('#FechaDeCierre').val(FechaFin);
  $('#HoraDeApertura').val(HoraInicio);
  $('#HoraDeCierre').val(HoraFin);
  $('#TipoDeEvento').val(TipoDeEvento);  
  }
function CleanInput() {
    $('#NombreDelEvento').val('');
    $('#LugarDeVentaDeEntradas').val('');
    $('#FechaDeApertura').val('');
    $('#FechaDeCierre').val('');
    $('#HoraDeApertura').val('');
    $('#HoraDeCierre').val('');
    $('#TipoDeEvento').val('');  
}
function Avisos(mensaje){
  $('#ModalDeAviso').modal('show');
  $('#Modal-Mensaje').text(mensaje);
}
var InformacionLugar;
var idEvento;
var respuestaHTTP;
var EndPoint='Eventos?page=';
var id;
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
      console.log(respuestaHTTP);
      
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
      pagination_lugares(respuestaHTTP);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function BuscarUnPuntoDeInteres(){
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/PuntosDeInteres`,
    type: 'GET',
    dataType: 'json',
    data:{
      "Opcion":"BusquedaPorNombre",
      "Nombre":$('#txt-buscar-lugares').val()
    }
  }).done(function (data) {
    console.log(data);
    if($('#txt-buscar-lugares').val()===''){
      return ConsultarPuntosDeInteres('PuntosDeInteres');
    }
    if(data.Mensaje==='No hubo resultado'){
      console.log(data.Mensaje);
      Avisos(data.Mensaje);
      ConsultarPuntosDeInteres('PuntosDeInteres');
    }
      mostrarPunto(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function mostrarPunto(datos){
  console.log(datos);
  $('#tbody').html('');
  for(i=0;i<datos.length;i++){
    $('#tbody').append(`<tr class="table-active">
          <th scope="row">${datos[i].Nombre}</th>
          <td>${datos[i].Departamento}</td>
          <td>${datos[i].Ciudad}</td>
          <td>${datos[i].Direccion}</td>
          <td>
                <svg onclick="getInputLugarDelEvento('${datos[i].id}','${datos[i].Nombre}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
          </td>
          </tr>`);
  }
  
}
function ConsultarEventos() {
  $('#txt-buscar').val('');
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    $('#TablaEventos').html('');
    for (var i = 0; i < js.length; i++) {
      $('#TablaEventos').append(`<tr class="table-active">
      <th scope="row">${js[i].NombreEvento}</th>
      <td>${js[i].FechaInicio}</td>
      <td>${js[i].HoraInicio}</td>
      <td>${js[i].TipoEvento}</td>
      <td class="text-center"><i onclick="EliminarEvento(${js[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${js[i].Eventos_id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
    }
    respuestaHTTP=data;
    pagination(respuestaHTTP);
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
    for(i=0;i<data.length;i++){
      $('#TablaEventos').append(`<tr class="table-active">
      <th scope="row">${data[i].NombreEvento}</th>
      <td>${data[i].FechaInicio}</td>
      <td>${data[i].HoraInicio}</td>
      <td>${data[i].TipoEvento}</td>
      <td><i onclick="EliminarEvento(${data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${data[i].Eventos_id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
    }
    
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
    Avisos(data.respuesta);
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
    CleanInput();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnRegistrarEvento').click(function (e) { 
  e.preventDefault();
  if ($('#NombreDelEvento').val() == '') {
    return $('#NombreDelEvento').addClass('is-invalid');
  }
  if ($('#NombreDelEvento').val() != '') {
    $('#NombreDelEvento').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#LugarDelEvento').val() == '') {
    return $('#LugarDelEvento').addClass('is-invalid');
  }
  if ($('#LugarDelEvento').val() != '') {
    $('#LugarDelEvento').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#LugarDeVentaDeEntradas').val() === 'Ventas de Entradas') {
    return $('#LugarDeVentaDeEntradas').addClass('is-invalid');
  }
  if ($('#LugarDeVentaDeEntradas').val() != 'Ventas de Entradas') {
    $('#LugarDeVentaDeEntradas').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#FechaDeApertura').val() == '') {
     $('#fechas').addClass('show');
     return $('#FechaDeApertura').addClass('is-invalid');
  }
  if ($('#FechaDeApertura').val() != '') {
    $('#FechaDeApertura').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#FechaDeCierre').val() == '') {
    $('#fechas').addClass('show');
    return $('#FechaDeCierre').addClass('is-invalid');
 }
 if ($('#FechaDeCierre').val() != '') {
   $('#FechaDeCierre').removeClass('is-invalid').addClass('is-valid');
 }

 if ($('#HoraDeApertura').val() == '') {
  $('#horarios').addClass('show');
  return $('#HoraDeApertura').addClass('is-invalid');
}
if ($('#HoraDeApertura').val() != '') {
 $('#HoraDeApertura').removeClass('is-invalid').addClass('is-valid');
}
if ($('#TipoDeEvento').val() == '') {
  return $('#TipoDeEvento').addClass('is-invalid');
}
if ($('#TipoDeEvento').val() != '') {
 $('#TipoDeEvento').removeClass('is-invalid').addClass('is-valid');
}
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
      data:{"Opcion":"EliminarEvento"},
      dataType: 'json',
    }).done(function (data) {
      console.log(data);
      Avisos(data.respuesta);
      $('#BotonAceptarModalAviso').removeAttr('onclick');
      $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  });

}
//MODIFICACIONES---------------------------------------------------------------------------------------------------------------------------->
function CargarModalEvento(id){
  idEvento=id;
  $('#ModalDeEventos').modal('show');
  $('#divBotonImagen').html('');
  CleanInput();
  
  ConsultarEvento(id);
  ConsultarImagenes(id);
  $('#divBotonImagen').append(`<input onclick="ModificarImagen(${idEvento});" id="BotonAgregarImagen" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
 setTimeout(function(){
    setInputEvento(respuestaHTTP.NombreEvento,'',respuestaHTTP.LugarDeVentaDeEntradas,respuestaHTTP.FechaInicio,respuestaHTTP.FechaFin,respuestaHTTP.HoraInicio,respuestaHTTP.HoraFin,respuestaHTTP.TipoEvento)
    getInputLugarDelEvento(respuestaHTTP.puntosinteres_id,'');
    $('#mensaje').text('');
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
    Avisos(data.respuesta);
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
    CleanInput();
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnModificarEvento').click(function (e) { 
  e.preventDefault();
  getInputEvento();
  ModificarEvento(InformacionDelEvento,idEvento);
});
//AUXILIARES---------------------------------------------------------------------------------------------------------------------------------->
function pagination(respuestaHTTP) {
  $('#pagination').html('');
  if(respuestaHTTP.last_page==1){
    return $('#pagination').html('');
  }
  if (respuestaHTTP.prev_page_url==null){
   return $('#pagination').append(`<li id='PaginaSiguiente'; onclick="ConsultarPorPagina('${respuestaHTTP.next_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Siguiente</a></li>`);
  }
  if(respuestaHTTP.next_page_url==null){
    return $('#pagination').append(`<li onclick="ConsultarPorPagina('${respuestaHTTP.prev_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Anterior</a></li>`);
  }
  $('#pagination').append(`<li onclick="ConsultarPorPagina('${respuestaHTTP.prev_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Anterior</a></li>`)
  $('#pagination').append(`<li id='PaginaSiguiente'; onclick="ConsultarPorPagina('${respuestaHTTP.next_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Siguiente</a></li>`)
}
function pagination_lugares(respuestaHTTP) {
  $('#pagination_lugares').html('');
  if(respuestaHTTP.last_page==1){
    return $('#pagination_lugares').html('');
  }
  if (respuestaHTTP.prev_page_url==null){
   return $('#pagination_lugares').append(`<li id='PaginaSiguiente'; onclick="ConsultarPorPagina_lugares('${respuestaHTTP.next_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Siguiente</a></li>`);
  }
  if(respuestaHTTP.next_page_url==null){
    return $('#pagination_lugares').append(`<li onclick="ConsultarPorPagina_lugares('${respuestaHTTP.prev_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Anterior</a></li>`);
  }
  $('#pagination_lugares').append(`<li onclick="ConsultarPorPagina_lugares('${respuestaHTTP.prev_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Anterior</a></li>`)
  $('#pagination_lugares').append(`<li id='PaginaSiguiente'; onclick="ConsultarPorPagina_lugares('${respuestaHTTP.next_page_url}');" class="page-item"><a class="page-link" href="#">Pagina Siguiente</a></li>`)
}
function ConsultarPorPagina(UrlPagina){
  $.ajax({
    url:UrlPagina,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    console.log(data);
    console.log(js[0]);
    $('#TablaEventos').html('');
    for (var i = 0; i < js.length; i++) {
      $('#TablaEventos').append(`<tr class="table-active">
      <th scope="row">${js[i].NombreEvento}</th>
      <td>${js[i].FechaInicio}</td>
      <td>${js[i].HoraInicio}</td>
      <td>${js[i].TipoEvento}</td>
      <td><i onclick="EliminarEvento(${js[i].Eventos_id});" class="bi bi-trash" ></i><i onclick="CargarModalEvento(${js[i].Eventos_id});" class="bi bi-gear"></i></td>
      </tr>`);
    }
    $('#TituloCategorias').text(`${localStorage.getItem('Categoria').toUpperCase()} - Página ${data.current_page}`);
    pagination(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarPorPagina_lugares(UrlPagina){
  $.ajax({
    url:UrlPagina,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    console.log(data);
    console.log(js);
    $('#tbody').html('');
    for (var i = 0; i < js.length; i++) {
      console.log(i);
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
    $('#TituloCategorias').text(`${localStorage.getItem('Categoria').toUpperCase()} - Página ${data.current_page}`);
    pagination_lugares(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
  function getInputLugarDelEvento(id,nombre){
    InformacionLugar = {
        id: id,
        Nombre: nombre,
      }
      JSON.stringify(InformacionLugar);
      $('#LugarDelEvento').val(nombre);
      $('#mensaje').text('Se agrego correctamente');
      setTimeout(function(){$('#mensaje').text('')},2000);
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
    TipoEvento:$('#TipoDeEvento').val()
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
//IMAGENES------------------------------------------------------------------------------------------------------------------------------------>
function NuevaImagen(id){
  const formData=new FormData();
  formData.append('file',$('#imagenes')[0].files[0]);
  formData.append('image_description','file');
  formData.append('puntosinteres_id',id);
  $.ajax({
      url: 'http://127.0.0.1:8000/api/cargarImagen',
      type: 'POST',
      data: formData,
      dataType:'json',
      cache:false,
      contentType:false,
      processData:false,
      headers:{'Accept':'*/*','Content-Encoding':'multipart/form-data','Access-Control-Allow-Origin':"*/*"},
    }).done(function (data) {
      $('#imagenes').val('');
      console.log(data);
      $('#ModalDeAviso').modal('show');
      ConsultarImagenes(id);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
    
}
function ModificarImagen(idEvento){
  const formData=new FormData();
  formData.append('file',$('#imagenes')[0].files[0]);
  $.ajax({
      url: `http://127.0.0.1:8000/api/Eventos/${idEvento}`,
      type: 'POST',
      data: formData,
      dataType:'json',
      cache:false,
      contentType:false,
      processData:false,
      headers:{'Accept':'*/*','Content-Encoding':'multipart/form-data','Access-Control-Allow-Origin':"*/*"},
      
    }).done(function (data) {
      console.log(data);
      $('#imagenes').val('');
      $('#ModalDeAviso').modal('show');
      ConsultarImagenes(data.idEvento);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarImagenes(id){
  console.log(id);
  $.ajax({
    url: `http://127.0.0.1:8000/api/Eventos`,
    type: 'GET',
    data:{
      "Opcion":"ImagenEvento",
      "evento_id":id
    },
    dataType:'json',
  }).done(function (data) {
    console.log(data);
    let url=data[0].ImagenEvento;
    $('#imagen-container').html('');
    if(url!=null){
      $('#imagen-container').append(`<div class="tamano">
      <img id="ImagenEvento" class="pointer" onclick="ImagenCompleta('${url}',${id});"
        src="${url}"
        alt="imagen${url}">
      </div>`);
    }
      
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ImagenCompleta(url,id) {
  $('#ModalDeImagenesGrandes').modal('show');
  $('#divImagenGrande').html('');
  $('#divImagenGrande').append(`<input type="button" onclick="EliminarImagenEvento('${id}');" class="btn btn-danger" value="Eliminar">`);  
  $('#divImagenGrande').append(`<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`);
  $('#ImagenCompletaDiv').html('');
  $('#ImagenCompletaDiv').append(`<img src="${url}" alt="imagen${url}">`)
  //"
  }
  function EliminarImagenEvento(id) {
    $('#ModalDeImagenesGrandes').modal('hide');
    $('#ModalConsultaEvento').modal('show');
    $('#btnEliminarEvento').click(function (e) { 
      $.ajax({
        url: `http://127.0.0.1:8000/api/Eventos/${id}`,
        type: 'DELETE',
        data:{"Opcion":"EliminarImagen"},
        dataType: 'json',
      }).done(function (data) {
        console.log(data);
        $('#ModalDeAviso').modal('show');
        $('#ImagenEvento').remove();
        $('#ModalConsultaEvento').modal('hide');
      }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
    });
  
  }
function Arreglos(){
  $('#divBotonImagen').append(`<input onclick="ModificaImagen(${idEvento});" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
}
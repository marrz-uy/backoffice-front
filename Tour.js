const apiUrl='http://127.0.0.1:8000';
var respuestaHTTP;
var puntosdeInteresTour=[];
var InformacionTour={};
var id;
var idTour;
var file;
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
/*ALTA-------------------------------------------------------------------------------------------------------------------------------------- */
function AltaDeTour(){
  puntosdeInteresTour=puntosdeInteresTour.toString();
  InformacionTour.puntosdeInteresTour=puntosdeInteresTour;
  // if ($('#nombreTourPredefinido').val() == '') {
  //   return $('#nombreTourPredefinido').addClass('is-invalid');
  // }
  // if ($('#nombreTourPredefinido').val() != '') {
  //   $('#nombreTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  // }
  // if ($('#horaDeInicioTourPredefinido').val() == '') {
  //   return $('#horaDeInicioTourPredefinido').addClass('is-invalid');
  // }
  // if ($('#horaDeInicioTourPredefinido').val() != '') {
  //   $('#horaDeInicioTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  // }
  // if ($('#descripcionTourPredefinido').val() == '') {
  //   return $('#descripcionTourPredefinido').addClass('is-invalid');
  // }
  // if ($('#descripcionTourPredefinido').val() != '') {
  //   $('#descripcionTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  // }
  // console.log(InformacionTour);
  // if(InformacionTour.puntosdeInteresTour===''){
  //  return Avisos('Debe seleccionar un punto de interes');
  // }
  
  InformacionTour.Opcion="AltaDeTour"
  InformacionTour.imagenTour=file;
  console.log(InformacionTour);
  const formData= new FormData();
  formData.append('imagenTour',file);
  const reader = new FileReader();
      reader.onload = function (event) {
        const contenido = event.target.result;
        const tipoMIME = file.type;

        const blob = new Blob([contenido], { type: tipoMIME });

        // Ahora tienes el objeto Blob, y puedes utilizarlo según tus necesidades
        console.log('Blob creado:', blob);

        // Aquí podrías enviar el blob a un servidor o hacer cualquier otra operación
      };
  fetch(`${apiUrl}/api/tourPredefinido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: InformacionTour
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      // Manipula los datos de respuesta
      console.log(data);
    })
    .catch(error => {
      // Maneja cualquier error de la solicitud
      console.error(error);
    });
}
/*BAJA-------------------------------------------------------------------------------------------------------------------------------------- */
function EliminarTourPredefinido(id){
  $('#ModalConsultaTour').modal('show');
  $('#btnEliminarTour').click(function (e) { 
    e.preventDefault();
    $.ajax({
    url: `${apiUrl}/api/tourPredefinido/${id}`,
    type: 'DELETE',
    data:{Opcion:'EliminarTour'},
    dataType: 'json',
  }).done(function (data) {
   console.log(data.respuesta);
   Avisos(data.respuesta);
   $('#BotonAceptarModalAviso').removeAttr('onclick');
   $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
   ConsultarTour();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  });
  
}
/*MODIFICACION-------------------------------------------------------------------------------------------------------------------------------------- */
function ModificarTourHTTP(){
  
  if ($('#nombreTourPredefinido').val() == '') {
    return $('#nombreTourPredefinido').addClass('is-invalid');
  }
  if ($('#nombreTourPredefinido').val() != '') {
    $('#nombreTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#horaDeInicioTourPredefinido').val() == '') {
    return $('#horaDeInicioTourPredefinido').addClass('is-invalid');
  }
  if ($('#horaDeInicioTourPredefinido').val() != '') {
    $('#horaDeInicioTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#descripcionTourPredefinido').val() == '') {
    return $('#descripcionTourPredefinido').addClass('is-invalid');
  }
  if ($('#descripcionTourPredefinido').val() != '') {
    $('#descripcionTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  if(puntosdeInteresTour.length==0){
   return Avisos('Debe seleccionar un punto de interes');
  }
  $.ajax({
  url: `${apiUrl}/api/tourPredefinido`,
  type: 'PATCH',
  dataType: 'json',
  data:{
    nombreTourPredefinido:InformacionTour.nombreTourPredefinido,
    horaDeInicioTourPredefinido:InformacionTour.horaDeInicioTourPredefinido,
    descripcionTourPredefinido:InformacionTour.descripcionTourPredefinido,
    id:InformacionTour.id,
    puntosdeInteresTour:puntosdeInteresTour.toString()
  }
}).done(function (data) {

    Avisos(data.Message);
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
    //location.reload();
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnModificarTour').click(function (e) { 
e.preventDefault();
modificarPuntosDeInteresTourDG();
ModificarTourHTTP();
});
function modificarPuntosDeInteresTourDG(){
  puntosdeInteresTour=[];
  var lista=$('#tbody-tourPreview').children();
  for(i=0;i<lista.length;i++){puntosdeInteresTour.push(lista[i].id)}
}
/*CONSULTA-------------------------------------------------------------------------------------------------------------------------------------- */
function ConsultarTour() {
  $.ajax({
    url: `${apiUrl}/api/tourPredefinido`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    pagination(data[0]);
      $('#tbody-Tour').html('');
      for(i=0;i<data[0].data.length;i++){
          $('#tbody-Tour').append(`<tr class="table-active">
        <th scope="row">${data[0].data[i].nombreTourPredefinido}</th>
        <td>${data[0].data[i].horaDeInicioTourPredefinido}</td>
        <td>${data[0].data[i].descripcionTourPredefinido}</td>
        <td class="text-center"><i onclick="EliminarTourPredefinido(${data[0].data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarTour(${data[0].data[i].id});" class="bi bi-gear ms-2 pointer"></i></td>
        </tr>`);
      }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarPorPagina(endpoint,pagina) {
$.ajax({
  url: `${apiUrl}/api/tourPredefinido?page=${pagina}`,
  type: 'GET',
  dataType: 'json',
}).done(function (data) {
  console.log(data[0]);
  pagination(data[0]);
    
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarUnSoloTour(id){
$.ajax({
  url: `${apiUrl}/api/tourPredefinido`,
  type: 'GET',
  data:{
    Opcion:"Unico",
    id:id
  },
  dataType: 'json',
}).done(function (data) {
    console.log(data[0]);
    return respuestaHTTP=data[0];
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultaTourHtml() {
  $('#contenido-tour').html('');
  $('#contenido-tour').append(`
  
  <div class="table-responsive mt-3">
  <table class="table table-dark table-hover">
  <thead>
    <tr>
      <th scope="col">Nombre del Tour</th>
      <th scope="col">Hora de Inicio</th>
      <th scope="col">Descripcion</th>  
      <th class="text-center" style="text-align: right;">
          <button type="button" class="btn btn-success float-end">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <a href="./TourAlta.html" class="text-white text-decoration-none ">Agregar nuevo</a>
          </button>
      </th>
    </tr>
  </thead>
  
  <tbody class="table-success" id="tbody-Tour">
    
  </tbody>
  
  </table>
</div>

<div class="row justify-content-center">
                          <div class="col-sm-3">
                              <nav aria-label="Page navigation example">
                                <ul id="pagination" class="pagination">
                                
                                </ul>
                              </nav>
                          </div>
                      </div>`);

ConsultarTour();
$('#div-busqueda').append(`<div class="input-group w-75">
<input type="text" class="form-control" id="txt-buscar" placeholder="Buscar">
<input type="button" onclick="BuscarUnPuntoDeInteres();" id="btn-buscar" class="btn btn-primary" value="Buscar">
                     
</div>`);

}
function ConsultarPuntosDeInteresParaTour(categoria) {
  $.ajax({
    url: `${apiUrl}/api/PuntosInteres/${categoria}`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    respuestaHTTP=data;
    //pagination(respuestaHTTP,'PuntosInteres/PuntosDeInteres?page=');
    $('#tbody').html('');
    for (var i = 0; i < js.length; i++) {
      if(categoria==='PuntosDeInteres'){
        $('#tbody').append(`<tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].Departamento}</td>
       
        <td class="text-center">
              <svg onclick="getDataTour('${js[i].id}','${js[i].Nombre}','${js[i].Departamento}','${js[i].Direccion}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill pointer" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
        </td>
        </tr>`);
       
      }
      
    }
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function BuscarUnPuntoDeInteres(){
  $.ajax({
    url: `${apiUrl}/api/PuntosInteres/PuntosDeInteres`,
    type: 'GET',
    dataType: 'json',
    data:{
      "Opcion":"BusquedaPorNombre",
      "Nombre":$('#txt-buscar').val()
    }
  }).done(function (data) {
    
    if($('#txt-buscar').val()===''){
      return ConsultarPuntosDeInteresParaTour('PuntosDeInteres');
    }
    if(data.Mensaje==='No hubo resultado'){
      Avisos(data.Mensaje);
      ConsultarPuntosDeInteresParaTour('PuntosDeInteres');
    }
      mostrarPunto(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function BuscarTourPorNombre(){
  $.ajax({
    url: `${apiUrl}/api/Eventos`,
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
      <td class="text-center"><i onclick="EliminarEvento(${data[0].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${data[0].Eventos_id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
/*AUXILIARES-------------------------------------------------------------------------------------------------------------------------------------- */
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
function ConsultarPorPagina(UrlPagina){
  $.ajax({
    url:UrlPagina,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    console.log(data[0]);
    console.log(js);
    $('#tbody-Tour').html('');
    for(i=0;i<data[0].data.length;i++){
        $('#tbody-Tour').append(`<tr class="table-active">
      <th scope="row">${data[0].data[i].nombreTourPredefinido}</th>
      <td>${data[0].data[i].horaDeInicioTourPredefinido}</td>
      <td>${data[0].data[i].descripcionTourPredefinido}</td>
      <td class="text-center"><i onclick="EliminarTourPredefinido(${data[0].data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarTour(${data[0].data[i].id});" class="bi bi-gear ms-2 pointer"></i></td>
      </tr>`);
    }
    $('#TituloTablaTour').text(`TOUR PREDEFINIDOS - Página ${data[0].current_page}`);
    pagination(data[0]);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function FormularioTour() {
    $('#contenido-tour').html('');
    $('#contenido-tour').append(`
    <form id="FormularioTourPredefinido" method="POST" enctype="multipart/formdata">
    <br>
    <h3 class="text-center">Nuevo Tour</h3>
    
    <div class="input-group mb-3">
        <input type="text" class="form-control" id="nombreTourPredefinido" placeholder="Nombre del Tour Predefinido" required>
        <span style="color:red;" class="input-group-text" id="basic-addon1">*</span>
        <div id="campoRequerido0" class="ms-2 invalid-feedback">
                El campo es obligatorio
        </div>
    </div>
    
    <div  class="input-group mb-3">
        <input type="text" class="form-control" id="horaDeInicioTourPredefinido" placeholder="Hora de Inicio" required>
        <span style="color:red;" class="input-group-text" id="basic-addon1">*</span>
        <div id="campoRequerido1" class="ms-2 invalid-feedback">
            El campo es obligatorio
  </div>
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="DescripcionPuntoDeInteres" name="DescripcionPuntoDeInteres" rows="3"></textarea>
    </div>
    <div class="row justify-content-center">
    <input type="button" value="Siguiente" id="btnSiguiente-Tour" onclick="prueba();" class="btn mt-3 btn-primary form-control w-50">
    </div>
    
</form>
    `)
}
function botonBusqueda(){
 // $('#divBotonImagen').append(`<input onclick="NuevaImagen(${id});" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
$('#div-busqueda').append(`<div class="input-group w-75">
<input type="text" class="form-control" id="txt-buscar" placeholder="Buscar">
<input type="button" onclick="BuscarUnPuntoDeInteres();" id="btn-buscar" class="btn btn-primary" value="Buscar">
                      
</div>`);

};
function getDataTour(id,Nombre,Departamento,Direccion) {
$('#tbody-tourPreview').append(`
<tr id='${id}' class="table-active">
<th scope="row">${Nombre}</th>
<td>'${Departamento}'</td>
<td>'${Direccion}'</td>
<td class="text-center"><i onclick="removeDataTour('${id}');" class="bi bi-trash pointer" ></i></td>
</tr>
`);
console.log(puntosdeInteresTour);
puntosdeInteresTour.push(id);
}
function removeDataTour(id){
var posicion=puntosdeInteresTour.indexOf(id);
puntosdeInteresTour.splice(posicion,1);
$(`#${id}`).remove();
}
function getInputTour(){
  if ($('#nombreTourPredefinido').val() == '') {
    return $('#nombreTourPredefinido').addClass('is-invalid');
  }
  if ($('#nombreTourPredefinido').val() != '') {
    $('#nombreTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#horaDeInicioTourPredefinido').val() == '') {
    return $('#horaDeInicioTourPredefinido').addClass('is-invalid');
  }
  if ($('#horaDeInicioTourPredefinido').val() != '') {
    $('#horaDeInicioTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#descripcionTourPredefinido').val() == '') {
    return $('#descripcionTourPredefinido').addClass('is-invalid');
  }
  if ($('#descripcionTourPredefinido').val() != '') {
    $('#descripcionTourPredefinido').removeClass('is-invalid').addClass('is-valid');
  }
  InformacionTour={
    nombreTourPredefinido:$('#nombreTourPredefinido').val(),
    horaDeInicioTourPredefinido:$('#horaDeInicioTourPredefinido').val(),
    descripcionTourPredefinido:$('#descripcionTourPredefinido').val(),
    imagenTour:file,
    id:InformacionTour.id
  };

  console.log(InformacionTour);
  $('#titulo-tabla-tour').text(`Preview - ${$('#nombreTourPredefinido').val()}`);
  textoSuccess();
  return InformacionTour;
}
function setInputTour(data){
  $('#nombreTourPredefinido').val(data.nombreTourPredefinido);
  $('#horaDeInicioTourPredefinido').val(data.horaDeInicioTourPredefinido);
  $('#descripcionTourPredefinido').val(data.descripcionTourPredefinido);
  InformacionTour={
    nombreTourPredefinido:data.nombreTourPredefinido,
    horaDeInicioTourPredefinido:data.horaDeInicioTourPredefinido,
    descripcionTourPredefinido:data.descripcionTourPredefinido,
    id:data.id
  };

}
function setItemsInputTour(respuestaHTTP){
  DraggAndDrop();
  puntosdeInteresTour=[];
  console.log(puntosdeInteresTour);
  for(i=0;i<respuestaHTTP.tour_items.length;i++){
    getDataTour(respuestaHTTP.tour_items[i].puntos_interes.id,respuestaHTTP.tour_items[i].puntos_interes.Nombre,respuestaHTTP.tour_items[i].puntos_interes.Departamento,respuestaHTTP.tour_items[i].puntos_interes.Direccion);
  }
}
function mostrarPunto(datos){
  console.log(datos);
  $('#tbody').html('');
  for(i=0;i<datos.length;i++){
  $('#tbody').append(`<tr class="table-active">
  <th scope="row">${datos[i][0].Nombre}</th>
  <td>${datos[i][0].Departamento}</td>
 
  <td>
        <svg onclick="getDataTour('${datos[i][0].id}','${datos[i][0].Nombre}','${datos[i][0].Departamento}','${datos[i][0].Direccion}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
        </svg>
  </td>
  </tr>`);
  }
}
function Avisos(mensaje){
  $('#ModalDeAviso').modal('show');
  $('#Modal-Mensaje').text(mensaje);
}
function textoSuccess() {
  $('#div-mensaje').html('');
  $('#div-mensaje').append('<p class="text-center fs-5 success">Se guardo correctamente</p>');
  setTimeout(function(){$('#div-mensaje').empty();},3000);
}
function CargarTour(id){
  $('#Modal-Tour').modal('show');
  $('#divBotonImagen').html('');
  $('#tbody-tourPreview').html('');
  $('#divBotonImagen').append(`<input onclick="ModificarImagenTour(${id});" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
  ConsultarPuntosDeInteresParaTour('PuntosDeInteres');
  ConsultarUnSoloTour(id);
  setTimeout(function (){
    setInputTour(respuestaHTTP);
    setItemsInputTour(respuestaHTTP)
  },1000);
}
function DraggAndDrop(){
  $(function () {
    $("#tbody-tourPreview").sortable({
        cursor: 'pointer',
        axis: 'y',
        dropOnEmpty: false,
        start: function (e, ui) {
            ui.item.addClass("selected");
        },
        stop: function (e, ui) {
            ui.item.removeClass("selected");
            
        }
  
    });
  });
}
function Arreglos(){
  $('#divBotonImagen').append(`<input onclick="ModificaImagen(${idTour});" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
}
//IMAGENES------------------------------------------------------------------------------------------------------------------------------------>

$('#imagenes').change(function(){
  file=$('#imagenes')[0].files[0];
  function convertirABlob() {
    const archivoInput = document.getElementById('archivoInput');
    
    if (archivoInput.files.length > 0) {
      const file = archivoInput.files[0];
      
      const reader = new FileReader();
      reader.onload = function (event) {
        const contenido = event.target.result;
        const tipoMIME = file.type;

        const blob = new Blob([contenido], { type: tipoMIME });

        // Ahora tienes el objeto Blob, y puedes utilizarlo según tus necesidades
        console.log('Blob creado:', blob);

        // Aquí podrías enviar el blob a un servidor o hacer cualquier otra operación
      };

      reader.readAsArrayBuffer(file);
    }
  }
})
function ModificarImagenTour(idTour){
  const formData=new FormData();
  formData.append('file',$('#imagenes')[0].files[0]);
  formData.append('Opcion','AltaDeImagenTour');
  formData.append('idTour',idTour);
  $.ajax({
      url: `${apiUrl}/api/tourPredefinido`,
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
      ConsultarImagenes(data.idTour);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}

function ImagenCompleta(url,id) {
  $('#ModalDeImagenesGrandes').modal('show');
  $('#divImagenGrande').html('');
  $('#divImagenGrande').append(`<input type="button" onclick="EliminarImagenTour('${id}');" class="btn btn-danger" value="Eliminar">`);  
  $('#divImagenGrande').append(`<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`);
  $('#ImagenCompletaDiv').html('');
  $('#ImagenCompletaDiv').append(`<img src="${url}" alt="<imagen>${url}">`)
  //"
  }
  function EliminarImagenTour(id) {
    $('#ModalDeImagenesGrandes').modal('hide');
    $('#ModalConsulta').modal('show');
    $('#btnEliminarImagenTour').click(function (e) { 
      $.ajax({
        url: `${apiUrl}/api/tourPredefinido/${id}`,
        type: 'DELETE',
        data:{"Opcion":"EliminarImagen"},
        dataType: 'json',
      }).done(function (data) {
        console.log(data);
        $('#ModalDeAviso').modal('show');
        $('#ImagenTour').remove();
        $('#ModalConsulta').modal('hide');
      
      }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
    });
  
  }
 
$('#botonnn').click(function (e) { 
  e.preventDefault();
  enviarImagen();
});
  function enviarImagen() {
    

    const inputImagen = document.getElementById('imagenInput');
    const imagen = inputImagen.files[0];

    enviarImagenFetch(imagen);
}
  function enviarImagenFetch(imagen) {
    const formData = new FormData();
    formData.append('imagen', imagen);

    fetch(`${apiUrl}/api/tourPredefinido`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
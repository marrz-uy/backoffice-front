var respuestaHTTP;
var puntosdeInteresTour=[];
var InformacionTour={};
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
function ConsultarTour() {
    $.ajax({
      url: `http://127.0.0.1:8000/api/tourPredefinido`,
      type: 'GET',
      dataType: 'json',
    }).done(function (data) {
      console.log(data[0]);
      pagination(data[0]);
        $('#tbody-Tour').html('');
        for(i=0;i<data[0].data.length;i++){
            $('#tbody-Tour').append(`<tr class="table-active">
          <th scope="row">${data[0].data[i].nombreTourPredefinido}</th>
          <td>${data[0].data[i].horaDeInicioTourPredefinido}</td>
          <td>${data[0].data[i].descripcionTourPredefinido}</td>
          <td><i onclick="EliminarTourPredefinido(${data[0].data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarTour(${data[0].data[i].id});" class="bi bi-gear ms-2 pointer"></i></td>
          </tr>`);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarPorPagina(endpoint,pagina) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/tourPredefinido?page=${pagina}`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    console.log(data[0]);
    pagination(data[0]);
      $('#tbody-Tour').html('');
      for(i=0;i<data[0].data.length;i++){
          $('#tbody-Tour').append(`<tr class="table-active">
        <th scope="row">${data[0].data[i].nombreTourPredefinido}</th>
        <td>${data[0].data[i].horaDeInicioTourPredefinido}</td>
        <td>${data[0].data[i].descripcionTourPredefinido}</td>
        <td><i onclick="EliminarTourPredefinido(${data[0].data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarTour(${data[0].data[i].id});" class="bi bi-gear ms-2 pointer"></i></td>
        </tr>`);
      }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarUnSoloTour(id){
  $.ajax({
    url: `http://127.0.0.1:8000/api/tourPredefinido`,
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
  function ConsultaTourHtml() {
    $('#contenido-tour').html('');
    $('#contenido-tour').append(`
    
    <div class="table-responsive">
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nombre del Tour</th>
        <th scope="col">Hora de Inicio</th>
        <th scope="col">Descripcion</th>  
        <th>
            <button type="button" class="btn btn-success">
                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                <a href="./TourAlta.html" class="text-white text-decoration-none">Agregar nuevo</a>
            </button>
        </th>
      </tr>
    </thead>
    
    <tbody id="tbody-Tour">
      
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
function botonBusqueda(){
$('#div-busqueda').append(`<div class="input-group w-75">
<input type="text" class="form-control" id="txt-buscar" placeholder="Buscar">
<input type="button" onclick="BuscarUnPuntoDeInteres();" id="btn-buscar" class="btn btn-primary" value="Buscar">
                      
</div>`);
};
function ConsultarPuntosDeInteresParaTour(categoria) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${categoria}`,
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
       
        <td>
              <svg onclick="getDataTour('${js[i].id}','${js[i].Nombre}','${js[i].Departamento}','${js[i].Direccion}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill pointer" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
        </td>
        </tr>`);
       
      }
      
    }
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function getDataTour(id,Nombre,Departamento,Direccion) {
$('#tbody-tourPreview').append(`
<tr id='${id}' class="table-active">
<th scope="row">${Nombre}</th>
<td>'${Departamento}'</td>
<td>'${Direccion}'</td>
<td><i onclick="removeDataTour('${id}');" class="bi bi-trash pointer" ></i></td>
</tr>
`);
puntosdeInteresTour.push(id);
}
function removeDataTour(id){
var posicion=puntosdeInteresTour.indexOf(id);
puntosdeInteresTour.splice(posicion,1);
$(`#${id}`).remove();
}
function modificarPuntosDeInteresTourDG(){
  puntosdeInteresTour=[];
  var lista=$('#tbody-tourPreview').children();
  for(i=0;i<lista.length;i++){puntosdeInteresTour.push(lista[i].id)}
}
function getInputTour(){
  InformacionTour={
    nombreTourPredefinido:$('#nombreTourPredefinido').val(),
    horaDeInicioTourPredefinido:$('#horaDeInicioTourPredefinido').val(),
    descripcionTourPredefinido:$('#descripcionTourPredefinido').val(),
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
function ModificarTourHTTP(){

    $.ajax({
    url: `http://127.0.0.1:8000/api/tourPredefinido`,
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
      alert(data.Message);
      location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnModificarTour').click(function (e) { 
  e.preventDefault();
  modificarPuntosDeInteresTourDG();
  ModificarTourHTTP();
});


function AltaDeTour(){
  puntosdeInteresTour=puntosdeInteresTour.toString();
  InformacionTour.puntosdeInteresTour=puntosdeInteresTour;
  console.log(InformacionTour);
  $.ajax({
    url: `http://127.0.0.1:8000/api/tourPredefinido`,
    type: 'POST',
    dataType: 'json',
    data:InformacionTour
  }).done(function (data) {
      console.log(data.Message);
      alert('Se registro Correctamente');
      location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function EliminarTourPredefinido(id){
  $.ajax({
    url: `http://127.0.0.1:8000/api/tourPredefinido/${id}`,
    type: 'DELETE',
    dataType: 'json',
  }).done(function (data) {
   console.log(data.respuesta);
   Avisos(data.respuesta);
   ConsultarTour();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function BuscarUnPuntoDeInteres(){
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/PuntosDeInteres`,
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
      mostrarPunto(data[0]);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function mostrarPunto(datos){
  $('#tbody').html('');
  $('#tbody').append(`<tr class="table-active">
  <th scope="row">${datos.Nombre}</th>
  <td>${datos.Departamento}</td>
 
  <td>
        <svg onclick="getDataTour('${datos.id}','${datos.Nombre}','${datos.Departamento}','${datos.Direccion}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
        </svg>
  </td>
  </tr>`);
}
function Avisos(mensaje){
  $('#ModalDeAviso').modal('show');
  $('#Modal-Mensaje').text(mensaje);
}
//setTimeout(success(),4000);
function success(){

}
function textoSuccess() {
  $('#div-mensaje').html('');
  $('#div-mensaje').append('<p class="text-center fs-5 success">Se guardo correctamente</p>');
  setTimeout(function(){$('#div-mensaje').empty();},3000);
}
function pagination(respuestaHTTP) {
  $('#pagination').html('');
  $('#pagination').append(`<li class="page-item"><a class="page-link" href="#">Anterior</a></li>`);  
  for(i=respuestaHTTP.current_page;i<=respuestaHTTP.last_page;i++){
  $('#pagination').append(`<li onclick="ConsultarPorPagina('${EndPoint}','${i}');" class="page-item"><a class="page-link" href="#">${i}</a></li>`)
  }
  $('#pagination').append(`<li onclick="ConsultarPuntosDeInteresPaginaSiguiente(2);" class="page-item"><a class="page-link" href="#">Siguiente</a></li>`)
}
function CargarTour(id){
  $('#Modal-Tour').modal('show');
  $('#tbody-tourPreview').html('');
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

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
        data=data[0];
        respuestaHTTP=data[0];
        for(i=0;i<data.length;i++){
            $('#tbody-Tour').append(`<tr class="table-active">
          <th scope="row">${data[i].nombreTourPredefinido}</th>
          <td>${data[i].horaDeInicioTourPredefinido}</td>
          <td>${data[i].descripcionTourPredefinido}</td>
          <td><i onclick="EliminarEvento(${data[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalEvento(${data[i].id});" class="bi bi-gear ms-2 pointer"></i></td>
          </tr>`);
        }
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
    $('#contenido-tour').append(`<div class="table-responsive">
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nombre del Tour</th>
        <th scope="col">Hora de Inicio</th>
        <th scope="col">Descripcion</th>  
        <th>
            <button type="button" class="btn btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
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
 </div>`);
 ConsultarTour();
}
function ConsultarPuntosDeInteresParaTour(categoria) {
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
              <svg onclick="getDataTour('${js[i].id}','${js[i].Nombre}','${js[i].Direccion}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
        </td>
        </tr>`);
       
      }
      
    }
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function getDataTour(id,Nombre,Direccion) {
$('#tbody-tourPreview').append(`
<tr class="table-active">
<th scope="row">${Nombre}</th>
<td>'${Direccion}'</td>
<td><i onclick="EliminarEvento(${id});" class="bi bi-trash pointer" ></i></td>
</tr>
`);
puntosdeInteresTour.push(id);
}
function getInputTour(){
  InformacionTour={
    nombreTourPredefinido:$('#nombreTourPredefinido').val(),
    horaDeInicioTourPredefinido:$('#horaDeInicioTourPredefinido').val(),
    descripcionTourPredefinido:$('#descripcionTourPredefinido').val()
  };
  console.log(InformacionTour);
  return InformacionTour;
}
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
      alert(data.Message);
      location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
var tbody = document.getElementById('tbody');
var main = document.getElementById('main');
var PuntosDeInteres = [];
var IdModificarPuntoDeInteres;
var InformacionPuntoDeInteres;
var InformacionDetalladaPuntoDeInteres;
var boton = document.getElementById('btnRegistrarPuntosInteres');
var categoria = 'PuntosDeInteres';


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
//VALIDACIONES DE FORMULARIOS-------------------------------------------------------------------------------------------->
$(document).ready(function () {ConsultarPuntosDeInteres('PuntosDeInteres');CargarCategoria('PuntosDeInteres');});

//ALTA *******************************************************************************************
$('#btnRegistrarPuntosInteres').click(function (e) {
  e.preventDefault();
  if ($('#NombrePuntoDeInteres').val() == '') {
    alert('El campo nombre no puede estar vacio');
  }
  if ($('#DepartamentoPuntoDeInteres').val() == '') {
    alert('El campo Departamento no puede estar vacio');
  }
  if ($('#CiudadPuntoDeInteres').val() == '') {
    alert('El campo Departamento no puede estar vacio');
  }
  if ($('#DireccionPuntoDeInteres').val() == '') {
    alert('El campo Direccion no puede estar vacio');
  }
  if ($('#TelefonoPuntoDeInteres').val() == '') {
    alert('El campo Telefono no puede estar vacio');
  }
  CargarFormularioPuntoDeInteres();
});
function CargarFormularioPuntoDeInteres() {
  InformacionPuntoDeInteres = {
    Nombre: $('#NombrePuntoDeInteres').val(),
    Departamento: $('#DepartamentoPuntoDeInteres').val(),
    Ciudad: $('#CiudadPuntoDeInteres').val(),
    Direccion: $('#DireccionPuntoDeInteres').val(),
    Telefono: $('#TelefonoPuntoDeInteres').val(),
    Celular: $('#CelularPuntoDeInteres').val(),
    Facebook: $('#FacebookPuntoDeInteres').val(),
    Instagram: $('#InstagramPuntoDeInteres').val(),
    HoraDeApertura: $('#HoraDeApertura').val(),
    HoraDeCierre: $('#HoraDeCierre').val(),
    Descripcion: $('#DescripcionPuntoDeInteres').val(),
    Imagen: $('#Imagen').val(),
    Op: 'PuntoDeInteres'
  }
  JSON.stringify(InformacionPuntoDeInteres);
}
function AltaDePuntoDeInteres(InformacionPuntoDeInteres) {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type: 'POST',
    dataType: 'json',
    data: InformacionPuntoDeInteres
  }).done(function (data) {
    console.log(data);
    alert('Se registro correctamente');
    $('#NombrePuntoDeInteres').val('');
    $('#DepartamentoPuntoDeInteres').val('');
    $('#CiudadPuntoDeInteres').val('');
    $('#DireccionPuntoDeInteres').val('');
    $('#ContactoPuntoDeInteres').val('');
    $('#HorarioPuntoDeInteres').val('');
    $('#DescripcionPuntoDeInteres').val('');
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function AltaDeServicioEscencial() {
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'ServicioEsencial'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeEspectaculos() {
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Artista: $('#NombreDeArtista').val(),
    PrecioEntrada: $('#PrecioEntrada').val(),
    Op: 'Espectaculos'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function RegistrarPuntoDeInteres(InformacionPuntoDeInteres) {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type: 'POST',
    dataType: 'json',
    data: InformacionPuntoDeInteres
  }).done(function (data) {
    console.log(data);
    alert(data.respuesta);
    location.reload();  
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
//CONSULTA ******************************************************* ************************************
function ConsultarPuntosDeInteres(categoria) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${categoria}`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    let js = data.data;
    
    tbody.innerHTML = "";
    for (var i = 0; i < js.length; i++) {
      if(categoria!='PuntosDeInteres'){
        return tbody.innerHTML = tbody.innerHTML +
        '<tr class="table-active">' +
        '<th scope="row">' + js[i].Nombre + '</th>' +
        '<td>' + js[i].Departamento + '</td>' +
        '<td>' + js[i].Ciudad + '</td>' +
        '<td>' + js[i].Direccion + '</td>' +
        '<td><i onclick="EliminarPuntoDeInteres('+js[i].puntosinteres_id+');" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(' + '\'' + js[i].puntosinteres_id + '' + '\',' + '\'' + js[i].Nombre + '' + '\',' + '\'' + js[i].Departamento + '' + '\',' + '\'' + js[i].Ciudad + '' + '\',' + '\'' + js[i].Direccion + '' + '\',' + '\'' + js[i].Telefono + '' + '\',' + '\'' + js[i].HoraDeApertura + '' + '\',' + '\'' + js[i].HoraDeCierre + '' + '\',' + '\'' + js[i].Descripcion + '' + '\');" class="bi bi-gear"></i></td>' +
        '</tr>';
      };
      tbody.innerHTML = tbody.innerHTML +
        '<tr class="table-active">' +
        '<th scope="row">' + js[i].Nombre + '</th>' +
        '<td>' + js[i].Departamento + '</td>' +
        '<td>' + js[i].Ciudad + '</td>' +
        '<td>' + js[i].Direccion + '</td>' +
        '<td><i onclick="EliminarPuntoDeInteres('+js[i].id+');" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(' + '\'' + js[i].id + '' + '\',' + '\'' + js[i].Nombre + '' + '\',' + '\'' + js[i].Departamento + '' + '\',' + '\'' + js[i].Ciudad + '' + '\',' + '\'' + js[i].Direccion + '' + '\',' + '\'' + js[i].Telefono + '' + '\',' + '\'' + js[i].HoraDeApertura + '' + '\',' + '\'' + js[i].HoraDeCierre + '' + '\',' + '\'' + js[i].Descripcion + '' + '\');" class="bi bi-gear"></i></td>' +
        '</tr>';
    }
    if(categoria!='PuntosDeInteres'){
     
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarTelefonosPuntoDeInteres(id) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/Telefonos`,
    type: 'GET',
    dataType: 'json',
    data:{id:id}
  }).done(function (data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].Telefono);
      $(`#TelefonoPuntoDeInteres${i}`).val(data[i].Telefono);
      $(`#TelefonoPuntoDeInteres${i+1}`).val('');
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
//BAJA *******************************************************************************************
function EliminarPuntoDeInteres(id) {
  $('#ModalConsulta').modal('show');
  $('#btnEliminarPunto').click(function (e) { 
    $.ajax({
      url: `http://127.0.0.1:8000/api/PuntosInteres/${id}`,
      type: 'DELETE',
      dataType: 'json',
    }).done(function (data) {
      console.log(data);
      alert(data.respuesta);
      location.reload();
      //ConsultarPuntosDeInteres(categoria);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  });
  $('#btnCerrarConsulta').click(function (e) { 
    e.preventDefault();
    $('#ModalConsulta').modal('hide');
  });

}
//MODIFICACION *******************************************************************************************
function CargarModalPuntosDeInteres(id, Nombre, Departamento, Ciudad, Direccion,HoraDeApertura, HoraDeCierre, Descripcion) {
  console.log(localStorage.getItem('Categoria'));
  $(localStorage.getItem('Categoria')).modal('show');
  ConsultarTelefonosPuntoDeInteres(id);
  $('#NombrePuntoDeInteres').val(Nombre);
  $('#DepartamentoPuntoDeInteres').val(Departamento);
  $('#CiudadPuntoDeInteres').val(Ciudad);
  $('#DireccionPuntoDeInteres').val(Direccion);
  $('#FacebookPuntoDeInteres').val();
  $('#InstagramPuntoDeInteres').val();
  $('#HoraDeApertura').val(HoraDeApertura);
  $('#HoraDeCierre').val(HoraDeCierre);
  $('#DescripcionPuntoDeInteres').val(Descripcion);
  IdModificarPuntoDeInteres = id;
  CargarFormularioPuntoDeInteres();
}

function ModificarPuntosDeInteres(id) {
  console.log(InformacionPuntoDeInteres);
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${id}`,
    type: 'PATCH',
    dataType: 'json',
    data: {
      Nombre: $('#NombrePuntoDeInteres').val(),
      Departamento: $('#DepartamentoPuntoDeInteres').val(),
      Ciudad: $('#CiudadPuntoDeInteres').val(),
      Direccion: $('#DireccionPuntoDeInteres').val(),
      Telefono: $('#TelefonoPuntoDeInteres').val(),
      Celular: $('#CelularPuntoDeInteres').val(),
      Facebook: $('#FacebookPuntoDeInteres').val(),
      Instagram: $('#InstagramPuntoDeInteres').val(),
      HoraDeApertura: $('#HoraDeApertura').val(),
      HoraDeCierre: $('#HoraDeCierre').val(),
      Descripcion: $('#DescripcionPuntoDeInteres').val(),
      Imagen: $('#Imagen').val(),
    }
  }).done(function (data) {
    alert(data.respuesta);
    location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {

    ErrorHandler(jqXHR, textStatus);

  });
}
$('#btnModificarPuntosInteres').click(function (e) {
  e.preventDefault();
  ModificarPuntosDeInteres(IdModificarPuntoDeInteres);
});

function CargarCategoria(categoria){localStorage.setItem('Categoria',`#${categoria}`);};
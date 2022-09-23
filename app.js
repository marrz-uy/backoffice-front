var tbody = document.getElementById('tbody');
var main = document.getElementById('main');
var PuntosDeInteres = [];
var IdModificarPuntoDeInteres;
var InformacionPuntoDeInteres;
var InformacionDetalladaPuntoDeInteres;
var respuestaHTTP;
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
$(document).ready(function (){
  ConsultarPuntosDeInteres('PuntosDeInteres');
  CargarCategoria('PuntosDeInteres');

});

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
    var js = data.data;
    console.log(js);
    tbody.innerHTML = "";
    for (var i = 0; i < js.length; i++) {
      if(categoria!='PuntosDeInteres'){
        console.log(js.length);
        return tbody.innerHTML=tbody.innerHTML+`
        <tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].Departamento}</td>
        <td>${js[i].Ciudad}</td>
        <td>${js[i].Direccion}</td>
        <td><i onclick="EliminarPuntoDeInteres(${js[i].puntosinteres_id});" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].puntosinteres_id},${localStorage.getItem('Categoria')},'Unico');" class="bi bi-gear"></i></td>
        </tr>`;
        
      };
      tbody.innerHTML=tbody.innerHTML+`
        <tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].Departamento}</td>
        <td>${js[i].Ciudad}</td>
        <td>${js[i].Direccion}</td>
        <td><i onclick="EliminarPuntoDeInteres(${js[i].id});" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].id},${localStorage.getItem('Categoria')},'Unico');" class="bi bi-gear"></i></td>
        </tr>`;
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarUnPuntoDeInteres(id,Categoria,Opcion) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${Categoria}`,
    type: 'GET',
    dataType: 'json',
    data:{
      id:id,
      Opcion:Opcion
    }
  }).done(function (data) {
    return respuestaHTTP=data[0];
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
function CargarModalPuntosDeInteres(id,Categoria,Opcion) {
  ConsultarUnPuntoDeInteres(id,Categoria,Opcion);
  $('#PuntosDeInteres').modal('show');
  ModalEspectaculos();
  console.log(id);
  setTimeout(function(){
    inputPuntoDeInteres(respuestaHTTP.Nombre,respuestaHTTP.Departamento,respuestaHTTP.Ciudad,respuestaHTTP.Direccion,respuestaHTTP.Facebook,respuestaHTTP.Instagram,respuestaHTTP.HoraDeApertura,respuestaHTTP.HoraDeCierre,respuestaHTTP.Descripcion);
    inputEspectaculo(respuestaHTTP.Artista,respuestaHTTP.PrecioEntrada);
    ConsultarTelefonosPuntoDeInteres(id);
    console.log(respuestaHTTP.Nombre);
  },1000)

  // setTimeout(function(){
  //   $('#NombrePuntoDeInteres').val(Nombre);
  //   $('#DepartamentoPuntoDeInteres').val(Departamento);
  //   $('#CiudadPuntoDeInteres').val(Ciudad);
  //   $('#DireccionPuntoDeInteres').val(Direccion);
  //   $('#FacebookPuntoDeInteres').val();
  //   $('#InstagramPuntoDeInteres').val();
  //   $('#HoraDeApertura').val(HoraDeApertura);
  //   $('#HoraDeCierre').val(HoraDeCierre);
  //   $('#DescripcionPuntoDeInteres').val(Descripcion);
  //   console.log(id);
  //   ConsultarTelefonosPuntoDeInteres(id);
  //   IdModificarPuntoDeInteres = id;
  //   CargarFormularioPuntoDeInteres();
  // },1000)
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
function inputPuntoDeInteres(Nombre,Departamento,Ciudad,Direccion,Facebook,Instagram,HoraDeApertura,HoraDeCierre,Descripcion){
  $('#NombrePuntoDeInteres').val(Nombre);
  $('#DepartamentoPuntoDeInteres').val(Departamento);
  $('#CiudadPuntoDeInteres').val(Ciudad);
  $('#DireccionPuntoDeInteres').val(Direccion);
  $('#FacebookPuntoDeInteres').val(Facebook);
  $('#InstagramPuntoDeInteres').val(Instagram);
  $('#HoraDeApertura').val(HoraDeApertura);
  $('#HoraDeCierre').val(HoraDeCierre);
  $('#DescripcionPuntoDeInteres').val(Descripcion);
}
function inputEspectaculo(Artista,PrecioEntrada){
$('#NombreDeArtista').val(Artista);
$('#PrecioEntrada').val(PrecioEntrada);
}
function CargarCategoria(categoria){localStorage.setItem('Categoria',`'${categoria}'`);};
function ModalEspectaculos(){
  $.ajax({
    url: './Modal/ModalEspectaculos.html',
    type:'GET',
    dataType: 'text ',
}).done(function(data){
    $('#ModalBody').html('');
    $('#ModalBody').html(data);
    
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);}); 
}

function prueba(){
  for(var i=0;i<3;i++){
    $(`#campoRequerido${i}`).show();
  }
}
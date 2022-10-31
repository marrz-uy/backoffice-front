var tbody = document.getElementById('tbody');
var main = document.getElementById('main');
var EndPoint='PuntosDeInteres?page';
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
//VALIDACIONES DE FORMULARIOS----------------------------------------------------------------------------------------------------------------->
$(document).ready(function (){
  // ConsultarPuntosDeInteres('PuntosDeInteres');
  CargarCategoria('PuntosDeInteres');
});
//LOGIN--------------------------------------------------------------------------------------------------------------------------------------->
function Login() {
    $.ajax({
      url: 'http://127.0.0.1:8000/api/LoginController',
      type: 'POST',
      dataType: 'json',
      data: {
        username:$('#user').val(),
        password:$('#password').val()
      }
    }).done(function (data){
      if(data.respuesta==='true'){
        localStorage.setItem('Token',data.access_token);
        return location='Modulos/PuntosDeInteres/Dashboard.html';
      }
      alert(data.respuesta);
      //data.respuesta==='true'?location='Modulos/PuntosDeInteres/Dashboard.html':alert(data.respuesta);
      
      
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  }
  

function Logout() {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/auth/logout',
    type: 'POST',
    dataType: 'json',
    
  }).done(function (data){
    console.log(data);
    //localStorage.removeItem('Token');
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
//ALTA --------------------------------------------------------------------------------------------------------------------------------------->
$('#btnRegistrarPuntosInteres').click(function (e) {
  e.preventDefault();
  if ($('#NombrePuntoDeInteres').val() == '') {
    return $('#NombrePuntoDeInteres').addClass('is-invalid');
  }

  if ($('#DepartamentoPuntoDeInteres').val() == '') {
    return $('#DepartamentoPuntoDeInteres').addClass('is-invalid');
  }
  if ($('#CiudadPuntoDeInteres').val() == '') {
    return $('#CiudadPuntoDeInteres').addClass('is-invalid');
  }
  if ($('#DireccionPuntoDeInteres').val() == '') {
    return $('#DireccionPuntoDeInteres').addClass('is-invalid');
  }
  getInputPuntoDeInteres();
});
$('#btnSiguiente').click(function (e) { 
  e.preventDefault();
  ConsultaDeRespuestasHTTP();
  if ($('#NombrePuntoDeInteres').val() == '') {
    return $('#NombrePuntoDeInteres').addClass('is-invalid');
  }
  if ($('#NombrePuntoDeInteres').val() != '') {
    $('#NombrePuntoDeInteres').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#DepartamentoPuntoDeInteres').val() == '') {
    return $('#DepartamentoPuntoDeInteres').addClass('is-invalid');
  }
  if ($('#DepartamentoPuntoDeInteres').val() != '') {
    $('#DepartamentoPuntoDeInteres').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#CiudadPuntoDeInteres').val() == '') {
    return $('#CiudadPuntoDeInteres').addClass('is-invalid');
  }
  if ($('#CiudadPuntoDeInteres').val() != '') {
    $('#CiudadPuntoDeInteres').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#DireccionPuntoDeInteres').val() == '') {
    return $('#DireccionPuntoDeInteres').addClass('is-invalid');
  }
  if ($('#DireccionPuntoDeInteres').val() != '') {
    $('#DireccionPuntoDeInteres').removeClass('is-invalid').addClass('is-valid');
  }
  getInputPuntoDeInteres();
  if($('#TipoCategoria').val()==='Espectaculos'){FormularioDeEspectaculos();}
  if($('#TipoCategoria').val()==='Servicios_Esenciales'){FormularioDeServiciosEscenciales();}
  if($('#TipoCategoria').val()==='transporte'){FormularioDeTransporte();}
  if($('#TipoCategoria').val()==='Seleccionar Categoria'){RegistrarPuntoDeInteres(InformacionPuntoDeInteres);}
  
});
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
  getInputServicioEsencial();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeEspectaculos(){
  getInputEspectaculos();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeTransporte() {
  getInputTransporte();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}

function RegistrarPuntoDeInteres(InformacionPuntoDeInteres) {
  console.log(InformacionPuntoDeInteres);
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type: 'POST',
    dataType: 'json',
    data: InformacionPuntoDeInteres
  }).done(function (data) {
    // alert(data.respuesta);
    // location.reload(); 
    console.log(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultaDeRespuestasHTTP() {
  var imagen=document.getElementById('Imagen');
  console.log(imagen.files[0]);
  imagen=imagen.files[0];
  //console.log($('#Imagen').file);
  $.ajax({
    url: 'http://127.0.0.1:8000/api/PuntosInteres',
    type: 'POST',
    dataType: 'text',
    processData: false,
    contentType: false,
    headers:{'Accept':'*/*','Accept-Encoding':'multipart/form-data','Content-Encoding':'multipart/form-data'},
    data: imagen
  }).done(function (data) {
    // alert(data.respuesta);
    // location.reload(); 
    console.log(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
 }
//CONSULTA --------------------------------------------------------------------------------------------------------------------------------------->
function ConsultarPuntosDeInteres(categoria) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${categoria}`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    respuestaHTTP=data;
    pagination(respuestaHTTP);
    tbody.innerHTML = "";
    for (var i = 0; i < js.length; i++) {
      if(categoria!='PuntosDeInteres'){
        console.log(js.length);
        tbody.innerHTML=tbody.innerHTML+`
        <tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].Departamento}</td>
        <td>${js[i].Ciudad}</td>
        <td>${js[i].Direccion}</td>
        <td><i onclick="EliminarPuntoDeInteres(${js[i].puntosinteres_id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].puntosinteres_id},${localStorage.getItem('Categoria')},'Unico');" style="cursor:pointer;" class="bi bi-gear ms-2"></i></td>
        </tr>`;
        
      };
      if(categoria==='PuntosDeInteres'){
        tbody.innerHTML=tbody.innerHTML+`
        <tr class="table-active">
        <th scope="row">${js[i].Nombre}</th>
        <td>${js[i].Departamento}</td>
        <td>${js[i].Ciudad}</td>
        <td>${js[i].Direccion}</td>
        <td><i onclick="EliminarPuntoDeInteres(${js[i].id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].id},${localStorage.getItem('Categoria')},'Unico');" style="cursor:pointer;" class="bi bi-gear ms-2"></i></td>
        </tr>`;
      }
      
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
    if(Categoria==='PuntosDeInteres'){
      return respuestaHTTP=data;
    }
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
//BAJA --------------------------------------------------------------------------------------------------------------------------------------->
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
//MODIFICACION --------------------------------------------------------------------------------------------------------------------------------------->
function CargarModalPuntosDeInteres(id,Categoria,Opcion) {
  IdModificarPuntoDeInteres=id;
  ConsultarUnPuntoDeInteres(id,Categoria,Opcion);
  $('#PuntosDeInteres').modal('show');
  ModalConsulta(Categoria);
  setTimeout(function(){
    setInputPuntoDeInteres(respuestaHTTP.Nombre,respuestaHTTP.Departamento,respuestaHTTP.Ciudad,respuestaHTTP.Direccion,respuestaHTTP.Facebook,respuestaHTTP.Instagram,respuestaHTTP.HoraDeApertura,respuestaHTTP.HoraDeCierre,respuestaHTTP.Descripcion,respuestaHTTP.Latitud,respuestaHTTP.Longitud);
    ConsultarTelefonosPuntoDeInteres(id);
    setInputEspectaculo(respuestaHTTP.Artista,respuestaHTTP.PrecioEntrada);
    console.log(respuestaHTTP.Nombre);
  },1000)
}
function ModificarPuntosDeInteres(id,InformacionPuntoDeInteres) {
  console.log(InformacionPuntoDeInteres);
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${id}`,
    type: 'PATCH',
    dataType: 'json',
    data: InformacionPuntoDeInteres
  }).done(function (data) {
    alert(data.respuesta);
    location.reload();
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
$('#btnModificarPuntosInteres').click(function (e) {
  e.preventDefault();
  getInputPuntoDeInteres();
  ModificarPuntosDeInteres(IdModificarPuntoDeInteres,InformacionPuntoDeInteres);
});
//FUNCIONES AUXILIARES------------------------------------------------------------------------------------------------------------------->
function setInputPuntoDeInteres(Nombre,Departamento,Ciudad,Direccion,Facebook,Instagram,HoraDeApertura,HoraDeCierre,Descripcion,Latitud,Longitud){
  console.log(respuestaHTTP);
  console.log(Direccion);
  $('#NombrePuntoDeInteres').val(Nombre);
  $('#DepartamentoPuntoDeInteres').val(Departamento);
  $('#CiudadPuntoDeInteres').val(Ciudad);
  $('#DireccionPuntoDeInteres').val(Direccion);
  $('#FacebookPuntoDeInteres').val(Facebook);
  $('#InstagramPuntoDeInteres').val(Instagram);
  $('#HoraDeApertura').val(HoraDeApertura);
  $('#HoraDeCierre').val(HoraDeCierre);
  $('#DescripcionPuntoDeInteres').val(Descripcion);
  $('#Latitud').val(Latitud);
  $('#Longitud').val(Longitud);
}
function setInputEspectaculo(Artista,PrecioEntrada){
$('#NombreDeArtista').val(Artista);
$('#PrecioEntrada').val(PrecioEntrada);
}
function getInputPuntoDeInteres() {
  let Direccion=`${$('#DireccionPuntoDeInteres1').val()} ${$('#DireccionPuntoDeInteres2').val()} ${$('#DireccionPuntoDeInteres3').val()}`;
  InformacionPuntoDeInteres = {
    Nombre: $('#NombrePuntoDeInteres').val(),
    Departamento: $('#DepartamentoPuntoDeInteres').val(),
    Ciudad: $('#CiudadPuntoDeInteres').val(),
    Direccion: Direccion,
    Telefono: $('#TelefonoPuntoDeInteres').val(),
    Celular: $('#CelularPuntoDeInteres').val(),
    Facebook: $('#FacebookPuntoDeInteres').val(),
    Instagram: $('#InstagramPuntoDeInteres').val(),
    HoraDeApertura: $('#HoraDeApertura').val(),
    HoraDeCierre: $('#HoraDeCierre').val(),
    Descripcion: $('#DescripcionPuntoDeInteres').val(),
    Imagen: $('#Imagen').val(),
    Latitud: $('#Latitud').val(),
    Longitud: $('#Longitud').val(),
    Op: 'PuntoDeInteres'
  }
  return JSON.stringify(InformacionPuntoDeInteres);
}
function getInputServicioEsencial(){
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'ServicioEsencial'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
}
function getInputTransporte(){
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'transporte'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
}
function getInputEspectaculos() {
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Artista: $('#NombreDeArtista').val(),
    PrecioEntrada: $('#PrecioEntrada').val(),
    Op: 'Espectaculos'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
}
function CargarCategoria(categoria){localStorage.setItem('Categoria',`'${categoria}'`);};
function ModalConsulta(Categoria){
  $.ajax({
    url: `./Modal/${Categoria}.html`,
    type:'GET',
    dataType: 'text ',
}).done(function(data){
  console.log(data);
    $('#ModalBody').html('');
    $('#ModalBody').html(data);
    
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);}); 
}
function pagination(respuestaHTTP) {
  $('#pagination').html('');
  $('#pagination').append(`<li class="page-item"><a class="page-link" href="#">Anterior</a></li>`);  
  for(i=respuestaHTTP.current_page;i<=respuestaHTTP.last_page;i++){
  $('#pagination').append(`<li onclick="ConsultarPorPagina('${EndPoint}','${i}');" class="page-item"><a class="page-link" href="#">${i}</a></li>`)
  }
  $('#pagination').append(`<li onclick="ConsultarPuntosDeInteresPaginaSiguiente(2);" class="page-item"><a class="page-link" href="#">Siguiente</a></li>`)
}
function ConsultarPorPagina(EndPoint,Pagina){
  $.ajax({
    url: `http://127.0.0.1:8000/api/PuntosInteres/${EndPoint}=${Pagina}`,
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {
    var js = data.data;
    console.log(data);
    console.log(js);
    tbody.innerHTML='';
    for (var i = 0; i < js.length; i++) {
      tbody.innerHTML=tbody.innerHTML+
      `<tr class="table-active">
      <th scope="row">${js[i].Nombre}</th>
      <td>${js[i].FechaInicio}</td>
      <td>${js[i].HoraInicio}</td>
      <td>${js[i].Tipo}</td>
      <td><i onclick="EliminarPuntoDeInteres(${js[i].puntosinteres_id});" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].puntosinteres_id},${localStorage.getItem('Categoria')},'Unico');" class="bi bi-gear"></i></td>
      </tr>`;
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
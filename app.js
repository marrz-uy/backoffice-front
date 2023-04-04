var tbody = document.getElementById('tbody');
var main = document.getElementById('main');
var EndPoint='PuntosDeInteres';
var PuntosDeInteres = [];
var IdModificarPuntoDeInteres;
var InformacionPuntoDeInteres;
var InformacionDetalladaPuntoDeInteres;
var respuestaHTTP;
var boton = document.getElementById('btnRegistrarPuntosInteres');
var categoria = 'PuntosDeInteres';
//var datos=['https://res.cloudinary.com/dioeqw1za/image/upload/v1673026711/feeluy/pkeyencgrtsvdh8nhc7d.jpg','https://res.cloudinary.com/dioeqw1za/image/upload/v1673026728/feeluy/viw5r6mlfg8h5ku8pgfi.jpg ','https://res.cloudinary.com/dioeqw1za/image/upload/v1673026734/feeluy/utsjwutbfpwwdw2msolk.jpg'];
var datos;
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
  if ($('#user').val() == '') {
    return $('#user').addClass('is-invalid');
  }
  if ($('#user').val() != '') {
    $('#user').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#password').val() == '') {
    return $('#password').addClass('is-invalid');
  }
  if ($('#password').val() != '') {
    $('#password').removeClass('is-invalid').addClass('is-valid');
  }
    $.ajax({
      url: 'http://127.0.0.1:8000/api/LoginController',
      type: 'POST',
      dataType: 'json',
      data: {
        username:$('#user').val(),
        password:$('#password').val()
      }
    }).done(function (data){
      console.log(data);
      if(data.respuesta==='true'){
        localStorage.setItem('Token',data.access_token);
        return location='Modulos/PuntosDeInteres/Dashboard.html';
      }
      if(data.respuesta==='Invalid credentials'){
        return Avisos('Credenciales incorrectas');
      }
      
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
      console.log(data);
      $('#ModalDeAviso').modal('show');
      ConsultarImagenes(id);
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ConsultarImagenes(id){
  $.ajax({
    url: `http://127.0.0.1:8000/api/showImages/${id}`,
    type: 'GET',
    dataType:'json',
  }).done(function (data) {
    $('#imagen-container').html('');
    for(i=0;i<data.length;i++){
      $('#imagen-container').append(`<div class="tamano">
      <img onclick="ImagenCompleta('${data[i].url}',${id});" class="pointer" id="imagen${i}"
        src="${data[i].url}"
        alt="imagen${i}">
      </div>`);
    }
    
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ImagenCompleta(url,id) {
$('#ModalDeImagenesGrandes').modal('show');
$('#divImagenGrande').html('');
$('#divImagenGrande').append(`<input type="button" onclick="EliminarImagen('${url}',${id});" class="btn btn-danger" value="Eliminar">`);  
$('#divImagenGrande').append(`<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`);
$('#ImagenCompletaDiv').html('');
$('#ImagenCompletaDiv').append(`<img src="${url}" alt="imagen${url}">`)
}
function EliminarImagen(url,id) {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/EliminarImagen',
    type: 'POST',
    data: {url:url},
    dataType:'json',
  }).done(function (data) {
    console.log(data);
    $('#ModalDeAviso').modal('show');
    ConsultarImagenes(id);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  }
//ALTA --------------------------------------------------------------------------------------------------------------------------------------->
$('#btnSiguiente').click(function (e) { 
  e.preventDefault();
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

  if ($('#Latitud').val().length == 0) {
    return $('#Latitud').addClass('is-invalid');
  }
  if ($('#Latitud').val().length != 0) {
     $('#Latitud').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#Longitud').val().length == 0) {
    return $('#Longitud').addClass('is-invalid');
  }
  if ($('#Longitud').val().length != 0) {
    $('#Longitud').removeClass('is-invalid').addClass('is-valid');
  }
 
  if ($('#TipoDeLugar').val() === 'Tipo De Lugar') {
    return $('#TipoDeLugar').addClass('is-invalid');
  }
  if ($('#TipoDeLugar').val() != 'Tipo De Lugar') {
    $('#TipoDeLugar').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#RestriccionDeEdad').val() === 'Restriccion De Edad') {
    return $('#RestriccionDeEdad').addClass('is-invalid');
  }
  if ($('#RestriccionDeEdad').val() != 'Restriccion De Edad') {
    $('#RestriccionDeEdad').removeClass('is-invalid').addClass('is-valid');
  }

  if ($('#EnfoqueDePersonas').val() === 'Enfoque De Personas') {
    return $('#EnfoqueDePersonas').addClass('is-invalid');
  }
  if ($('#EnfoqueDePersonas').val() != 'Enfoque De Personas') {
    $('#EnfoqueDePersonas').removeClass('is-invalid').addClass('is-valid');
  }
  getInputPuntoDeInteres();
  
  if($('#TipoCategoria').val()==='Espectaculos'){FormularioDeEspectaculos();}
  if($('#TipoCategoria').val()==='Servicios_Esenciales'){FormularioDeServiciosEscenciales();}
  if($('#TipoCategoria').val()==='transporte'){FormularioDeTransporte();}
  if($('#TipoCategoria').val()==='paseos'){FormularioDePaseos();}
  if($('#TipoCategoria').val()==='Alojamiento'){FormularioDeAlojamiento();}
  if($('#TipoCategoria').val()==='gastronomicos'){FormularioDeGastronomico();}
  if($('#TipoCategoria').val()==='Actividades_Infantiles'){FormularioDeActividadesInfantiles();}
  if($('#TipoCategoria').val()==='Actividades_Nocturnas'){FormularioDeActividadesNocturnas();}
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
    Avisos('Se registro correctamente');
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
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
function AltaDeActividadesInfantiles() {
  getInputActividadesInfantiles();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeActividadesNocturnas() {
  getInputActividadesNocturnas();
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
function AltaDePaseos() {
  getInputPaseos();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeAlojamiento() {
  if ($('#TipoDetallado').val() === 'Seleccionar Tipo') {
    return $('#TipoDetallado').addClass('is-invalid');
  }
  if ($('#TipoDetallado').val() != 'Seleccionar Tipo') {
    $('#TipoDetallado').removeClass('is-invalid').addClass('is-valid');
  }
  if ($('#InputCalificaciones').val().length == 0) {
    return $('#InputCalificaciones').addClass('is-invalid');
  }
  if ($('#InputCalificaciones').val().length != 0) {
     $('#InputCalificaciones').removeClass('is-invalid').addClass('is-valid');
  }
  getInputAlojamiento();
  RegistrarPuntoDeInteres(InformacionPuntoDeInteres);
}
function AltaDeGastronomico() {
  getInputGastronomico();
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
    console.log(data.respuesta);
    Avisos(data.respuesta);
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
    //setTimeout(location.reload(),1000); 
    
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
    console.log(data);
    if($('#txt-buscar').val()===''){
      return ConsultarPuntosDeInteres('PuntosDeInteres');
    }
    if(data.Mensaje==='No hubo resultado'){
      console.log(data.Mensaje);
      Avisos(data.Mensaje);
      ConsultarPuntosDeInteres('PuntosDeInteres');
    }
      mostrarPunto(data[0]);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function mostrarPunto(datos){
  $('#tbody').html('');
  $('#tbody').append(`
  <tr class="table-active">
  <th scope="row">${datos.Nombre}</th>
  <td>${datos.Departamento}</td>
  <td>${datos.Ciudad}</td>
  <td>${datos.Direccion}</td>
  <td><i onclick="EliminarPuntoDeInteres(${datos.id});" class="bi bi-trash pointer" ></i><i onclick="CargarModalPuntosDeInteres(${datos.id},${localStorage.getItem('Categoria')},'Unico');" style="cursor:pointer;" class="bi bi-gear ms-2"></i></td>
  </tr>`);
}
function PuntoDeInteres(id,Categoria,Opcion) {
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
    return console.log(data);
    for (var i = 0; i < data.length; i++) {
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
      Avisos(data.respuesta);
      $('#BotonAceptarModalAviso').removeAttr('onclick');
      $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
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
    setInputPuntoDeInteres(respuestaHTTP.Nombre,respuestaHTTP.Departamento,respuestaHTTP.Ciudad,respuestaHTTP.Direccion,respuestaHTTP.Facebook,respuestaHTTP.Instagram,respuestaHTTP.HoraDeApertura,respuestaHTTP.HoraDeCierre,respuestaHTTP.Descripcion,respuestaHTTP.Latitud,respuestaHTTP.Longitud,respuestaHTTP.TipoDeLugar,respuestaHTTP.RestriccionDeEdad,respuestaHTTP.EnfoqueDePersonas);
    ConsultarImagenes(id);
    console.log(id);
    $('#divBotonImagen').append(`<input onclick="NuevaImagen(${id});" type="button" class="btn btn-success float-end" value="Agregar Imagen">`);
    ConsultarTelefonosPuntoDeInteres(id);
    if(Categoria==='espectaculos')setInputEspectaculo(respuestaHTTP),BotonImagen;
    if(Categoria==='alojamientos')setInputAlojamiento(respuestaHTTP),BotonImagen;
    if(Categoria==='gastronomicos')setInputGastronomico(respuestaHTTP),BotonImagen;
    if(Categoria==='actividades_infantiles')setInputActividadesInfantiles(respuestaHTTP),BotonImagen;
    if(Categoria==='actividades_nocturnas')setInputActividadesNocturnas(respuestaHTTP),BotonImagen;
    if(Categoria==='transporte')setInputTransporte(respuestaHTTP),BotonImagen;
    if(Categoria==='paseos')setInputPaseos(respuestaHTTP),BotonImagen;
    if(Categoria==='servicios_esenciales')setInputServicioEsencial(respuestaHTTP),BotonImagen;
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
    Avisos(data.respuesta);
    $('#BotonAceptarModalAviso').removeAttr('onclick');
    $('#BotonAceptarModalAviso').attr('onclick','location.reload();');
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ModalConsulta(Categoria){
  $.ajax({
    url: `./Modal/${Categoria}.html`,
    type:'GET',
    dataType: 'text ',
}).done(function(data){
    $('#ModalBody').html('');
    $('#ModalBody').html(data);
    
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);}); 
}
$('#btnModificarPuntosInteres').click(function (e) {
  e.preventDefault();
  let Categoria=localStorage.getItem('Categoria');
  getInputPuntoDeInteres();
  if(Categoria==="'alojamientos'")getInputAlojamiento();
  if(Categoria==="'gastronomicos'")getInputGastronomico();
  if(Categoria==="'actividades_infantiles'")getInputActividadesInfantiles();
  if(Categoria==="'actividades_nocturnas'")getInputActividadesNocturnas();
  if(Categoria==="'transporte'")getInputTransporte();
  if(Categoria==="'paseos'")getInputPaseos();
  if(Categoria==="'espectaculos'")getInputEspectaculos();
  if(Categoria==="'servicios_esenciales'")getInputServicioEsencial();
  ModificarPuntosDeInteres(IdModificarPuntoDeInteres,InformacionPuntoDeInteres);
});
//FUNCIONES AUXILIARES------------------------------------------------------------------------------------------------------------------->
function setInputPuntoDeInteres(Nombre,Departamento,Ciudad,Direccion,Facebook,Instagram,HoraDeApertura,HoraDeCierre,Descripcion,Latitud,Longitud,TipoDeLugar,RestriccionDeEdad,EnfoqueDePersonas){
  $('#NombrePuntoDeInteres').val(Nombre);
  $('#DepartamentoPuntoDeInteres').val(Departamento);
  $('#CiudadPuntoDeInteres').val(Ciudad);
  $('#DireccionPuntoDeInteres1').val(Direccion);
  $('#FacebookPuntoDeInteres').val(Facebook);
  $('#InstagramPuntoDeInteres').val(Instagram);
  $('#HoraDeApertura').val(HoraDeApertura);
  $('#HoraDeCierre').val(HoraDeCierre);
  $('#DescripcionPuntoDeInteres').val(Descripcion);
  $('#Latitud').val(Latitud);
  $('#Longitud').val(Longitud);
  $('#TipoDeLugar').val(TipoDeLugar);
  $('#RestriccionDeEdad').val(RestriccionDeEdad);
  $('#EnfoqueDePersonas').val(EnfoqueDePersonas);
}
function setInputEspectaculo(datos){
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
}
function setInputAlojamiento(datos){
  console.log(datos);
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
  if(datos.Calificaciones!=null)$('#InputCalificaciones').val(datos.Calificaciones);
  if(datos.Habitaciones!=null)$('#InputHabitaciones').val(datos.Habitaciones);
  if(datos.AireAcondicionado!=null)$('#InputAireAcondicionado').attr('checked',true);
  if(datos.BanoPrivad!=null)$('#InputBanoPrivado').attr('checked',true);
  if(datos.Bar!=null)$('#InputBar').attr('checked',true);
  if(datos.Casino!=null)$('#InputCasino').attr('checked',true);
  if(datos.Desayuno!=null)$('#InputDesayuno').attr('checked',true);
  if(datos.Piscina!=null)$('#InputPiscina').attr('checked',true);
  if(datos.Restaurante!=null)$('#InputRestaurante').attr('checked',true);
  if(datos.TvCable!=null)$('#InputTvCable').attr('checked',true);
  if(datos.Wifi!=null)$('#InputWifi').attr('checked',true);
}
function setInputActividadesInfantiles(datos){
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
}
function setInputTransporte(datos){
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
}
function setInputPaseos(datos){
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
  if(datos.Recomendaciones!=null)$('#RecomendacionesPaseos').val(datos.Recomendaciones);
}
function setInputActividadesNocturnas(datos){
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
}
function setInputServicioEsencial(datos){
  console.log(datos);
  if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
}
function setInputGastronomico(datos){
    if(datos.Tipo!=null)$('#TipoDetallado').val(datos.Tipo);
    if(datos.ComidaVegge!=0)$('#InputComidaVegge').attr('checked',true);
    if(datos.Comida!=0)$('#InputComida').attr('checked',true);
    if(datos.Alcohol!=0)$('#InputAlcohol').attr('checked',true);
    if(datos.MenuInfantil!=0)$('#InputMenuInfantil').attr('checked',true);
}
function getInputPuntoDeInteres() {
  
  InformacionPuntoDeInteres = {
    Nombre: $('#NombrePuntoDeInteres').val(),
    Departamento: $('#DepartamentoPuntoDeInteres').val(),
    Ciudad: $('#CiudadPuntoDeInteres').val(),
    Direccion: $('#DireccionPuntoDeInteres1').val(),
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
    TipoDeLugar: $('#TipoDeLugar').val(),
    RestriccionDeEdad: $('#RestriccionDeEdad').val(),
    EnfoqueDePersonas: $('#EnfoqueDePersonas').val(),
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
function getInputActividadesInfantiles(){
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'ActividadesInfantiles'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
}
function getInputActividadesNocturnas(){
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'ActividadesNocturnas'
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
function getInputPaseos(){
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Recomendaciones: $('#RecomendacionesPaseos').val(),
    Op: 'Paseos'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
  console.log(InformacionPuntoDeInteres);
}
function getInputEspectaculos() {
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Op: 'Espectaculos'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
}
function getInputAlojamiento() {
  $('#InputPiscina').prop('checked')?Piscina=1:Piscina=0;
  $('#InputTvcable').prop('checked')?Tv=1:Tv=0;
  $('#InputWifi').prop('checked')?Wifi=1:Wifi=0;
  $('#InputAireAcondicionado').prop('checked')?AireAcondicionado=1:AireAcondicionado=0;
  $('#InputBanoPrivado').prop('checked')?BanoPrivado=1:BanoPrivado=0;
  $('#InputBar').prop('checked')?Bar=1:Bar=0;
  $('#InputCasino').prop('checked')?Casino=1:Casino=0;
  $('#InputDesayuno').prop('checked')?Desayuno=1:Desayuno=0;
  $('#InputRestaurante').prop('checked')?Restaurante=1:Restaurante=0;
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    Calificaciones:$('#InputCalificaciones').val(),
    Piscina:Piscina,
    TvCable:Tv,
    Wifi:Wifi,
    AireAcondicionado:AireAcondicionado,
    BanoPrivad:BanoPrivado,
    Bar:Bar,
    Casino:Casino,
    Desayuno:Desayuno,
    Restaurante:Restaurante,
    Op: 'Alojamiento'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
}
function getInputGastronomico() {
  $('#InputComidaVegge').prop('checked')?ComidaVegge=1:ComidaVegge=0;
  $('#InputComida').prop('checked')?Comida=1:Comida=0;
  $('#InputAlcohol').prop('checked')?Alcohol=1:Alcohol=0;
  $('#InputMenuInfantil').prop('checked')?MenuInfantil=1:MenuInfantil=0;
  InformacionDetalladaPuntoDeInteres = {
    Tipo: $('#TipoDetallado').val(),
    ComidaVegge:ComidaVegge,
    Comida:Comida,
    Alcohol:Alcohol,
    MenuInfantil:MenuInfantil,
    Op: 'Gastronomicos'
  }
  InformacionDetalladaPuntoDeInteres = JSON.stringify(InformacionDetalladaPuntoDeInteres);
  InformacionPuntoDeInteres.InformacionDetalladaPuntoDeInteres = InformacionDetalladaPuntoDeInteres;
}
function Avisos(mensaje){
  $('#ModalDeAviso').modal('show');
  $('#Modal-Mensaje').text(mensaje);
}
function CargarCategoria(categoria){localStorage.setItem('Categoria',`'${categoria}'`);};
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
    console.log(data);
    console.log(js);
    tbody.innerHTML='';
    for (var i = 0; i < js.length; i++) {
      tbody.innerHTML=tbody.innerHTML+
      `<tr class="table-active">
      <th scope="row">${js[i].Nombre}</th>
      <td>${js[i].Departamento}</td>
      <td>${js[i].Ciudad}</td>
      <td>${js[i].Direccion}</td>
      <td><i onclick="EliminarPuntoDeInteres(${js[i].id});" class="bi bi-trash" ></i><i onclick="CargarModalPuntosDeInteres(${js[i].id},${localStorage.getItem('Categoria')},'Unico');" class="bi bi-gear"></i></td>
      </tr>`;
    }
    $('#TituloCategorias').text(`${localStorage.getItem('Categoria').toUpperCase()} - Página ${data.current_page}`);
    pagination(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function ArregloCategorias(categoria){
  ConsultarPuntosDeInteres(categoria);
  CargarCategoria(categoria);
  $('#TituloCategorias').text(categoria.toUpperCase());
}
//DASHBOARD------------------------------------------------------------------------------------------------------------------------------------>
function dashboardChart(){
  $(function($){
    $('#grafica').highcharts({
      title:{text:'Registro de Usuarios del 2023'},
      xAxis:{categories:['Enero','Febrero','Marzo','Abril']},
      yAxis:{title:'Porcentaje %'},plotLines:[{value:0,width:1}],
      tooltip:{valueSuffix:'%'},
      legend:{layout:'vertical',align:'right',verticalAlign:'middle',borderWidth:0},
      series:[
      {type:'column',name:'Usuarios',data:[25,30,21,50],color:'#2874A6'}
    
    ]
    });
  });
}
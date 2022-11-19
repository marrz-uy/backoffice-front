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
function FormularioGeneralPuntoDeInteres(){
  $.ajax({
    url: './Formularios/PuntoDeInteresGeneral.html',
    type:'GET',
    dataType: 'text ',
}).done(function(data){
    main.innerHTML='';
    main.innerHTML=data;
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);}); 
}

  function FormularioDeServiciosEscenciales(){
    $.ajax({
      url: './Formularios/ServiciosEscencialesAlta.html',
      type:'GET',
      dataType: 'text ',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
  function FormularioDeActividadesInfantiles(){
    $.ajax({
      url: './Formularios/ActividadesInfantilesAlta.html',
      type:'GET',
      dataType: 'text ',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
  function FormularioDeActividadesNocturnas(){
    $.ajax({
      url: './Formularios/ActividadesNocturnasAlta.html',
      type:'GET',
      dataType: 'text ',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
  function FormularioDeTransporte(){
    $.ajax({
      url: './Formularios/TransporteAlta.html',
      type:'GET',
      dataType: 'text ',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
  function FormularioDeEspectaculos(){
    $.ajax({
      url: './Formularios/EspectaculosAlta.html',
      type:'GET',
      dataType: 'text ',
  }).done(function(data){
      console.log(data);
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
  }
  function FormularioDeAlojamiento(){
    $.ajax({
      url: './Formularios/AlojamientoAlta.html',
      type:'GET',
      dataType: 'text',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
  function FormularioDeGastronomico(){
    $.ajax({
      url: './Formularios/GastronomicoAlta.html',
      type:'GET',
      dataType: 'text',
  }).done(function(data){
      main.innerHTML='';
      main.innerHTML=data;
  }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});  
  }
 
  
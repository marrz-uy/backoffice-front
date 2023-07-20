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
function FormularioPuntoDeInteresConsulta(){
  $.ajax({
    url: './FormulariosConsulta/PuntoDeInteresGeneralConsulta.html',
    type:'GET',
    dataType: 'text ',
}).done(function(data){
    console.log(data);
    $('#ModalBody').html('');
    $('#ModalBody').html(data);
    
}).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);}); 
}

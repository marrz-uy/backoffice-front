var InformacionLugar;
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
    ConsultarPuntosDeInteres('PuntosDeInteres');
});
function ConsultarPuntosDeInteres(categoria) {
    $.ajax({
      url: `http://127.0.0.1:8000/api/PuntosInteres/${categoria}`,
      type: 'GET',
      dataType: 'json',
    }).done(function (data) {
      var js = data.data;
      tbody.innerHTML = "";
      for (var i = 0; i < js.length; i++) {
        if(categoria==='PuntosDeInteres'){
          tbody.innerHTML=tbody.innerHTML+`
          <tr class="table-active">
          <th scope="row">${js[i].Nombre}</th>
          <td>${js[i].Departamento}</td>
          <td>${js[i].Ciudad}</td>
          <td>${js[i].Direccion}</td>
          <td>
                <svg onclick="getInputLugar('${js[i].id}','${js[i].Nombre}');" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
          </td>
          </tr>`;
        }
        
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {ErrorHandler(jqXHR, textStatus);});
}
function getInputLugar(id,nombre){
    InformacionLugar = {
        id: id,
        Nombre: nombre,
      }
      JSON.stringify(InformacionLugar);
      $('#LugarDelEvento').val(nombre);
}
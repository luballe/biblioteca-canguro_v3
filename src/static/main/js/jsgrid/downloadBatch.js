$(function() {
  //console.log("Hello1")
  fillSubjectTable()
  fillFilesTable()
});

function fillFilesTable(){
//  $('#dicomTable tr').append('<td id="added"><div class="details-form-field">'+numDicom+'</div></td>');
//  $('#atencionTable tr').append('<td id="added"><div class="details-form-field">'+numAtencion+'</div></td>');
//  $('#memoriaTable tr').append('<td id="added"><div class="details-form-field">'+numMemoria+'</div></td>');

  $('#dicomTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="dicom.tar.gz" id="checkDicom">Dicom</label></td>');
  $('#paradigmsTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="ATENCION.tar.gz" id="checkAtencion">Atencion</label></td>');
  $('#paradigmsTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="COORDINACION.tar.gz" id="checkCoordinacion">Coordinacion</label></td>');
  $('#paradigmsTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="MEMORIA.tar.gz" id="checkMemoria">Memoria</label></td>');
  $('#paradigmsTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="MIEDO.tar.gz" id="checkMiedo">Miedo</label></td>');
  $('#paradigmsTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="PRENSION.tar.gz" id="checkPrension">Prension</label></td>');
  $('#structuralTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="MPRAGE.tar.gz" id="checkMPRAGE">MPRAGE</label></td>');
  $('#structuralTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="T13D.tar.gz" id="checkT13D">T1</label></td>');
  $('#structuralTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="T23D.tar.gz" id="checkT23D">T2</label></td>');
  $('#structuralTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="FLAIR.tar.gz" id="checkFLAIR">FLAIR</label></td>');
  $('#dtiTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="DTI.tar.gz" id="checkDTI">DTI</label></td>');
  $('#freesurferTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="Freesurfer_Tracula.tar.gz" id="checkFreesurfer_Tracula">Freesurfer / Tracula</label></td>');
  $('#caminoTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="Camino.tar.gz" id="checkCamino">Camino</label></td>');
  $('#slicerTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="Slicer.tar.gz" id="checkSlicer">Slicer</label></td>');
  $('#fearSabrinaTable tr').append('<td id="added"><label><input class="files" type="checkbox" name="FearSabrina.tar.gz" id="checkFearSabrina">Fear Sabrina</label></td>');
}

function fillSubjectTable(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonArr = JSON.parse(this.responseText);
      //console.log(jsonArr)
      var tableString = "";
      for (var i=0,row=0; i< jsonArr.length; i++)
      {
        if (i%20==0)
        {
          if(i>0)
          {
            tableString+='</tr>';
          }
          tableString+='<tr style="padding-top:5px">';
//          tableString+='<tr>';
        }
        tableString+='<td id="added" style="margin-left:7px"><label><input class="subjects" type="checkbox" name="'+jsonArr[i].SubjectID+'" id="'+jsonArr[i].SubjectID+'">'+jsonArr[i].SubjectID+'</label></td>';
//        tableString+='<td id="added"><input type="checkbox" name="'+jsonArr[i].SubjectID+'" id="'+jsonArr[i].SubjectID+'"><label>'+jsonArr[i].SubjectID+'</label></td>';
      }
      tableString+='</tr>';
//console.log(tableString)
      $('#subjectsTable').append(tableString) 
    }
  };
  xmlhttp.open("GET", "../../data/canguroData.json", true);
  xmlhttp.send();
  //console.log("Hola")
}

function downloadBatch(){
  var subjectsSelected = [];
  var filesSelected = [];
  //$('#subjectsTable input:checked').each(function() {
  //  subjectsSelected.push($(this).attr('name'));
  //}); 
  $('.subjects:checkbox:checked').each(function() {
    subjectsSelected.push($(this).attr('name'));
  }); 
  $('.files:checkbox:checked').each(function() {
    filesSelected.push($(this).attr('name'));
  }); 
 
  if(subjectsSelected.length == 0)
  {
    alert( "No subjects selected");
  }
  else
  {
    console.log(subjectsSelected)
    if (filesSelected.length == 0)
    {
      alert( "No files selected");
    }
    else
    {
      console.log(filesSelected)
      $.post( "/downloadBatch", { subjects: JSON.stringify(subjectsSelected), "files": JSON.stringify(filesSelected) }).done(function( data ) {
        alert( "The system is processing your request. An email will be sent to " + data + " with instructions on how to download the files.");
      });
    }
  }

}

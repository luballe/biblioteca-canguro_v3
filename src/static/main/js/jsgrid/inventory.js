var numDicom=0;
var numAtencion=0;
var numCoordinacion=0;
var numMemoria=0;
var numMiedo=0;
var numPrension=0;
var numMPRAGE=0;
var numT1=0;
var numT2=0;
var numFLAIR=0;
var numDTI=0;
var numFreesurfer=0;
var numCamino=0;
var numSlicer=0;
var numFearSabrina=0;

$(function() {
  //console.log("Hello1")
  getTotals()
});

function fillFilesTable(){
  $('#dicomTable tr').append('<td id="added"><div class="details-form-field">'+numDicom+'</div></td>');
  $('#atencionTable tr').append('<td id="added"><div class="details-form-field">'+numAtencion+'</div></td>');
  $('#coordinacionTable tr').append('<td id="added"><div class="details-form-field">'+numCoordinacion+'</div></td>');
  $('#memoriaTable tr').append('<td id="added"><div class="details-form-field">'+numMemoria+'</div></td>');
  $('#miedoTable tr').append('<td id="added"><div class="details-form-field">'+numMiedo+'</div></td>');
  $('#prensionTable tr').append('<td id="added"><div class="details-form-field">'+numPrension+'</div></td>');
  $('#mprageTable tr').append('<td id="added"><div class="details-form-field">'+numMPRAGE+'</div></td>');
  $('#t1Table tr').append('<td id="added"><div class="details-form-field">'+numT1+'</div></td>');
  $('#t2Table tr').append('<td id="added"><div class="details-form-field">'+numT2+'</div></td>');
  $('#flairTable tr').append('<td id="added"><div class="details-form-field">'+numFLAIR+'</div></td>');
  $('#dtiTable tr').append('<td id="added"><div class="details-form-field">'+numDTI+'</div></td>');
  $('#freesurferTable tr').append('<td id="added"><div class="details-form-field">'+numFreesurfer+'</div></td>');
  $('#caminoTable tr').append('<td id="added"><div class="details-form-field">'+numCamino+'</div></td>');
  $('#slicerTable tr').append('<td id="added"><div class="details-form-field">'+numSlicer+'</div></td>');
  $('#fearsabrinaTable tr').append('<td id="added"><div class="details-form-field">'+numFearSabrina+'</div></td>');
}

function getTotals(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonArr = JSON.parse(this.responseText);
      //console.log(jsonArr)
      for (var i=0,row=0; i< jsonArr.length; i++)
      {
        if(jsonArr[i].Dicom == true){
          numDicom ++;
        }
        if(jsonArr[i].Atencion == true){
          numAtencion ++;
        }
        if(jsonArr[i].Coordinacion == true){
          numCoordinacion ++;
        }
        if(jsonArr[i].Memoria == true){
          numMemoria ++;
        }
        if(jsonArr[i].Miedo == true){
          numMiedo ++;
        }
        if(jsonArr[i].Prension == true){
          numPrension ++;
        }
        if(jsonArr[i].MPRAGE == true){
          numMPRAGE ++;
        }
        if(jsonArr[i].T13D == true){
          numT1 ++;
        }
        if(jsonArr[i].T23D == true){
          numT2 ++;
        }
        if(jsonArr[i].FLAIR == true){
          numFLAIR ++;
        }
        if(jsonArr[i].DTI == true){
          numDTI ++;
        }
        if(jsonArr[i].Freesurfer == true){
          numFreesurfer ++;
        }
        if(jsonArr[i].Camino == true){
          numCamino ++;
        }
        if(jsonArr[i].Slicer == true){
          numSlicer ++;
        }
        if(jsonArr[i].FearSabrina == true){
          numFearSabrina ++;
        }
      }
      //console.log("NumDicom:");
      //console.log(numDicom);
      fillFilesTable()
    }
  };
  xmlhttp.open("GET", "../../data/canguroData.json", true);
  xmlhttp.send();
  //console.log("Hola")
}


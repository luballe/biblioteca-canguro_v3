$(function() {
    var dialogOpen = false;
    $("#jsGrid").jsGrid({
        height: "80%",
        width: "100%",
        autoload: true,
        sorting: true,
        filtering: true,
        paging: true,
        pageSize: 14,
        rowClick: function(args) {
            if(!dialogOpen)
            {
              dialogOpen = true;
              showDetailsDialog("Edit", args.item);
            }
        },
        controller: db,
        fields: [
            { name: "SubjectID", type: "text", title: "Subject ID", width: 45 },
            { name: "Name", type: "text", width: 145 },
            { name: "Cedula", type: "text", width: 70 },
            { name: "Group", type: "text", width: 45 },
            { name: "Dicom", type: "checkbox", title: "Dicom", sorting: false, width: 45 },
            { name: "Atencion", type: "checkbox", title: "Atencion", sorting: false, width: 45 },
            { name: "Coordinacion", type: "checkbox", title: "Coord.", sorting: false, width: 45 },
            { name: "Memoria", type: "checkbox", title: "Memoria", sorting: false, width: 45 },
            { name: "Miedo", type: "checkbox", title: "Miedo", sorting: false, width: 45 },
            { name: "Prension", type: "checkbox", title: "Prension", sorting: false, width: 45 },
            { name: "MPRAGE", type: "checkbox", title: "MPRAGE", sorting: false, width: 45 },
            { name: "T13D", type: "checkbox", title: "T1", sorting: false, width: 45 },
            { name: "T23D", type: "checkbox", title: "T2", sorting: false, width: 45 },
            { name: "FLAIR", type: "checkbox", title: "FLAIR", sorting: false, width: 45 },
            { name: "DTI", type: "checkbox", title: "DTI", sorting: false, width: 45 },
            { name: "Freesurfer", type: "checkbox", title: "Freesurfer", sorting: false, width: 45 },
            { name: "Camino", type: "checkbox", title: "Camino", sorting: false, width: 45 },
            { name: "Slicer", type: "checkbox", title: "Slicer", sorting: false, width: 45 },
            { name: "FearSabrina", type: "checkbox", title: "Fear Sabrina", sorting: false, width: 45 },
        ]
    });
    console.log("jsgrid loaded")

    $("#detailsDialog").dialog({
        autoOpen: false,
        width: 700,
        close: function() {
            console.log("Close")
            $("#detailsForm").validate().resetForm();
            $("#detailsForm").find(".error").removeClass("error");
            // Remove all columns of paradigmsTable from the 2nd one
            var col;
            while ((col = $("#dicomTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of paradigmsTable from the 2nd one
            //var col;
            while ((col = $("#paradigmsTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of structuralTable from the 2nd one
            //var col;
            while ((col = $("#structuralTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of dtiTable from the 2nd one
            //var col;
            while ((col = $("#dtiTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of freesurfer from the 2nd one
            //var col;
            while ((col = $("#freesurferTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of camino from the 2nd one
            //var col;
            while ((col = $("#caminoTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            dialogOpen = false;
            // Remove all columns of camino from the 2nd one
            //var col;
            while ((col = $("#slicerTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            // Remove all columns of camino from the 2nd one
            //var col;
            while ((col = $("#fearSabrinaTable").find("tr :nth-child(2)")).length) {
                col.remove();
            }
            dialogOpen = false;
        }
    });

    $("#detailsForm").validate({
        rules: {
            SubjectID: "required",
            Name: "required",
            Cedula: "required",
            Group: "required"
        },
        messages: {
            SubjectID: "Please enter SubjectID",
            Name: "Please enter valid Name",
            Cedula: "Please enter the cedula for the subject",
            Group: "Please select the subject's group"
        },
        submitHandler: function() {
            formSubmitHandler();
        }
    });

    var formSubmitHandler = $.noop;

    var showDetailsDialog = function(dialogType, subject) {
        $("#SubjectID").val(subject.SubjectID);
        $("#Name").val(subject.Name);
        $("#Cedula").val(subject.Cedula);
        $("#Group").val(subject.Group);
        // Dicom file
        if (subject.Dicom)
        {
          $('#dicomTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="dicom.tar.gz" id="checkDicom" checked>Dicom</label><button id="Dicom" type="button" onClick="downloadOneFile('+subject.SubjectID+',`dicom.tar.gz`)">Download</button></td>');
          });
        }
        // Paradigms
        if (subject.Atencion)
        {
          $('#paradigmsTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="ATENCION.tar.gz" id="checkAtencion" checked>Atencion</label><button id="Atencion" type="button" onClick="downloadOneFile('+subject.SubjectID+',`ATENCION.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.Coordinacion)
        {
          $('#paradigmsTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="COORDINACION.tar.gz" id="checkCoordinacion" checked>Coordinacion</label><button id="Coordinacion" type="button" onClick="downloadOneFile('+subject.SubjectID+',`COORDINACION.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.Memoria)
        {
          $('#paradigmsTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="MEMORIA.tar.gz" id="checkMemoria" checked>Memoria</label><button id="Memoria" type="button" onClick="downloadOneFile('+subject.SubjectID+',`MEMORIA.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.Miedo)
        {
          $('#paradigmsTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="MIEDO.tar.gz" id="checkMiedo" checked>Miedo</label><button id="Miedo" type="button" onClick="downloadOneFile('+subject.SubjectID+',`MIEDO.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.Prension)
        {
          $('#paradigmsTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="PRENSION.tar.gz" id="checkPrension" checked>Prension</label><button id="Prension" type="button" onClick="downloadOneFile('+subject.SubjectID+',`PRENSION.tar.gz`)">Download</button></td>');
          });
        }
        // Structural
        if (subject.MPRAGE)
        {
          $('#structuralTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="MPRAGE.tar.gz" id="checkMPRAGE" checked>MPRAGE</label><button id="MPRAGE" type="button" onClick="downloadOneFile('+subject.SubjectID+',`MPRAGE.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.T13D)
        {
          $('#structuralTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="T13D.tar.gz" id="checkT13D" checked>T1</label><button id="T13D" type="button" onClick="downloadOneFile('+subject.SubjectID+',`T13D.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.T23D)
        {
          $('#structuralTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="T23D.tar.gz" id="checkT23D" checked>T2</label><button id="T23D" type="button" onClick="downloadOneFile('+subject.SubjectID+',`T23D.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.FLAIR)
        {
          $('#structuralTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="FLAIR.tar.gz" id="checkFLAIR" checked>FLAIR</label><button id="FLAIR" type="button" onClick="downloadOneFile('+subject.SubjectID+',`FLAIR.tar.gz`)">Download</button></td>');
          });
        }
        if (subject.DTI)
        {
          $('#dtiTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="DTI.tar.gz" id="checkDTI" checked>DTI</label><button id="DTI" type="button" onClick="downloadOneFile('+subject.SubjectID+',`DTI.tar.gz`)">Download</button></td>');
          });
        }
        // Freesurfer 
        if (subject.Freesurfer)
        {
          $('#freesurferTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="Freesurfer_Tracula.tar.gz" id="checkFreesurfer_Tracula" checked>Freesurfer / Tracula</label><button id="DTI" type="button" onClick="downloadOneFile('+subject.SubjectID+',`Freesurfer_Tracula.tar.gz`)">Download</button></td>');
          });
        }
        // Camino
        if (subject.Camino)
        {
          $('#caminoTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="Camino.tar.gz" id="checkCamino" checked>Camino</label><button id="Camino" type="button" onClick="downloadOneFile('+subject.SubjectID+',`Camino.tar.gz`)">Download</button></td>');
          });
        }

        // Slicer
        if (subject.Slicer)
        {
          $('#slicerTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="Slicer.tar.gz" id="checkSlicer" checked>Slicer</label><button id="Slicer" type="button" onClick="downloadOneFile('+subject.SubjectID+',`Slicer.tar.gz`)">Download</button></td>');
          });
        }

        // Gregory Sabrina
        if (subject.FearSabrina)
        {
          $('#fearSabrinaTable tr').each(function()
          {
            $(this).append('<td id="added"><label><input type="checkbox" hidden name="FearSabrina.tar.gz" id="checkFearSabrina" checked>Fear Sabrina</label><button id="FearSabrina" type="button" onClick="downloadOneFile('+subject.SubjectID+',`FearSabrina.tar.gz`)">Download</button></td>');
          });
        }

        formSubmitHandler = function() {
            saveClient(subject, dialogType === "Add");
        };

        $("#detailsDialog").dialog("option", "title", "Subject Details")
           .dialog("open");
    };

    var saveClient = function(subject, isNew) {
        $.extend(subject, {
            SubjectID: $("#SubjectID").val(),
            Name: $("#Name").val(),
            Cedula: $("#Cedula").val(),
            Group: $("#Group").val(),
            Complete: $("#Complete").is(":checked")
        });
        $("#jsGrid").jsGrid(isNew ? "insertItem" : "updateItem", subject);
        $("#detailsDialog").dialog("close");
    };

});

function downloadSelected() {
  var filesSelected = [];

  $( "#dicomTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#paradigmsTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#structuralTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#dtiTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#freesurferTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#caminoTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#slicerTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  $( "#fearSabrinaTable" ).find("input").each(
    function(){
      if($(this)[0].checked)
        filesSelected.push($(this)[0].name)
  });

  //$.post("/downloadMultipleFilesByUser", function(data, status){
  //  alert("Data: " + data + "\nStatus: " + status);
  //});
  
  if(filesSelected.length > 0)
  {
    $.post( "/downloadMultipleFilesByUser", { subject: $("#SubjectID").val(), "files": JSON.stringify(filesSelected) }).done(function( data ) {
      alert( "The system is processing your request. An email will be sent to " + data + " with instructions on how to download the files.");
    });
  }
  else
  {
    alert( "No files selected");
  }

  console.log(filesSelected)
}

function downloadOneFile(subject,file) {
  console.log("subject: "+subject)
  console.log("file: "+file)
 
  let
    writer,
    url = "/downloadOneFileByUser",
    data = {"file": file, "subject": subject};
    console.log("data in downloadOneFile:")
    console.log(data)
  // Here we could just simply open the link and then let
  // the SW add Content-Disposition header to that request.
  fetch(url,
        {method:"POST",
         body: JSON.stringify(data),
         headers:{'Content-Type': 'application/json'}}
  ).then(res => {
      console.log("res downloadOneFileByUser:")
      console.log(res)
      var size = res.headers.get('Content-Length')
      console.log("Size:")
      console.log(size)
      var disposition = res.headers.get('Content-Disposition')
      console.log("Disposition:")
      console.log(disposition)
      var filename
      if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]){
            filename = matches[1].replace(/['"]/g, '');
          }
      }
  
      var type = res.headers.get('Content-Type')
      console.log("Type:")
      console.log(type)
      fileStream = streamSaver.createWriteStream(filename,5,size)
      writer = fileStream.getWriter()
  
      const reader = res.body.getReader()
      const pump = () => reader.read()
          .then(({ value, done }) => done
              // close the stream so we stop writing
              ? writer.close()
              // Write one chunk, then get the next one
              : writer.write(value).then(pump)
          )
  
      // Start the reader
      pump().then(() =>
          console.log('Closed the stream, Done writing')
      )
  
  })
}

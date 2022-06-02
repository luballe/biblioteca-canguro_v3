(function() {

    var db = {

        loadData: function(filter) {

            var d = $.Deferred();
            var subjects;

//            $.ajax({
//                url: "./data/canguroData.json",
//                dataType: "json"
//            }).done(function(response) {
            $.ajax({
                method: "POST",
                url: "/getJSONData",
                dataType: "json"
            }).done(function(response) {
                //console.log("Respuesta DB:")
                //console.log(response);

                subjects= $.grep(response, function(subject) {
                return (!filter.SubjectID || subject.SubjectID.indexOf(filter.SubjectID) > -1)
                    && (!filter.Name || subject.Name.toLowerCase().indexOf(filter.Name.toLowerCase()) > -1)
                    && (!filter.Cedula || subject.Cedula.indexOf(filter.Cedula) > -1)
                    && (!filter.Group || subject.Group.toLowerCase().indexOf(filter.Group.toLowerCase()) > -1)
                    && (filter.Dicom === undefined || subject.Dicom === filter.Dicom)
                    && (filter.Atencion === undefined || subject.Atencion === filter.Atencion)
                    && (filter.Coordinacion === undefined || subject.Coordinacion === filter.Coordinacion)
                    && (filter.Memoria === undefined || subject.Memoria === filter.Memoria)
                    && (filter.Miedo === undefined || subject.Miedo === filter.Miedo)
                    && (filter.Prension === undefined || subject.Prension === filter.Prension)
                    && (filter.MPRAGE === undefined || subject.MPRAGE === filter.MPRAGE)
                    && (filter.T13D === undefined || subject.T13D === filter.T13D)
                    && (filter.T23D === undefined || subject.T23D === filter.T23D)
                    && (filter.FLAIR === undefined || subject.FLAIR === filter.FLAIR)
                    && (filter.DTI === undefined || subject.DTI === filter.DTI)
                    && (filter.Freesurfer === undefined || subject.Freesurfer === filter.Freesurfer)
                    && (filter.Camino === undefined || subject.Camino === filter.Camino)
                    && (filter.Slicer === undefined || subject.Slicer === filter.Slicer)
                    && (filter.FearSabrina === undefined || subject.FearSabrina === filter.FearSabrina);

                });
//console.log(subjects)
                d.resolve(subjects);
            });
//console.log(data)
            return d.promise();


        },

//        insertItem: function(insertingSubject) {
//            this.subjects.push(insertingSubject);
//        },
//
//        updateItem: function(updatingSubject) { },
//
//        deleteItem: function(deletingSubject) {
//            var subjectIndex = $.inArray(deletingSubject, this.subjects);
//            this.subjects.splice(subjectIndex, 1);
//        }

    };
    window.db = db;

//    db.subjects="[]"
//    $.getJSON("canguroData.json", function(json) {
//      //console.log(json); // this will show the info it in firebug console
//      db.subjects = json;
//      console.log("Termino de cargar BD");
//      //console.log(document)
//      console.log($("#jsGrid"))
//    });

}());

$(function() {
    var dialogOpen = false;
    $("#jsGrid").jsGrid({
        height: "90%",
        width: "100%",
        autoload: true,
//        sorting: true,
//        filtering: true,
        inserting: true,
        editing: true,
        paging: true,
        pageSize: 14,
        deleteConfirm: "Do you really want to delete user?",
        controller: db,
        fields: [
            { name: "_id", visible: false },
            { name: "username", type: "text", title: "Username" },
            { name: "email", type: "text", title: "Email" },
            { name: "passwordConf", type: "text", title: "Password" },
            { name: "isAdmin", type: "select", title: "Is Admin?", items: [{Name: "true",Id: 'true'},{Name: "false",Id: 'false'}],valueField: "Id", textField: "Name" },
            { type: "control" },
        ]
    });
    //console.log("jsgrid loaded")

});


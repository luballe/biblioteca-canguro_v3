(function() {

    var users;
    var db = {

        loadData: function(filter) {

            var dfrd = $.Deferred();
            $.ajax({
                method: "POST",
                url: "/listUsers",
                dataType: "json"
            }).done(function(response) {
                console.log("Respuesta server:")
                console.log(response);

                users= $.grep(response, function(user) {
                return (!filter._id || user._id.indexOf(filter._id) > -1)
                    && (!filter.username || user.username.toLowerCase().indexOf(filter.username.toLowerCase()) > -1)
                    && (!filter.email || user.email.indexOf(filter.email) > -1)
                    && (!filter.passwordConf || user.passwordConf.toLowerCase().indexOf(filter.passwordConf.toLowerCase()) > -1)
                    && (filter.isAdmin === undefined || user.isAdmin === filter.isAdmin)
                });
//console.log(users)
                dfrd.resolve(users);
            });
//console.log(data)
            return dfrd.promise();


        },

        insertItem: function(user) {
          users.push(user);
          return $.ajax({
              type: "POST",
              url: "/insertUser",
              data: user
          });
        },

        updateItem: function(user) { 
          return $.ajax({
              type: "POST",
              url: "/updateUser",
              data: user
          });
        
        },

        deleteItem: function(user) {
          var userIndex = $.inArray(user, users);
          users.splice(userIndex, 1);
          return $.ajax({
              type: "POST",
              url: "/deleteUser",
              data: user
          });
         }

    };
    window.db = db;


}());

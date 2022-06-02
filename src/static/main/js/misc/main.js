$(function() {
  console.log("Hello world!")

  let 
    writer,
    url = "/isAdmin";

 fetch(url,
     {method:"POST",
     headers:{'Content-Type': 'application/json'}})
  .then(response => {
    console.log("RESPONSE:")
    console.log(response)
    
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log("DATA:")
    console.log(data)
    if(data.isAdmin){
      $('#manageUsers').append('<a type="button" href="/manageUsers">Manage Users</a>')
    }
    
  })
  .catch(err => {
    console.log("ERROR:")
    console.log(error)
     
    // Do something for an error here
  })

});



  var puppiesAPI = (function() {

    var _rootPath = "https://ajax-puppies.herokuapp.com/";

    var getCurrentPuppies = function(callbackFunction) {
      var _breedsPath = _rootPath + "breeds.json";
      $.getJSON(_breedsPath, function(data) {
        callbackFunction(data);
      });
    };

    var registerPuppy = function(callbackFunction){
      var _$name = $('input[id="name"]').val();
      var _$breed = $('input[name="breed"]').val();
      $.ajax({
        url: "https://ajax-puppies.herokuapp.com/puppies.json",
        data: JSON.stringify({
          name: _$name,
          breed_id: 2
        }),
        type: "POST",
        contentType: 'application/json',
        dataType: "json",
        success: function(json){
          console.log(json);
        },
        error: function(xhr, status, errorThrown){
          console.log("Error: " + errorThrown);
          console.log("Status: " + status);
          console.log( xhr );
        },
        complete: function(xhr, status){
          console.log("donezo");
        }
      });
    };

    return {
      getCurrentPuppies: getCurrentPuppies,
      registerPuppy: registerPuppy
    };
  })();


$(function() {
  $("a").on("click", function(e) {
     e.preventDefault();
     puppiesAPI.getCurrentPuppies(function(data) {
      data.forEach(function(puppy) {
        $(".puppies-list").append("<p>" + puppy.name + "</p>");
      });
    });
  });

  $("input[type='submit']").on("click", function(e) {
     e.preventDefault();
     puppiesAPI.registerPuppy() 
     console.log(e)
  });

});

//  $("a").on("click", function(e){
//   e.preventDefault();
//   $.get("https://ajax-puppies.herokuapp.com/breeds.json", function(data) {
//     $(".puppies-list").append(JSON.stringify(data));
//   });
//  })



// })


// var GeoIP = ( function(){
//     // this private variable is the address you always hit up
//     var _rootPath = "http://www.telize.com/geoip";

//     // a method that gets an IP address
//     // takes a callback function
//     function selfIP(callback) {

//       $.getJSON(_rootPath,
//         function(json){
//             // trigger the callback function
//             callback(json.ip);
//         });

//     };

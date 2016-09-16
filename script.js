

  var puppiesAPI = (function() {

    var _rootPath = "https://ajax-puppies.herokuapp.com/";

    var getCurrentPuppies = function(callbackFunction) {
      var _breeds = _rootPath + "breeds.json";
      $.getJSON(_breeds, function(data) {
        callbackFunction(data);
      });
    };

    var registerPuppy = function(callbackFunction){
      var _$name = $('input[id="name"]').val();
      var _$breed = $('input[name="breed"]').val();
      $.ajax({
        url: "https://ajax-puppies.herokuapp.com/puppies.json",
        data: {
          name: _$name,
          breed: {
            name: _$breed
          }
        },
        // type: "POST",
        contentType: 'Access-Control-Allow-Origin',
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
     puppiesAPI.registerPuppy();
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

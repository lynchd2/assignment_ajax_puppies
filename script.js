

  var puppiesAPI = (function() {

    var _rootPath = "https://ajax-puppies.herokuapp.com/breeds.json";

    var getCurrentPuppies = function(callbackFunction) {

      $.getJSON(_rootPath, function(data) {
        callbackFunction(data);
      });
    };

    return {
      getCurrentPuppies: getCurrentPuppies
    }
  })();


$(function() {
  $("a").on("click", function(e) {
     e.preventDefault();
     puppiesAPI.getCurrentPuppies(function(data) {
      $(".puppies-list").append(JSON.stringify(data));
    })
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
var puppiesAPI = (function() {

  var _rootPath = "https://ajax-puppies.herokuapp.com/";

  var getCurrentPuppies = function(callbackFunction) {
    var _breedsPath = _rootPath + "puppies.json";
    $.getJSON(_breedsPath, function(data) {
      callbackFunction(data);
    });
  };

  var adoptPuppy = function(id) {
    var url = 'https://ajax-puppies.herokuapp.com/puppies/' + id + '.json';
    $.ajax({
      url: url,
      type: "DELETE",
      contentType: 'application/json',
      dataType: "json",
      success: function(puppy){
        // console.log(puppy);
        removeDogItem(puppy.id);
      },
      error: function(xhr, status, errorThrown){
        // console.log("Error: " + errorThrown);
        // console.log("Status: " + status);
        // console.log( xhr );
        $('body p').first().text('Error: ' + errorThrown);
      },
      complete: function(xhr, status){
        // console.log("donezo");
      }
    });
  };

  var removeDogItem = function(id) {
    $("[data-id='"+ id + "']").parent().remove();
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
      success: function(puppy){
        // console.log(puppy);
        addDogItem(puppy);
      },
      error: function(xhr, status, errorThrown){
        // console.log("Error: " + errorThrown);
        // console.log("Status: " + status);
        // console.log( xhr );
        $('body').prepend('<p>' + 'Error: ' + errorThrown + '</p>');
        $('body p').addClass('error');
      },
      complete: function(xhr, status){
        // console.log("donezo");
      }
    });
  };

  var addDogItem = function(puppy) {
    $(".puppies-list").prepend("<p>" + puppy.name + "</p>");
    var adoptLink = $('<a>')
          .attr('href', '#')
          .text('Adopt')
          .addClass('adopt-link')
          .attr('data-id', puppy.id);
    $('.puppies-list p').first().append(adoptLink);
  };

  return {
    getCurrentPuppies: getCurrentPuppies,
    registerPuppy: registerPuppy,
    adoptPuppy: adoptPuppy,
    addDogItem: addDogItem
  };
})();


$(function() {
  $("a").on("click", function(e) {
    e.preventDefault();
    $('.puppies-list p').remove();
    puppiesAPI.getCurrentPuppies(function(data) {
      data = data.reverse();
      data.forEach(function(puppy) {
        puppiesAPI.addDogItem(puppy);
      });
    });
  });

  $("input[type='submit']").on("click", function(e) {
    e.preventDefault();
    puppiesAPI.registerPuppy();
  });

  $('body').on('click', '.adopt-link', function(e) {
    e.preventDefault();
    var $target = $(e.target);
    // console.log($target.data('id'));
    puppiesAPI.adoptPuppy($target.data('id'));
  });

  $(document).ajaxStart(function(){
    var $progress = $('<div class="progress">').text("Waiting");
    $('body').append($progress);
    console.log("inside ajaxStart");
    var checkProgress = setTimeout(checkProgress, 1000);
  });

  var checkProgress = function(){
    console.log("inside caution");
    var $prog = $('.progress');
    if ($prog.length > 0){
      $prog.text("Sorry this is taking so long...");
    }
  };

  $(document).ajaxComplete(function() {
    console.log("inside ajaxComplete");
    var $fin = $('.progress').removeClass('progess').addClass('complete');
    $fin.fadeOut(2000);
  });
});

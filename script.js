// api key
var weatherAPI = "dc7d077cf1588e1762da25544e1a984a";
var currentCity = "";
var lastCity = "";

// search button
$(document).ready(function () {
    $("#search-button").on("click", function () {
      var searchTerm = $("#search-value").val();
      // empty input field
      $("#search-value").val("");
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    });
});


  $("#search-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13) {
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    }
  });

  var history = JSON.parse(localStorage.getItem("history")) || [];
  if (history.length > 0) {
    weatherFunction(history[history.length - 1]);
  }

  //makes a row for each element in history array(searchTerms)
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

  function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
  }

  $(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    getForecast($(this).text());

  });

 
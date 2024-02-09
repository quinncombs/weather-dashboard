// api key
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
var weatherAPI = "&appid=dc7d077cf1588e1762da25544e1a984a";
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

 function weatherFunction(searchTerm) {
  $.ajax({
    type: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}?q='+ searchTerm + weatherAPI

  }).then(function(data) {
    if (history.indexOf(searchTerm) === -1) {
      history.push(searchTerm);
      localStorage.setItem("history", JSON.stringify(history));
      createRow(searchTerm);
    }
    var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    //creates card for each condition.
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
    var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
    var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
    console.log(data)
    var lon = data.coord.lon;
    var lat = data.coord.lat;
  });
  //   $.ajax({
  //     type: "GET",
  //     url: "https://api.openweathermap.org/data/2.5/forecast?" + searchTerm + weatherAPI
  // }).then(function (res) {
  //   console.log(res)
  // })
}
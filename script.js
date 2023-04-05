// Display current date and time
$("#currentDay").text(moment().format("dddd, MMMM Do"));

$(document).ready(function () {
  // Get stored events from local storage or create an empty array
  var events = JSON.parse(localStorage.getItem("events")) || [];

  // Display time blocks for standard business hours
  for (var i = 9; i <= 17; i++) {
    var displayHour = moment(i, "H").format("hA");
    var row = $("<div>").addClass("row time-block");

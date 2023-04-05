//  current date and time
$("#currentDay").text(moment().format("dddd, MMMM Do"));

$(document).ready(function () {
  // Get stored events from local storage 
  var events = JSON.parse(localStorage.getItem("events")) || [];

  //  time blocks for standard business hours
  for (var i = 9; i <= 17; i++) {
    var displayHour = moment(i, "H").format("hA");
    var row = $("<div>").addClass("row time-block");


    // Create hour column
    var hour = $("<div>").addClass("col-2 hour").text(displayHour);
    row.append(hour);

    // Create event column
    var event = $("<textarea>").addClass("col-8 description");
    var savedEvent = events.find(function (item) {
      return item.hour === displayHour;
    });
    if (savedEvent) {
      event.text(savedEvent.event);
    }
    row.append(event);

    // Create save button column
    var saveBtn = $("<button>").addClass("col-2 saveBtn");
    saveBtn.html("<i class='fas fa-save'></i>");

    saveBtn.on("click", function () {
      // Get the event text and hour value
      var eventText = $(this).siblings(".description").val();
      var hourValue = $(this).siblings(".hour").text();

      // Update the events array with the new event or update existing event
      var existingEventIndex = events.findIndex(function (item) {
        return item.hour === hourValue;
      });
      if (existingEventIndex >= 0) {
        events[existingEventIndex].event = eventText;
      } else {
        events.push({ hour: hourValue, event: eventText });
      }

      // Save the events array to local storage
      localStorage.setItem("events", JSON.stringify(events));
    });

    row.append(saveBtn);

    // Add past, present, or future class to time block based on current time
    if (moment(i, "H").isBefore(moment(), "hour")) {
      event.addClass("past");
    } else if (moment(i, "H").isSame(moment(), "hour")) {
      event.addClass("present");
    } else {
      event.addClass("future");
    }

    $(".container").append(row);
  }
})
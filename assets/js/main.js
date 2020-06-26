moment().format();

var numberOfTimeBlocks = 12;

var currentTime = moment();

var tasks = [];

$(document).ready(function () {
  displayToday();
  displayTimeBlocks();

  
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    console.log(event.target.value);
    console.log("working");
    console.log($(".hour").val());
    // saveTask();
  });
});

function displayToday() {
  var today = moment().format("[Today is] dddd LL");
  $("#currentDay").text(today);
}

function displayTimeBlocks() {
  let blockTime = moment("06:00", "HH:mm", true);
  for (let i = 0; i < numberOfTimeBlocks; i++) {
    let timeblock = $('<form class="row time-block"></form>');
    let timeEl = $('<div class="col-2 hour"></div>');
    let textareaEl = $('<textarea class="col"></textarea>');
    let buttonEl = $('<button type="submit" class="col-2 saveBtn"></button>');
    timeblock.append(timeEl, textareaEl, buttonEl);

    $(".container").append(timeblock);
    timeEl.attr("id", i);
    timeEl.text(blockTime.format("LT"));
    buttonEl.text("save");
    buttonEl.attr("value", i);

    if (currentTime.diff(blockTime) > 3599999) {
      textareaEl.addClass("past");
    } else if (currentTime.diff(blockTime) < 0) {
      textareaEl.addClass("future");
    } else {
      textareaEl.addClass("present");
    }
    blockTime.add(1, "hour");
  }
}

function saveTask() {
  let hour = $(".id");
  console.log(hour);
  let task = { time: "", description: "" };
  
}

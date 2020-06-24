moment().format();

var numberOfTimeBlocks = 8;
var timeIncrement = 1;
var currentTime = moment();

$(document).ready(function () {
  displayToday();
  displayTimeBlocks();
  console.log(currentTime);
});



function displayToday() {
  var today = moment().format("[Today is] LL");
  $("#today").css("color", "blue");
  $("#today").text(today);
}

function displayTimeBlocks() {
  for (let i = 0; i < numberOfTimeBlocks; i++){
    let timeblock = $('<div class="row"></div>');
    let time = $('<div class="col-2 time"></div>');
    let task = $('<div class="col task"></div>');
    let button = $('<div class="col-2 button"></div>');
    $(".container").append(timeblock);
    timeblock.append(time, task, button);
    time.text(i);
    task.text("test");
    button.text("button");
  }
}


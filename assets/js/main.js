moment().format();

var numberOfTimeBlocks = 12;

var currentTime = moment();

var tasks = [];

$(document).ready(function () {
  displayToday();
  displayTimeBlocks();
  displayTasks();

  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    let timeValue = $(event.currentTarget).siblings(":first-child").attr("value");
    let textEntry = $(event.currentTarget).siblings(":nth-child(2)").val();
    saveTask(timeValue, textEntry);
  });
});

function displayToday() {
  let today = moment().format("[Today is] dddd LL");
  $("#currentDay").text(today);
}

function displayTimeBlocks() {
  let blockTime = moment("06:00", "HH:mm", true);
  for (let i = 0; i < numberOfTimeBlocks; i++) {
    let timeblock = $('<form class="row time-block"></form>');
    let timeEl = $('<label class="col-2 hour"></label>');
    let textareaEl = $('<textarea class="col"></textarea>');
    let buttonEl = $('<button type="submit" class="col-2 saveBtn"></button>');
    timeblock.append(timeEl, textareaEl, buttonEl);

    $(".container").append(timeblock);
    timeEl.attr("value", blockTime.format("LT"));
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

function displayTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    for (let i = 0; i < tasks.length; i++) {
      $('label[value="' + tasks[i].time + '"]').next().text(tasks[i].description);
    }
  }
}

function saveTask(hour, text) {
  let task = { time: hour, description: text };
  if (localStorage.getItem("tasks") === null) {
    // if localStorage is empty, setItem first
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    // if localStorage is not empty, getItem first
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

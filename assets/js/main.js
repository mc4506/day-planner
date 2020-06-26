
var numberOfTimeBlocks = 12;

var currentTime = moment();

var tasks;

$(document).ready(function () {
  displayToday();
  displayTimeBlocks();
  displayTasks();

  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    let timeValue = $(event.currentTarget).siblings(":first-child").attr("value");
    let textEntry = $(event.currentTarget).siblings(":nth-child(2)").val();
    saveTask(timeValue, textEntry);
    $(event.target).append("d ✔");
    $(event.target).css("background-color", "orange");
    setTimeout(function () {
      $(event.target).text("save");
    }, 1500);
  });
});

// FUNCTION TO DISPLAY TODAY'S DATE
function displayToday() {
  let today = moment().format("[Today is] dddd LL");
  $("#currentDay").text(today);
}

// FUNCTION TO DISPLAY TIMEBLOCKS
function displayTimeBlocks() {
  let timeEntry = moment("08:00", "HH:mm", true);
  // iterate through number of timeblocks to create form elements
  for (let i = 0; i < numberOfTimeBlocks; i++) {
    let timeblock = $('<form class="row time-block"></form>');
    let timeEl = $('<label class="col-2 hour"></label>');
    let textareaEl = $('<textarea class="col"></textarea>');
    let buttonEl = $('<button type="submit" class="col-2 saveBtn"></button>');
    timeblock.append(timeEl, textareaEl, buttonEl);

    $(".container").append(timeblock);
    timeEl.attr("value", timeEntry.format("lll"));
    timeEl.text(timeEntry.format("LT"));
    buttonEl.text("save");
    buttonEl.attr("value", i);

    // use moment.js diff method to determine past, present, future
    if (currentTime.diff(timeEntry) > 3599999) {
      textareaEl.addClass("past");
    } else if (currentTime.diff(timeEntry) < 0) {
      textareaEl.addClass("future");
    } else {
      textareaEl.addClass("present");
    }

    // increment 1 hour
    timeEntry.add(1, "hour");
  }
}

// FUNCTION TO DISPLAY PREVIOUSLY STORED TASKS FROM localStorage
function displayTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    for (let i = 0; i < tasks.length; i++) {
      $('label[value="' + tasks[i].time + '"]').next().text(tasks[i].description);
    }
  } else {
    // if no data in localStorage, initialize tasks to an empty array
    tasks = [];
  }
}

// FUNCTION TO SAVE TO localStorage.
function saveTask(hour, text) {
  // set up a task object
  let task = { time: hour, description: text };

  // if localStorage is empty, setItem first
  if (localStorage.getItem("tasks") === null) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    // if localStorage is not empty, getItem first
    tasks = JSON.parse(localStorage.getItem("tasks"));
    
    // if a previous entry for the timeblock exists, update the task description
    let j = tasks.findIndex((tasks) => tasks.time === hour);
    if (j>=0) {
      tasks[j].description = text;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
    // if a previous entry doesn't exist for the timeblock, add a new entry to the array
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}

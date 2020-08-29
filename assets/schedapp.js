var $currentDay = $("#currentDay)");
var $timeBlocks = $(".time-bolck");
var $scheduleArea = $(".schedule");
var toDoItems = [];
// format date and time properties

var todaysDate = moment().format("ddd, MMM Do");
var currentHour = moment().format("H");

// show current date
$currentDay.text(todaysDate);

$timeBlocks.each(function () {
    var $thisBlockHr = $(this);
    var thisBlkTime = parseInt(thisBlock.attr("time-sig"));
    if (thisBlkTime == currentHour) {

        $thisBlock.addClass("present").removeClass("past future");
    }

    if (thisBlkTime < curentHour) {
        $thisBlock.addClass("past").removeClass("present future");
    }
    if (thisBlkTime > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
    }

});

var parsedTodos = JSON.parse(todos);

function beginTodos() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var toDoObject = {};
        toDoObject.hour = parseInt($thisBlock.attr("time-sig"));
        toDoItems.push(toDoObject);
    });

    // Set local Storage

    localStorage.setItem("todos", JSON.stringify(toDoItems));
}

function runSchedule() {}

function saveHandler() {
    if (event.target.matches("button")) {
        var timeToUpdate = event.target.parentElement.getAttribute("time-sig");
        var itemToAdd = (($(event.target).parent()).children("textarea")).val();

        for (var i = 0; i < toDoItems.length; i++) {
            if (toDoItems[i].hour == timeToUpdate) {
                toDoItems[i].text = itemToAdd;
            }
        }

    }
}
$().ready(function () {
    beginTodos();
    $scheduleArea.click(saveHandler);

});
var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
// format date and time properties

var todaysDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


function beginSchedule() {


    // var storage = localStorage.getItem
    $timeBlocks.each(function () {
        var $thisBlock = $(this);

        var thisBlockTime = parseInt($thisBlock.attr("time-sig"));

        var todoObj = {

            time: thisBlockTime,

            text: "",
        }

        toDoItems.push(todoObj);
    });

    //save array to local storage
    localStorage.setItem("todos", JSON.stringify(toDoItems));


}

function prepareTimeBlocks() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlockTime = parseInt($thisBlock.attr("time-sig"));
        // show current date

        if (thisBlockTime == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockTime < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockTime > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}

function runSchedule() {


    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);




    for (var x = 0; x < toDoItems.length; x++) {
        var itemTime = toDoItems[x].time;
        var itemText = toDoItems[x].text;

        $("[time-sig=" + itemTime + "]").children("textarea").val(itemText);
    }


}

function saveHandler() {

    var $thisBlock = $(this).parent();

    var timeToUpdate = $(this).parent().attr("time-sig");
    var itemToAdd = (($(this).parent()).children("textarea")).val();

    for (var i = 0; i < toDoItems.length; i++) {
        if (toDoItems[i].time == timeToUpdate) {

            toDoItems[i].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    runSchedule();


}
$(document).ready(function () {


    prepareTimeBlocks();
    runSchedule();

    if (!localStorage.getItem("todos")) {

        beginSchedule();
    }

    // display today's date
    $currentDay.text(todaysDate);
    $scheduleArea.on("click", "button", saveHandler);



});
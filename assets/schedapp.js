var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-bolck");
var $scheduleArea = $(".schedule");
var toDoItems = [];
// format date and time properties

var todaysDate = moment().format("ddd, MMM Do");
var currentHour = moment().format("H");

function beginSchedule(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlkTime = parseInt($thisBlock.attr("time-sig"));

        var todoObj = {
            time: thisBlkTime,
            text: "",
        }
        toDoItems.push(todoObj);
    });

//save array to local storage
localStorage.setItem("todos", JSON.stringify(toDoItems));

}
function prepareTimeBlocks(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlkTime = parseInt($thisBlock.attr("time-sig"));
  

// show current date

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
}


function runSchedule() {
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse.apply(toDoItems);
    for (var x = 0; x<toDoItems.length; x++){
        var itemTime = toDoItems[x].time;
        var itemText = toDoItems[x].text;
        
        $("[time-sig=" + itemTime + "]").children("textarea").val(itemText);
    }
    console.log(toDoItems);
}

function saveHandler() {
    if (event.target.matches("button")) {
        var timeToUpdate = event.target.parentElement.getAttribute("time-sig");
        var itemToAdd = (($(event.target).parent()).children("textarea")).val();

        for (var i = 0; i < toDoItems.length; i++) {
            if (toDoItems[i].time == timeToUpdate) {
                toDoItems[i].text = itemToAdd;
            }
        }
        //send to local storage
        localStorage.setItem("todos" , JSON.stringify(toDoItems));
        runSchedule();
        console.log(toDoItems);

    }
}
$().ready(function () {
    beginTodos();
    runSchedule();
    $scheduleArea.click(saveHandler);

});
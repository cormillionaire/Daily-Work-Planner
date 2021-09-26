let timeSlots = $('td');
let saveBtn = $('.saveBtn');
let eventDetail = $('.eventDetail');
//Add time pull in for current day
var currentTime = moment().format("HH");
var currentDate = moment().format("dddd, MMMM D YYYY");

$("#currentDay").text(currentDate);

dailyReset();
activeHour(currentTime);
getEventDetails();


//select area, input text, click save button to persist even information
saveBtn.on('click', function addEventDetails(event) {
    event.preventDefault();
    let tdId = this.id.slice(3, 5);
    console.log(eventDetail);
    console.log(eventDetail[tdId - 9]);
    console.log(tdId);
    let eventDetailText = eventDetail[tdId - 9].value;
    console.log(eventDetail[tdId - 9].value);
    //grab section id, create entry in local storage
    localStorage.setItem("eventdetail " + tdId, eventDetailText);
    //save the details for that section (different for each tr)

});

function getEventDetails() {
    for (let i = 0; i < timeSlots.length; i++) {
        let timeSlot = timeSlots[i].id;
        let inputId = '#input-' + timeSlot;
        console.log("input " + inputId);
        let eventDetailText = localStorage.getItem("eventdetail " + timeSlot);
        //on page load, take event id and write it to the corresponding input section
        if (eventDetailText != null) {
            $(inputId).val(eventDetailText);
            console.log(eventDetailText);
        }
    }
}

//change color as hour changes through out the day
function activeHour(currentTime) {

    for (let i = 0; i < timeSlots.length; i++) {
        let timeSlot = timeSlots[i].id;
        if (currentTime < timeSlot) {
            timeSlots.eq(i).addClass('future');
            console.log("timeslot id future" + timeSlot)
        };
        if (currentTime == timeSlot) {
            timeSlots.eq(i).addClass('present');
            console.log("timeslot id active" + timeSlot);
        };
        if (currentTime > timeSlot) {
            timeSlots.eq(i).addClass('past');
            console.log("timeslot id past" + timeSlot)
        };
        localStorage.setItem("current date", currentDate);
    }
}

function dailyReset() {
    //reset event info on the new day
    let eventDate = localStorage.getItem("current date");
    if (currentDate != eventDate) {
        localStorage.clear();
    }
}
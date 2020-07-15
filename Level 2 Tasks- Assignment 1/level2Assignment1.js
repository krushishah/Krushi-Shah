// create Date object for current location
date = new Date();
let currentTime = document.getElementById("CurrentTime");
currentTime.innerHTML = date.toLocaleString();

//adding event listener to the button. 
let button = document.getElementById("btn-submit");
button.addEventListener('click', getValue);

//to get the city and offset of the city.
function getValue() {
    let Cities = document.getElementById("city").value;
    let error = document.getElementById("selectError");
    if (Cities !== "Default") {
        error.style.display = "none";
        let Offset = document.getElementById(Cities).getAttribute("offset");
        calcTime(Cities, Offset);
    }
    else{
        error.style.display = "block";
    }
}
//to calculate new time of selected city.
function calcTime(Cities, offset) {
    let time = document.getElementById("Time");
    // get UTC time in msec and add offset of local time in msec
    utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    // create new Date object for different city
    nd = new Date(utc + (3600000 * offset));
    time.innerHTML = Cities + " Time is " + nd.toLocaleString();
}

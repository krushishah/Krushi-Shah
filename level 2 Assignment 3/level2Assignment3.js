let cancel
//this function check the time to trigger alarm.
function startAlram() {
    cancel = setInterval(triggerAlarm, 1000);
}
let date = new Date();
let alarms = localStorage.getItem('Alarm');
if (alarms == null) {
    alarmObj = [];
}
else {
    alarmObj = JSON.parse(alarms);
}
let weekday = new Array();
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
//this function displays the clock
function TimeDate() {
    let currentdate = new Date();
    document.getElementById("clock").style.display = "block";
    document.getElementById("alarmList").style.display = "none";
    document.getElementById("AlarmPLaying").style.display = "none";
    document.getElementById("AddEdit").style.display = "none";
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let seconds = currentdate.getSeconds();
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    document.getElementById("Time").innerHTML = hours + ":" + minutes + ":" + seconds + "<small>" + weekday[currentdate.getDay()] + " " + currentdate.getDate() + " " + month[currentdate.getMonth()] + ", " + currentdate.getFullYear() + "</small>";
    document.getElementById("alarm").addEventListener("click", clockList);
}
//this function displays the list of the set Alarm
function clockList() {
    let displays = document.getElementById("displayAlarm");
    document.getElementById("clock").style.display = "none";
    document.getElementById("alarmList").style.display = "block";
    document.getElementById("AlarmPLaying").style.display = "none";
    document.getElementById("AddEdit").style.display = "none";
    document.getElementById("editAlarmList").style.display = "none";
    document.getElementById("addAlarm").addEventListener("click", addEditAlarm);
    document.getElementById("editAlarm").addEventListener("click", editAlarm);
    document.getElementById("backToClock").addEventListener("click", TimeDate);
    let alarms = localStorage.getItem('Alarm');
    if (alarms == null) {
        alarmObj = [];
        document.getElementById("noAlarms").style.display = "block";
        displays.style.display = "none";
    }
    else {
        alarmObj = JSON.parse(alarms);
        document.getElementById("noAlarms").style.display = "none";
    }
    displays.innerHTML = "";
    displays.style.display = "block";
    for (let i = 0; i < alarmObj.length; i++) {
        let hr = alarmObj[i].selectedHour;
        let min = alarmObj[i].selectedMin;
        if (hr < 10) { hr = "0" + hr }
        if (min < 10) { min = "0" + min }
        strings = `<li class="item" id="a${i}">
                    <label href="#" data-template="about" data-context-name="about" class="item-link item-content">
                    <a href="" class="remove">X</a>
                    <input type="checkbox" checked="" class="alarmOnOff">
                    <strong>${hr}:${min}<sub>${alarmObj[i].selectedAP}</sub></strong>
                    <small>${alarmObj[i].label}, ${alarmObj[i].days}</small>
                    </label>
                </li>`
        displays.innerHTML += strings;
    }
    let alarmAbleDisable = document.getElementsByClassName("alarmOnOff");
    Array.from(alarmAbleDisable).forEach(function (element) {
        element.addEventListener("click", ableDiableAlarm);
    });
    function ableDiableAlarm(e) {
        if (e.path[2].className == "item") {
            e.path[2].className = "item off";
        }
        else {
            e.path[2].className = "item";
        }
    }
}
//this function allows to add or edit the alarm
function addEditAlarm(e) {
    document.getElementById("AlarmPLaying").style.display = "none";
    document.getElementById("alarmList").style.display = "none";
    document.getElementById("editAlarmList").style.display = "none";
    document.getElementById("AddEdit").style.display = "block";
    var selecthrs = document.getElementById('alarmhrs');
    var hrs = 12;
    let indexes = 0;
    for (i = 1; i <= hrs; i++) {
        selecthrs.options[selecthrs.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
    var selectmins = document.getElementById('alarmmins');
    var mins = 59;
    for (i = 0; i <= mins; i++) {
        selectmins.options[selectmins.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
    if (e.path.length == 7) {
        document.getElementById("saveAlarmBtn").style.display = "block";
        document.getElementById("deleteAlarmBtn").style.display = "none";
    }
    else if (e.path.length == 10) {
        document.getElementById("deleteAlarmBtn").style.display = "block";
        document.getElementById("saveAlarmBtn").style.display = "none";
        let alarms = localStorage.getItem('Alarm');
        if (alarms == null) {
            alarmObj = [];
        }
        else {
            alarmObj = JSON.parse(alarms);
        }
        let labelValue = e.path[1].children[2].innerHTML.substring(0, e.path[1].children[2].innerHTML.indexOf(","));
        for (let i = 0; i < alarmObj.length; i++) {
            if (alarmObj[i].label == labelValue) {
                indexes = i;
            }
        }
        document.getElementById("deleteAlarmBtn").setAttribute("index", indexes);
        document.getElementById("alarmhrs").value = alarmObj[indexes].selectedHour;
        document.getElementById("alarmmins").value = alarmObj[indexes].selectedMin;
        document.getElementById("ampm").value = alarmObj[indexes].selectedAP;
        document.getElementById("labelDetails").value = alarmObj[indexes].label;
        document.getElementById(alarmObj[indexes].selectedTune).checked = true;
        if (alarmObj[indexes].days[0] == "Everyday") {
            document.getElementById("Monday").checked = true;
            document.getElementById("Tuesday").checked = true;
            document.getElementById("Wednesday").checked = true;
            document.getElementById("Thursday").checked = true;
            document.getElementById("Friday").checked = true;
            document.getElementById("Saturday").checked = true;
            document.getElementById("Sunday").checked = true;
        }
        else if (alarmObj[indexes].days[0] == "Weekends") {
            document.getElementById("Saturday").checked = true;
            document.getElementById("Sunday").checked = true;
        }
        else if (alarmObj[indexes].days[0] == "Weekdays") {
            document.getElementById("Monday").checked = true;
            document.getElementById("Tuesday").checked = true;
            document.getElementById("Wednesday").checked = true;
            document.getElementById("Thursday").checked = true;
            document.getElementById("Friday").checked = true;
        }
        else {
            let dayValue = alarmObj[indexes].days[0] + ",";
            let start = 0;
            let j = 0;
            let end = dayValue.indexOf(",");
            let substr;
            for (let i = 0; i < 6; i++) {
                if (dayValue == "," || dayValue == ",," || dayValue == ",,," || dayValue == ",,,," || dayValue == ",,,,,") {
                    break;
                }
                else {
                    substr = dayValue.substring(start, end);
                    document.getElementById(substr).checked = true;
                    j += 1;
                    start = j;
                    dayValue = dayValue.replace(substr, "");
                    end = dayValue.indexOf(",", j);
                }
            }
        }
    }
    $("#saveAlarm").bind("click", { indexes }, updateAlarm);
    document.getElementById("Beep").addEventListener("click", playAudio);
    document.getElementById("Radar").addEventListener("click", playAudio);
    document.getElementById("saveAlarmBtn").addEventListener("click", saveAlarm);
    document.getElementById("cancelAlarm").addEventListener("click", clockList);
    document.getElementById("deleteAlarmBtn").addEventListener("click", deleteAlarm);
}
//this funciton plays the audio.
function playAudio() {
    if (document.getElementById("Beep").checked == true) {
        document.getElementById("BeepSound").play();
        document.getElementById("RadarSound").pause();
    }
    else if (document.getElementById("Radar").checked == true) {
        document.getElementById("RadarSound").play();
        document.getElementById("BeepSound").pause();
    }
}
//this function save the alarm.
function saveAlarm() {
    clockList();
    let hr = document.getElementById('alarmhrs');
    let min = document.getElementById('alarmmins');
    let ap = document.getElementById('ampm');
    let alarms = localStorage.getItem('Alarm');
    let alarmDays = document.getElementsByClassName("list")[1];
    let selectedAlarmDays = new Array();
    let days = [];
    let day = "";
    let flag = 0;
    let j = 0;
    if (alarms == null) {
        alarmObj = [];
    }
    else {
        alarmObj = JSON.parse(alarms);
    }
    let snoozeValue = document.getElementById("snooze").checked;
    let label = document.getElementById('labelDetails').value;
    let selectedHour = hr.options[hr.selectedIndex].value;
    let selectedMin = min.options[min.selectedIndex].value;
    let selectedAP = ap.options[ap.selectedIndex].value;
    let selectedTune;
    for (let i = 0; i < document.getElementsByName("sound").length; i++) {
        if (document.getElementsByName("sound")[i].checked == true) {
            selectedTune = document.getElementsByName("sound")[i].value;
        }
    }
    for (let i = 0; i < 7; i++) {
        if (alarmDays.children[i].children[0].children[0].checked == true) {
            selectedAlarmDays[j] = alarmDays.children[i].children[0].children[1].innerHTML;
            j++;
            if (alarmDays.children[i].children[0].children[1].innerHTML == "Sunday" || alarmDays.children[i].children[0].children[1].innerHTML == "Saturday") {
                flag += 1;
            }
        }
    }
    if (selectedAlarmDays.length == 7) {
        days = ["Everyday"];
    }
    else if (selectedAlarmDays.length == flag) {
        days = ["Weekends"];
    }
    else if (selectedAlarmDays.length < 7) {
        let j = 0;
        for (let i = 0; i < selectedAlarmDays.length; i++) {
            if (selectedAlarmDays[i] != "Saturday" && selectedAlarmDays[i + 1] != "Sunday" && selectedAlarmDays.length == 5) {
                days = ["Weekdays"];
            }
            else {
                if (j == (selectedAlarmDays.length - 1)) {
                    day = day + selectedAlarmDays[j];
                    j = 0;
                }
                else {
                    day = day + selectedAlarmDays[j] + ",";
                    j++;
                }
            }
        }
        days.push(day);
    }
    alarmObj.push({ selectedHour, selectedMin, selectedAP, label, snoozeValue, selectedTune, days });
    localStorage.setItem("Alarm", JSON.stringify(alarmObj));
}
//this function display the alarm list in editable mode.
function editAlarm() {
    document.getElementById("clock").style.display = "none";
    document.getElementById("alarmList").style.display = "none";
    document.getElementById("AddEdit").style.display = "none";
    document.getElementById("AlarmPLaying").style.display = "none";
    document.getElementById("editAlarmList").style.display = "block";
    document.getElementById("editList").innerHTML = "";
    let string1, hr, min;
    for (let i = 0; i < alarmObj.length; i++) {
        hr = alarmObj[i].selectedHour;
        min = alarmObj[i].selectedMin;
        if (hr < 10) { hr = "0" + hr }
        if (min < 10) { min = "0" + min }
        string1 = `<li class="item edit" id=${i}>
          <a href="#" class="remove">X</a>
          <label href="#" data-template="about" data-context-name="about" class="item-link item-content" Name="editAlarm">
            <input type="checkbox" checked="">
            <strong>${hr}:${min}<sub>${alarmObj[i].selectedAP}</sub></strong>
            <small>${alarmObj[i].label}, ${alarmObj[i].days}</small>
          </label>
        </li>`
        document.getElementById("editList").innerHTML += string1;
    }
    let elements = document.getElementsByName("editAlarm");
    Array.from(elements).forEach(function (element) {
        element.addEventListener("click", addEditAlarm);
    });
    document.getElementById("editDone").addEventListener("click", clockList);
    let removeAlarm = document.getElementsByClassName("remove");
    Array.from(removeAlarm).forEach(function (element) {
        element.addEventListener("click", deleteAlarm);
    });
}
//this function update the alarm details.
function updateAlarm(i) {
    let indexs = i.data.indexes;
    let alarms = localStorage.getItem('Alarm');
    if (alarms == null) {
        alarmObj = [];
    }
    else {
        alarmObj = JSON.parse(alarms);
    }
    let hr = document.getElementById('alarmhrs');
    let min = document.getElementById('alarmmins');
    let ap = document.getElementById('ampm');
    let alarmDays = document.getElementsByClassName("list")[1];
    let selectedAlarmDays = [];
    let Tune, flag = 0;
    let j = 0;
    let days = [];
    let day = "";
    let flagpoint = 0;
    alarmObj[indexs].days = "";
    for (let i = 0; i < document.getElementsByName("sound").length; i++) {
        if (document.getElementsByName("sound")[i].checked == true) {
            Tune = document.getElementsByName("sound")[i].value;
        }
    }
    for (let i = 0; i < 7; i++) {
        if (alarmDays.children[i].children[0].children[0].checked == true) {
            selectedAlarmDays[j] = alarmDays.children[i].children[0].innerText;
            j++;
            if (alarmDays.children[i].children[0].innerText == "Sunday" || alarmDays.children[i].children[0].innerText == "Saturday") {
                flag += 1;
            }
        }
    }
    if (selectedAlarmDays.length == 7) {
        days = ["Everyday"];
    }
    else if (selectedAlarmDays.length == flag) {
        days = ["Weekends"];
    }
    else if (selectedAlarmDays.length < 7) {
        let j = 0;
        for (let i = 0; i < selectedAlarmDays.length; i++) {
            if (selectedAlarmDays[i] != "Saturday" && selectedAlarmDays[i + 1] != "Sunday" && selectedAlarmDays.length == 5) {
                days = ["Weekdays"];
                flagpoint = 1;
            }
            else if (flagpoint == 0) {
                if (j == (selectedAlarmDays.length - 1)) {
                    day = day + selectedAlarmDays[j];
                    j = 0;
                }
                else {
                    day = day + selectedAlarmDays[j] + ",";
                    j++;
                }
            }
        }
        if (flagpoint == 0) { days.push(day); }
    }
    alarmObj[indexs].snoozeValue = document.getElementById("snooze").checked;
    alarmObj[indexs].label = document.getElementById('labelDetails').value;
    alarmObj[indexs].selectedHour = hr.options[hr.selectedIndex].value;
    alarmObj[indexs].selectedMin = min.options[min.selectedIndex].value;
    alarmObj[indexs].selectedAP = ap.options[ap.selectedIndex].value;
    alarmObj[indexs].selectedTune = Tune;
    alarmObj[indexs].days = days;
    document.getElementById("saveAlarm").addEventListener("click", clockList);
    localStorage.setItem("Alarm", JSON.stringify(alarmObj));
}
//this function deletes an alarm
function deleteAlarm(e) {
    clockList();
    let alarms = localStorage.getItem('Alarm');
    if (alarms == null) {
        alarmObj = [];
    }
    else {
        alarmObj = JSON.parse(alarms);
    }
    if (e.path.length == 9) {
        let i = e.path[1].id;
        alarmObj.splice(i, 1);
        localStorage.setItem("Alarm", JSON.stringify(alarmObj));
        document.getElementById(i).remove();
    }
    else if (e.path.length == 7) {
        let i = e.srcElement.attributes.index.value;
        alarmObj.splice(i, 1);
        localStorage.setItem("Alarm", JSON.stringify(alarmObj));
        document.getElementById(i).remove();
    }
}
//this function triggers the alarm.
function triggerAlarm() {
    let date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    let weekdayNo = date.getDay();
    let second = seconds;
    let hour = hours;
    let minute = minutes;
    let flag;
    if (hour < 10) { hour = "0" + hour }
    if (minute < 10) { minute = "0" + minute }
    if (second < 10) { second = "0" + second }
    let selectedDays = [];
    let string = "";
    let weekdayS = new Array();
    weekdayS[0] = "Sunday";
    weekdayS[1] = "Monday";
    weekdayS[2] = "Tuesday";
    weekdayS[3] = "Wednesday";
    weekdayS[4] = "Thursday";
    weekdayS[5] = "Friday";
    weekdayS[6] = "Saturday";
    let today = weekdayS[weekdayNo];
    for (let i = 0; i < alarmObj.length; i++) {
        if (hours == alarmObj[i].selectedHour && minutes == alarmObj[i].selectedMin) {
            if (alarmObj[i].days == "Weekends") {
                selectedDays[0] = "Saturday";
                selectedDays[1] = "Sunday";
            }
            else if (alarmObj[i].days == "Weekdays") {
                selectedDays[0] = "Monday";
                selectedDays[1] = "Tuesday";
                selectedDays[2] = "Wednesday";
                selectedDays[3] = "Thursday";
                selectedDays[4] = "Friday";
            }
            else if (alarmObj[i].days == "Everyday") {
                selectedDays[0] = "Monday";
                selectedDays[1] = "Tuesday";
                selectedDays[2] = "Wednesday";
                selectedDays[3] = "Thursday";
                selectedDays[4] = "Friday";
                selectedDays[5] = "Saturday";
                selectedDays[6] = "Sunday";
            }
            else {
                let dayValue = alarmObj[i].days[0] + ",";
                let start = 0;
                let j = 0;
                let end = dayValue.indexOf(",");
                let substr;
                for (let i = 0; i < 6; i++) {
                    if (dayValue == "," || dayValue == ",," || dayValue == ",,," || dayValue == ",,,,") {
                        break;
                    }
                    else {
                        substr = dayValue.substring(start, end);
                        if (substr != "") {
                            selectedDays[i] = substr;
                        }
                        j += 1;
                        start = j;
                        dayValue = dayValue.replace(substr, "");
                        end = dayValue.indexOf(",", j);
                    }
                }
            }
            for (let j = 0; j < selectedDays.length; j++) {
                if (today == selectedDays[j]) {
                    flag = 1;
                    let sound = alarmObj[i].selectedTune;
                    if (alarmObj[i].snoozeValue == true) {
                        string = `<div class="clock">
                                    ${hour}:${minute}:${second}
                                    <small>${weekdayS[date.getDay()]} ${date.getDate()}  ${month[date.getMonth()]}, ${date.getFullYear()}</small>
                                    <p class="">
                                        ${alarmObj[i].label}
                                    </p>
                                    </div>
                                    <div class="action">
                                    <a href="#" data-panel="left" class="button open-panel" id="snoozeAlarm">Snooze</a>
                                    <a href="#" data-panel="left" class="button small" id="stopAlarm">Stop</a>
                                    </div>`
                    }
                    else {
                        string = `<div class="clock">
                                    ${hour}:${minute}:${second}
                                    <small>${weekdayS[date.getDay()]} ${date.getDate()}  ${month[date.getMonth()]}, ${date.getFullYear()}</small>
                                    <p class="">
                                        ${alarmObj[i].label}
                                    </p>
                                    </div>
                                    <div class="action">
                                    <a href="#" data-panel="left" class="button small" id="stopAlarm">Stop</a>
                                    </div>`
                    }
                    document.getElementById("alarmPageDetails").innerHTML = string;
                    document.getElementById("clock").style.display = "none";
                    document.getElementById("alarmList").style.display = "none";
                    document.getElementById("AddEdit").style.display = "none";
                    document.getElementById("AlarmPLaying").style.display = "block";
                    document.getElementById("editAlarmList").style.display = "none";
                    if (sound == "Beep") {
                        document.getElementById("BeepSound").play();
                    }
                    else if (sound == "Radar") {
                        document.getElementById("RadarSound").play();
                    }
                }
            }
        }
    }
    document.getElementById("stopAlarm").addEventListener("click", TimeDate);
    document.getElementById("stopAlarm").addEventListener("click", stopAlarm);
}
//this function stop the alarm
function stopAlarm() {
    document.getElementById("RadarSound").pause();
    document.getElementById("BeepSound").pause();
    clearInterval(cancel);
    setTimeout(startAlram, 30000);
    TimeDate();
}
startAlram();
TimeDate();
//this code checks wether the contact list is empty or it has contacts and decides which function is to be called.
let contacts = localStorage.getItem('Contacts');
var old_html;
if (contacts == null) {
    document.getElementById("zero-contacts").style.display = "block";
}
else {
    displayContact();
}
document.getElementById("btn-addContact").addEventListener('click', addContacts);
//this function add the contacts 
function addContacts(e) {
    $("#addContact").html(old_html)
    document.getElementById("contactDetails").style.display = "none";
    document.getElementById("zero-contacts").style.display = "none";
    document.getElementById("collection-list").style.display = 'none';
    document.getElementById("addContact").style.display = "block";
    old_html = $("#addContact").html();
    document.getElementById("btn-add").addEventListener('click', validate);
    document.getElementById("btn-reset").addEventListener('click', reset);
    if (e.path[0].innerHTML == "Edit") {
        let contacts = localStorage.getItem('Contacts');
        if (contacts == null) {
            contactObj = [];
        }
        else {
            contactObj = JSON.parse(contacts);
        }
        for (let i = 0; i < contactObj.length; i++) {
            if (contactObj[i].mobileNo == e.path[3].childNodes[1].childNodes[5].innerHTML) {
                var indexs = i;
            }
        }
        document.getElementById("firstName").value = contactObj[indexs].firstName;
        document.getElementById("lastName").value = contactObj[indexs].lastName;
        document.getElementById("mobileNumber").value = contactObj[indexs].mobileNo;
        document.getElementById("Email").value = contactObj[indexs].email;
    }
}
//this function reset the add contact UI.
function reset() {
    $("#addContact").html(old_html);
}
//this function validates the input on the add contact UI.
function validate() {
    let validateEmail = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/;
    let validateFirstName = /^[a-zA-Z]{3,}$/;
    let validateMobileNumber = /^[0-9]{10,10}$/;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let mobileNo = document.getElementById("mobileNumber").value;
    let email = document.getElementById("Email").value;
    let error = document.getElementById("errorList");
    let errortag = document.getElementById("errorMessage");
    let favorite = document.getElementById("Favorite").checked;
    let family = document.getElementById("Family").checked;
    let favoriteValue = "No";
    let familyValue = "No";
    if (favorite == true) {
        favoriteValue = "Yes";
    }
    if (family == true) {
        familyValue = "Yes";
    }
    if (validateFirstName.test(firstName) == false) {
        errortag.style.display = 'block';
        document.getElementById("Fname").setAttribute("class", "field error");
        error.innerHTML = error.innerHTML + `<li>First Name must have atleast 3 characters</li>`;
    }
    else if (validateMobileNumber.test(mobileNo) == false) {
        errortag.style.display = 'block';
        document.getElementById("mobile").setAttribute("class", "field error");
        error.innerHTML = error.innerHTML + `<li>Enter correct mobile number</li>`;
    }
    else if (validateEmail.test(email) == false) {
        errortag.style.display = 'block';
        document.getElementById("email").setAttribute("class", "field error");
        error.innerHTML = error.innerHTML + `<li>Enter correct Email Address</li>`;
    }
    else {
        error.innerHTML = "";
        document.getElementById("Fname").setAttribute("class", "field");
        document.getElementById("mobile").setAttribute("class", "field");
        document.getElementById("email").setAttribute("class", "field");
        errortag.style.display = 'none';
        saveContact(firstName, lastName, mobileNo, email, familyValue, favoriteValue);
    }
}
//this function save the contacts in Local Storage.
function saveContact(firstName, lastName, mobileNo, email, familyValue, favoriteValue) {
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    contactObj.push({firstName, lastName, mobileNo, email, familyValue, favoriteValue});
    localStorage.setItem('Contacts', JSON.stringify(contactObj));
    document.getElementById("addDeleteMessage").style.display = "block";
    document.getElementById("addDeleteMessage").innerHTML = "New Contact added successfully";
    displayContact();
}
//this function displays all the contacts.
function displayContact(e) {
    document.getElementById("contactDetails").style.display = "none";
    document.getElementById("addContact").style.display = "none";
    document.getElementById("collection-list").style.display = 'block';
    let tbody = document.getElementById("contactsTable");
    let values = JSON.parse(localStorage.getItem("Contacts"));
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    document.getElementById("totalContacts").innerHTML = "Contacts(" + contactObj.length + ")";
    tbody.innerHTML = "";
    for (let i = 0; i < contactObj.length; i++) {
        string1 = `<tr>
        <td class="collapsing">
          <div class="ui fitted  checkbox">
            <input type="checkbox"  class="selectForDelete"> <label></label>
          </div>
        </td>
        <td><a href="#" class="viewDetails">${values[i].firstName + " " + values[i].lastName}</a></td>
        <td>${values[i].mobileNo}</td>
        <td>${values[i].email}</td>
        <td>${values[i].favoriteValue}</td>
        <td>${values[i].familyValue}</td>
        <td class="selectable positive"><a href="#" class="edit-Contact">Edit</a></td>
        <td class="selectable negative"><a href="#" class="delete-Contact">Delete</a></td>
      </tr>`;
        tbody.innerHTML += string1;
    }
    setTimeout(function () { document.getElementById("addDeleteMessage").style.display = "none" }, 2000);
    document.getElementById("addContact-btn").addEventListener('click', addContacts);
    let editC = document.getElementsByClassName("edit-Contact");
    let deleteC = document.getElementsByClassName("delete-Contact");
    let deleteAll = document.getElementsByClassName("selectForDelete");
    let viewContact = document.getElementsByClassName("viewDetails");
    Array.from(editC).forEach(function (element) {
        element.addEventListener('click', editContact);
    });
    Array.from(deleteC).forEach(function (element) {
        element.addEventListener('click', deleteContact);
    });
    Array.from(viewContact).forEach(function (element) {
        element.addEventListener('click', viewDetail);
    });
    Array.from(deleteAll).forEach(function (element) {
        element.addEventListener('click', deleteAllContacts);
    });
    document.getElementById("Favorites").addEventListener('click', displayFavorites);
    document.getElementById("Families").addEventListener('click', displayFamily);
    document.getElementById("allContacts").addEventListener('click', displayAll);
    document.getElementById("selectedDelete").addEventListener('click',deleteSelected);
}
//this function view a particular contact details on click on the name of list of contacts.
function viewDetail(e) {
    document.getElementById("contactDetails").style.display = "block";
    document.getElementById("addContact").style.display = "none";
    document.getElementById("collection-list").style.display = 'none';
    string1 = `
                <h1 class="ui header">Contact details</h1>
                <div class="ui cards">
                    <div class="card">
                        <div class="content">
                            <div class="header" id="contactDetailsName">${e.path[2].childNodes[3].childNodes[0].innerHTML}</div>
                            <div class="meta" id="contactDetailsEmail">${e.path[2].childNodes[7].innerHTML}</div>
                            <div class="description" id="contactDetailsMobileNo">${e.path[2].childNodes[5].innerHTML}</div>
                        </div>
                        <div class="extra content">
                            <span class="left floated like">
                                <i class="check icon"></i>
                                    Favorite
                            </span>
                            <span class="right floated star">
                                <i class="star icon"></i>
                                    Family
                            </span>
                        </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button" id="edit-btn">Edit</div>
                                <div class="ui basic red button" id="delete-btn">Delete</div>
                            </div>
                        </div>
                    </div>
            </div>`;
    document.getElementById("contactDetails").innerHTML = string1;
    document.getElementById("edit-btn").addEventListener('click', addContacts);
    document.getElementById("delete-btn").addEventListener('click', deleteAfterView)
}
function displayAll() {
    document.getElementById("Favorites").setAttribute("class", "item");
    document.getElementById("Families").setAttribute("class", "item");
    document.getElementById("allContacts").setAttribute("class", "item active");
    displayContact();
}
//this function displays family cotnacts only.
function displayFamily() {
    document.getElementById("Favorites").setAttribute("class", "item ");
    document.getElementById("Families").setAttribute("class", "item active");
    document.getElementById("allContacts").setAttribute("class", "item");
    let contacts = localStorage.getItem('Contacts');
    let tbody = document.getElementById("contactsTable");
    let values = JSON.parse(localStorage.getItem("Contacts"));
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    document.getElementById("totalContacts").innerHTML = "Contacts(" + contactObj.length + ")";
    tbody.innerHTML = "";
    for (let i = 0; i < contactObj.length; i++) {
        if (contactObj[i].familyValue == "Yes") {
            string1 = `<tr>
            <td class="collapsing">
            <div class="ui fitted  checkbox">
            <input type="checkbox"  class="selectForDelete"> <label></label>
            </div>
            </td>
            <td><a href="#" class="ViewDetails">${values[i].firstName + " " + values[i].lastName}</a></td>
            <td>${values[i].mobileNo}</td>
            <td>${values[i].email}</td>
            <td>${values[i].favoriteValue}</td>
            <td>${values[i].familyValue}</td>
            <td class="selectable positive">
            <a href="#" class="edit-Contact">Edit</a>
            </td>
            <td class="selectable negative">
            <a href="#" class="delete-Contact">Delete</a>
            </td>
       
            </tr>`;
            tbody.innerHTML += string1;
        }
    }
}
//this function displays the favorites contact only.
function displayFavorites() {
    document.getElementById("Favorites").setAttribute("class", "item active");
    document.getElementById("Families").setAttribute("class", "item");
    document.getElementById("allContacts").setAttribute("class", "item");
    let contacts = localStorage.getItem('Contacts');
    let tbody = document.getElementById("contactsTable");
    let values = JSON.parse(localStorage.getItem("Contacts"));
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    document.getElementById("totalContacts").innerHTML = "Contacts(" + contactObj.length + ")";
    tbody.innerHTML = "";
    for (let i = 0; i < contactObj.length; i++) {
        if (contactObj[i].favoriteValue == "Yes") {
            string1 = `<tr>
            <td class="collapsing">
            <div class="ui fitted  checkbox">
            <input type="checkbox" class="selectForDelete"> <label></label>
            </div>
            </td>
            <td><a href="#">${values[i].firstName + " " + values[i].lastName}</a></td>
            <td>${values[i].mobileNo}</td>
            <td>${values[i].email}</td>
            <td>${values[i].favoriteValue}</td>
            <td>${values[i].familyValue}</td>
            <td class="selectable positive">
            <a href="#" class="edit-Contact">Edit</a>
            </td>
            <td class="selectable negative">
            <a href="#" class="delete-Contact">Delete</a>
            </td>
       
            </tr>`;
            tbody.innerHTML += string1;
        }
    }
}
//this fucntion delete the contact when all the contacts are displayed.
function deleteContact(e) {
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    for (let i = 0; i < contactObj.length; i++) {
        if (contactObj[i].mobileNo == e.path[2].childNodes[5].innerHTML) {
                contactObj.splice(i, 1);
        }
    }
    localStorage.setItem('Contacts', JSON.stringify(contactObj));
    document.getElementById("addDeleteMessage").style.display = "block";
    document.getElementById("addDeleteMessage").innerHTML = "Contact deleted successfully";
    displayContact();
}
//this function can delete the contact when user view the contact.
function deleteAfterView(e){
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    for (let i = 0; i < contactObj.length; i++) {
        if (contactObj[i].mobileNo == e.path[3].childNodes[1].childNodes[5].innerHTML) {
            contactObj.splice(i, 1);
        }
    }
    localStorage.setItem('Contacts', JSON.stringify(contactObj));
    document.getElementById("addDeleteMessage").style.display = "block";
    document.getElementById("addDeleteMessage").innerHTML = "Contact deleted successfully";
    displayContact();
}
//this function deletes the selected contacts.
function deleteSelected() {
    let selectD = [];
    let count=0;
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    for(let i = 0 ;i < contactObj.length ; i++){
        selectD[i] = document.getElementsByClassName("selectForDelete")[i].checked;
    }
    for(let i = 0 ; i < contactObj.length ; i++){
        if(selectD[i] == true){
            contactObj.splice(i, 1);
            selectD.splice(i,1);
            i = 0;
            count += 1;
        }
    }
    localStorage.setItem('Contacts', JSON.stringify(contactObj));
    document.getElementById("addDeleteMessage").style.display = "block";
    document.getElementById("addDeleteMessage").innerHTML = count+" Contacts deleted successfully";
    displayContact();
}
//this function deletes all the contacts.
function deleteAllContacts(){
    let selectD = [];
    let trueCount = 0;
    for(let i = 0 ;i < contactObj.length ; i++){
        selectD[i] = document.getElementsByClassName("selectForDelete")[i].checked;
        if(selectD[i] == true){
            trueCount += 1;
        }
    }
    document.getElementById("deleteAll").setAttribute("class","ui small disabled button");
    document.getElementById("selectedDelete").setAttribute("class","ui small button");
    if(selectD.length == trueCount){   
            document.getElementById("deleteAll").setAttribute("class","ui small button");
            document.getElementById("selectedDelete").setAttribute("class","ui small disabled button");
            document.getElementById("deleteAll").addEventListener('click',function(){
                localStorage.removeItem("Contacts");
                document.getElementById("addDeleteMessage").style.display = "block";
                document.getElementById("addDeleteMessage").innerHTML = "All Contacts deleted successfully";
                document.getElementById("collection-list").style.display = 'none';
                document.getElementById("zero-contacts").style.display = "block";
            });
        }
}
//this fucntion allows to edit the details of contacts.
function editContact(element) {

    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    for (let i = 0; i < contactObj.length; i++) {
        if (contactObj[i].mobileNo == element.path[2].childNodes[5].innerHTML) {
            var indexs = i;
        }
    }
    element.path[2].childNodes[3].innerHTML = "First Name<input type='text' id='newFName' value='" + contactObj[indexs].firstName + "'/><br><br>Last Name<input type='text' id='newLName' value='" + contactObj[indexs].lastName + "'/>";
    element.path[2].childNodes[5].innerHTML = "<input type='text' id='newMobileNo' value='" + contactObj[indexs].mobileNo + "'/>";
    element.path[2].childNodes[7].innerHTML = "<input type='text' id='newEmail' value='" + contactObj[indexs].email + "'/>";
    element.path[2].childNodes[9].innerHTML = "<input type='checkbox' tabindex='0' id='newFavorite' value='No'>";
    element.path[2].childNodes[11].innerHTML = "<input type='checkbox' tabindex='0' id='newFamily' value ='No'>";
    element.path[2].childNodes[13].innerHTML = '<td class="selectable positive"><a href="#" id="updateContact">Update</a></td>';
    element.path[2].childNodes[15].innerHTML = '<td class="selectable positive"><a href="#" id="cancel">Cancel</a></td>';
    $("#updateContact").bind("click", { indexs }, update);
    $("#cancel").bind("click", cancel);
}
//this function updates the details after use ofedit functionality.
function update(indexs) {
    let i = indexs.data.indexs
    let contacts = localStorage.getItem('Contacts');
    if (contacts == null) {
        contactObj = [];
    }
    else {
        contactObj = JSON.parse(contacts);
    }
    if (document.getElementById("newFavorite").checked == true) {
        document.getElementById("newFavorite").setAttribute("value", "Yes");
    }
    if (document.getElementById("newFamily").checked == true) {
        document.getElementById("newFamily").setAttribute("value", "Yes");
    }
    
    contactObj[i].firstName = $("#newFName").val();
    contactObj[i].lastName = $("#newLName").val();
    contactObj[i].mobileNo = $("#newMobileNo").val();
    contactObj[i].email = $("#newEmail").val();
    contactObj[i].favoriteValue = $("#newFavorite").val();
    contactObj[i].familyValue = $("#newFamily").val();
    localStorage.setItem('Contacts', JSON.stringify(contactObj));
    displayContact();
}
//this function cancel the change after click on edit.
function cancel() {
    displayContact();
}
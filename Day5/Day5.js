var firstname;
var lastname;
var gender;
var other;
var flag;
var employeeDetails = [];
//validate function validate the forms input.
function validate()
{
    firstname = document.forms["EmployeeDetails"]["FirstName"].value;
    lastname = document.forms["EmployeeDetails"]["LastName"].value;
    var empid = document.forms["EmployeeDetails"]["EmpID"].value;
    gender= document.forms["EmployeeDetails"]["gender"].value;
    var hobby1 = document.forms["EmployeeDetails"]["check1"].checked;
    var hobby2 = document.forms["EmployeeDetails"]["check2"].checked;
    var hobby3 = document.forms["EmployeeDetails"]["check3"].checked;
    var education = document.forms["EmployeeDetails"]["Education"].value;
    var skillset = document.forms["EmployeeDetails"]["skill"].value;
    var dateofbirth = document.forms["EmployeeDetails"]["DOB"].value;
    var status = document.forms["EmployeeDetails"]["Status"].value;
    var spouse = document.forms["EmployeeDetails"]["SpouseName"].value;
    var email = document.forms["EmployeeDetails"]["Email"].value;
    var pass = document.forms["EmployeeDetails"]["Password"].value;
    other = document.forms["EmployeeDetails"]["Other"].value;
    var ID = /^[p]{2,2}[0-9]{4,4}$/;
    var validateDate = /^(0[1-9]|[12][0-9]|3[01])[/]{1,1}(0[1-9]|1[012])[/]{1,1}(19[0-9]{2,2}|20[0-9]{2,2})$/;
    var validateEmail = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/;
    if (firstname == "") 
    {
        document.getElementById("l1").innerHTML="* fill this field"; 
        document.getElementById("FirstName").focus();
        return false;
    }
    else if(lastname == "")
    {
        document.getElementById("l2").innerHTML="* fill this field";   
        document.getElementById("LastName").focus();
        return false; 
    }
    else if(empid == "")
    {
        document.getElementById("l3").innerHTML="* fill this field";
        document.getElementById("EmpID").focus();
        return false;
    }
    else if(ID.test(empid) == false)
    {
        document.getElementById("l3").innerHTML="fill this field in correct format";
        document.getElementById("EmpID").focus();
    }
    else if(gender == "")
    {
        document.getElementById("l4").innerHTML="* fill this field";    
        return false; 
    }
    else if(hobby1 == false && hobby2 == false && hobby3 == false)
    {
        document.getElementById("l5").innerHTML="* fill this field";
        return false;
    }
    else if(education == "default")
    {
        document.getElementById("l6").innerHTML="* fill this field";
        document.getElementById("Education").focus();
        return false;
    }
    else if(skillset == "")
    {
        document.getElementById("l7").innerHTML="* fill this field";
        document.getElementById("skill").focus();
        return false;
    }
    else if(dateofbirth == "")
    {
        document.getElementById("l8").innerHTML="* fill this field";
        document.getElementById("DOB").focus();
        return false;
    }
    else if(validateDate.test(dateofbirth) == false)
    {
        document.getElementById("l8").innerHTML="* fill in dd/mm/yyyy format";
        document.getElementById("DOB").focus();
    }
    else if(status == "")
    {
        document.getElementById("l9").innerHTML="* fill this field";
        return false;
    }
    else if(spouse == "" && status == "")
    {
        document.getElementById("l10").innerHTML="* fill this field";
        document.getElementById("SpouseName").focus();
        return false;
    }
    else if (/\s/.test(spouse) == true)
    {
        document.getElementById("l10").innerHTML="* fill this field without spaces";
        document.getElementById("SpouseName").focus();
        return false;
    }
    else if (Email == "") 
    {
        document.getElementById("l11").innerHTML="* fill this field";    
        document.getElementById("Email").focus();
        return false;
    }
    else if(validateEmail.test(email) == false)
    {
        document.getElementById("l11").innerHTML="* fill this field in forexample@gmail.com";    
        document.getElementById("Email").focus();
        return false;
    }
    else if (pass == "") 
    {
        document.getElementById("l12").innerHTML="* fill this field";    
        document.getElementById("Password").focus();
        return false;
    }
    else if (other == "") 
    {
        document.getElementById("l13").innerHTML="* fill this field";    
        document.getElementById("Other").focus();
        return false;
    }
    else
    {
        alert("THANK YOU");
        flag = true;
        var table = document.getElementById("ViewTable");
        table.style.visibility = "hidden";

    }  
}
//hide function sets the label value to empty.
function hide(label)
{
    document.getElementById(label).innerHTML = "";
}
//enableDisableTextBox function allow the spousename textbox on select of martial status.
function enableDisableTextBox()
{
    var status=document.getElementById("Status");
    var SpouseName=document.getElementById("SpouseName");
    SpouseName.disabled = status.checked ? false : true ;
    if(!SpouseName.disabled)
    {
        SpouseName.focus();
    } 
}
//reset function reset the clears all fields in the form.
function reset() 
{
    document.getElementById("EmployeeDetails").reset();
    document.getElementById("FirstName").focus();
    var table = document.getElementById("ViewTable");
    table.style.visibility = "hidden";
}
//saveDetails function saves the data into array.
function saveDetails()
{
    if(flag==true)
    {
        employeeDetails.push({FirstName:firstname,LastName:lastname,Gender:gender,Other:other});
        flag = false;
    }
    else
    {
        alert("Submit the form first");
    }
    var table = document.getElementById("ViewTable");
    table.style.visibility = "hidden";
    for(var i = 1;i <= employeeDetails.length; i++)
    {
        table.deleteRow(0);
    }
}
//viewDetails function displays the array data in table format.
function viewDetails()
{
    var table = document.getElementById("ViewTable");
    table.style.visibility = "visible";
    table.style.background.fontcolor = "#FF0000";
    for(var i=0;i < employeeDetails.length ; i++)
    {
        var row = table.insertRow(0);
        var cell5 = row.insertCell(0);
        var cell6 = row.insertCell(1);
        var cell7 = row.insertCell(2);
        var cell8 = row.insertCell(3);
        cell5.innerHTML = employeeDetails[i].FirstName;
        cell6.innerHTML = employeeDetails[i].LastName;
        cell7.innerHTML = employeeDetails[i].Gender;
        cell8.innerHTML = employeeDetails[i].Other;
    }
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "First Name";
    cell2.innerHTML = "Last Name";
    cell3.innerHTML = "Gender";
    cell4.innerHTML = "Other Details";
}
//criteria function dynamically validates the password.
function criteria()
{
    var pass=document.getElementById("Password").value;
    var Upper =/^(?=.*[A-Z]).{8,}$/
    var Lower = /^(?=.*[a-z]).{8,}$/
    var Number = /^(?=.*\d).{8,}$/
    var Special = /^(?=.*[^a-zA-Z0-9]).{8,}$/
    var Length = pass.length;
    var flag = 0;
    document.getElementById("message").style.display = "block";
    document.getElementById("header").innerHTML = "Password must contain :";
    document.getElementById("lower").innerHTML = "A Lower case letter";
    document.getElementById("capital").innerHTML = "A Upper case letter";
    document.getElementById("number").innerHTML = "Atleast one number";
    document.getElementById("special").innerHTML = "A special character";
    document.getElementById("length").innerHTML = "Minimum 8 characters";
    if(Upper.test(pass) == true)
    {
        document.getElementById("capital").style.color = "green";
        flag++;
        console.log(flag);
    }
    else
    {   
        document.getElementById("capital").style.color = "red";
    }
    if(Lower.test(pass) == true)
    {
        document.getElementById("lower").style.color = "green";
        flag++;
        console.log(flag);
    }
    else
    {   
        document.getElementById("lower").style.color = "red";
    }
    if(Number.test(pass) == true )
    {
        document.getElementById("number").style.color = "green";
        flag++;
        console.log(flag);
    }
    else
    {   
        document.getElementById("number").style.color = "red";
    }
    if(Special.test(pass) == true)
    {
        document.getElementById("special").style.color = "green";
        flag++;
        console.log(flag);
    }
    else
    {   
        document.getElementById("special").style.color = "red";
    }
    if(Length > 8 )
    {
        document.getElementById("length").style.color = "green";
        flag++;
        console.log(flag);
    }
    else
    {   
        document.getElementById("length").style.color = "red";
    }
    if(flag==5)
    {
        document.getElementById("message").style.display = "none";
    }
}
//Reconfirms whether you are sure to close the page.

window.addEventListener('beforeunload' , ev =>{
    ev.returnValue = 'Are you sure?';
});





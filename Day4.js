var firstname;
var lastname;
var gender;
var other;
var flag;
function Validate()
{
    firstname = document.forms["EmployeeDetails"]["FirstName"].value;
    lastname = document.forms["EmployeeDetails"]["LastName"].value;
    var empid = document.forms["EmployeeDetails"]["EmpID"].value;
    gender= document.forms["EmployeeDetails"]["gender"].value;
    var hobby1 = document.forms["EmployeeDetails"]["check1"].value;
    var hobby2 = document.forms["EmployeeDetails"]["check2"].value;
    var hobby3 = document.forms["EmployeeDetails"]["check3"].value;
    var education = document.forms["EmployeeDetails"]["Education"].value;
    var skillset = document.forms["EmployeeDetails"]["skill"].value;
    var dateofbirth = document.forms["EmployeeDetails"]["DOB"].value;
    var status = document.forms["EmployeeDetails"]["Status"].value;
    var spouse = document.forms["EmployeeDetails"]["SpouseName"].value;
    var email = document.forms["EmployeeDetails"]["Email"].value;
    var pass = document.forms["EmployeeDetails"]["Password"].value;
    other = document.forms["EmployeeDetails"]["Other"].value;
    var ID = /^[p]{2,2}[0-9]{4,4}$/;
    var validateDate = /^(0?[1-9]|[12][0-9]|3[01])[/]{1,1}(0?[1-9]|1[012])[/]{1,1}(19?[0-9]{2,2}|20?[0-9]{2,2})$/ ;
    var validateEmail = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/;
    if (firstname == "") 
    {
        alert("First name not filled");    
        document.getElementById("FirstName").focus();
        return false;
    }
    
    else if(lastname == "")
    {
        alert("Last name not filled");    
        document.getElementById("LastName").focus();
        return false; 
    }
    else if(empid == "")
    {
        alert("Enter Employee ID");
        document.getElementById("EmpID").focus();
        return false;
    }
    
    else if(ID.test(empid) == false)
    {
        alert("PLEASE ENTER VALID EMPLOYEE ID");
        document.getElementById("EmpID").focus();
    }
    else if(gender == "")
    {
        alert("Gender not selected");    
        document.getElementById("gender1").focus();
        
        return false; 
    }
    else if(hobby1 == "" && hobby2 == "" && hobby3 == "")
    {
        alert("please select hobbies");
        document.getElementById("check1").focus();
        return false;
    }
    else if(education == "default")
    {
        alert("please select highest education");
        document.getElementById("Education").focus();
        return false;
    }
    else if(skillset == "")
    {
        alert("please fill skill set");
        document.getElementById("skill").focus();
        return false;
    }
    else if(dateofbirth == "")
    {
        alert("Please enter your birth date");
        document.getElementById("DOB").focus();
        return false;
    }
    else if(validateDate.test(dateofbirth) == false)
    {
        alert("Please enter your birth date in correct format");
        document.getElementById("DOB").focus();
    }
    else if(status == "")
    {
        alert("Select Martial Status");
        document.getElementById("MartialStatus").focus();
        return false;
    }
    else if(spouse == "" && status == "")
    {
        alert("Enter spouse name ");
        document.getElementById("SpouseName").focus();
        return false;
    }
    else if (/\s/.test(spouse) == true)
    {
        alert("space are not allowed");
        document.getElementById("SpouseName").focus();
        return false;
    }
    else if (Email == "") 
    {
        alert("please fill email");    
        document.getElementById("Email").focus();
        return false;
    }
    else if(validateEmail.test(email) == false)
    {
        alert("please fill email in correct format");    
        document.getElementById("Email").focus();
        return false;
    }
    else if (pass == "") 
    {
        alert("please fill password");    
        document.getElementById("Password").focus();
        return false;
    }
    else if (other == "") 
    {
        alert("other details is not filled");    
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

function EnableDisableTextBox()
{
    var status=document.getElementById("Status");
    var SpouseName=document.getElementById("SpouseName");
    SpouseName.disabled = status.checked ? false : true ;
    if(!SpouseName.disabled)
    {
        SpouseName.focus();
    }
    
}
function Reset() 
{
    document.getElementById("EmployeeDetails").reset();
    document.getElementById("FirstName").focus();
    var table = document.getElementById("ViewTable");
    table.style.visibility = "hidden";
}
var employeeDetails = [];
function SaveDetails()
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
function ViewDetails()
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
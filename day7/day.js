var employeeDetails = [];
var action;
employeeDetails.push({ FirstName: "krushi", LastName: "shah", Gender: "Male", Other: "I like java" });
employeeDetails.push({ FirstName: "Deep", LastName: "shah", Gender: "Male", Other: "I like c" });
employeeDetails.push({ FirstName: "Arun", LastName: "shah", Gender: "Male", Other: "I like java and c++" });
employeeDetails.push({ FirstName: "Sheela", LastName: "shah", Gender: "Female", Other: "I like python" });
//createTable creates the Table on Div tag;
function createTable()
{
	mytable = $('<table></table>').attr({ id: "basicTable",border : 1 });
	var head = $('<tr></tr>').attr({class :'header'}).appendTo(mytable);
	$('<th></th>').text("First Name").appendTo(head);
	$('<th></th>').text("Last Name").appendTo(head);
	$('<th></th>').text("Gender").appendTo(head);
	$('<th></th>').text("Other").appendTo(head);
	$('<th></th>').text("Action").appendTo(head);
	
	for (var i = 0; i < employeeDetails.length; i++) {
		var row = $('<tr></tr>').attr({ class:'viewtable'}).appendTo(mytable);
		$('<td id="Fname"></td>').text(employeeDetails[i].FirstName).appendTo(row); 
		$('<td id="Lname"></td>').text(employeeDetails[i].LastName).appendTo(row); 
		$('<td id="Gender"></td>').text(employeeDetails[i].Gender).appendTo(row); 
		$('<td id="Other"></td>').text(employeeDetails[i].Other).appendTo(row);
		action = $('<td id="action"></td>').text('').appendTo(row);
		$('<a href="#" id="edit" class="btnEdit"></a>').text("Edit").appendTo(action);
		$('<text><text>').text("|").appendTo(action);
		$('<a href="#" id="delete" class="btnDelete"></a>').text("Delete").appendTo(action);	 		 
	}
	mytable.appendTo("#box");
	$(".btnEdit").bind("click", editData);
	$(".btnDelete").bind("click", deleteData);
}
//editData makes the table data editable
function editData()
{	
	let par = $(this).parent().parent();
	let tdFName = par.children("td:nth-child(1)");
	let tdLName = par.children("td:nth-child(2)");
	let tdGender = par.children("td:nth-child(3)");
	let tdOther = par.children("td:nth-child(4)");
	let tdAction = par.children("td:nth-child(5)");
	let tdGen = tdGender.html();
	var fname = tdFName.html();
	var lname = tdLName.html();
	var gender = tdGen;
	var other = tdOther.html();
	tdFName.html("<input type='text' id='txtFName' value='"+tdFName.html()+"'/>");
	tdLName.html("<input type='text' id='txtLName' value='"+tdLName.html()+"'/>");
	tdGender.html("<input type='radio' id='GenderM' name='Gender' value='Male'/>Male <input type='radio' id='GenderF' name='Gender' value='Female'/>Female");
	if(tdGen == 'Male')
	{
		$("#GenderM").prop("checked", true);
	}
	else
	{
		$("#GenderF").prop("checked", true);
	}
	tdOther.html("<textarea id='txtAction'>"+tdOther.html()+"</textarea>");
	tdAction.html("<a href='#' id='saveAction' class='btnSave'>Save</a><text>|</text><a href='#' class='btnCancel' id='cancelAction'>Cancel</a>");
	$(".btnSave").bind("click", updateData);
	$(".btnCancel").bind("click",{fname,lname,gender,other},cancelAction);
}
//deleteData deletes the complete row from the table
function deleteData()
{
	var par = $(this).parent().parent();
	par.remove();
}
//updateData saves the data to the table
function updateData()
{
	let par = $(this).parent().parent();
	let tdFName = par.children("td:nth-child(1)");
	let tdLName = par.children("td:nth-child(2)");
	let tdGender = par.children("td:nth-child(3)");
	let tdOther = par.children("td:nth-child(4)");
	let tdAction = par.children("td:nth-child(5)");
	tdFName.html(tdFName.children("input[type=text]").val());
	tdLName.html(tdLName.children("input[type=text]").val());
	tdGender.html($(":checked").val());
	tdOther.html($('textarea#txtAction').val());
	tdAction.html("<a href='#' id='edit' class='btnEdit'>Edit</a><text>|</text><a href='#' class='btnDelete' id='delete'>Delete</a>");
	$(".btnEdit").bind("click", editData);
	$(".btnDelete").bind("click", deleteData);
}
//after click on edit if user want to cancel the edit cancelAction takes back to previous Data
function cancelAction(fname,lname,gender,other)
{	
	let par = $(this).parent().parent();
	let tdFName = par.children("td:nth-child(1)");
	let tdLName = par.children("td:nth-child(2)");
	let tdGender = par.children("td:nth-child(3)");
	let tdOther = par.children("td:nth-child(4)");
	let tdAction = par.children("td:nth-child(5)");
	tdFName.html(fname.data.fname);
	tdLName.html(fname.data.lname);
	tdGender.html(fname.data.gender);
	tdOther.html(fname.data.other);
	tdAction.html("<a href='#' id='edit' class='btnEdit'>Edit</a><text>|</text><a href='#' class='btnDelete' id='delete'>Delete</a>");
	$(".btnEdit").bind("click", editData);
	$(".btnDelete").bind("click", deleteData);
}
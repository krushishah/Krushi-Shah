var classname;
let idname;
//Allow element to drop into dropbox
function allowDrop(ev) {
    ev.preventDefault();
    document.getElementById(idname).style.color="green"    
}
//dargs the element 
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.className);
    idname = ev.target.id;
    classname = ev.target.className;
}
//drops the element
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementsByClassName(data)[0]);
}
//when enter the drop with dragged element and check is element allowed to drop in the box 
function dragEnter(e)
{
    let id=e.target.id;
    let ev = e;
    if(id == classname)
    {
        allowDrop(ev);
    }
    else
    {
        document.getElementById(idname).style.color='red';
    } 
}


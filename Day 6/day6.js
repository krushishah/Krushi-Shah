var counter=0;
document.getElementById("l1").addEventListener("click",increment);
document.getElementById("l2").addEventListener("click",decrement);
var elements=document.getElementsByClassName("listclass");
Array.from(elements).forEach(function(element) {
    element.addEventListener('click', index);
  });
//increment function is used to increment the counter.
function increment()
{
    counter++;
    document.getElementById("count").innerHTML = "Counter : - "+counter;
}
//decrement function is used to decrement the counter.
function decrement()
{   
    counter--;
    document.getElementById("count").innerHTML = "Counter : - "+counter;
}
//function popup with index no of clicked li element in alert
function index(e)
{
    alert(" index : "+e.target.value);
}




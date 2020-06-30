var counter=0;
const listName = document.getElementsByClassName("list")[0];
document.getElementById("l1").addEventListener("click",increment);
document.getElementById("l2").addEventListener("click",decrement);
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
function index(value)
{
    let val = value;
    alert(" index : "+val);
}






//0.Creating array using "new" .
var MAN = new  Array();
var MAchiNe = new Array();


//1.Creating a array and seperating it with  "|" .
console.log("1.");
var Array1 = new Array(1,2,3,4,"MAN","AND","MAchiNe");
console.log("OUTPUT :- ");
console.log( Array1.join(" | "));
console.log();

//2.Copy  Array elements.
console.log("2.");
var Array2 = new Array();
let j = 0;
for (let i = 0; i < Array1.length; i++)
    {
        if(Array1[i] == 4 | Array1[i] == "MAN")
            {  
                Array2[j]=Array1[i];
                j++;
            }
    }

console.log("OUTPUT Array2 :- ");
console.log(Array2);
console.log();

//3.Replacing Array elements.
console.log("3.");
console.log(Array1);
Array1.splice(1,2,8,16);
console.log("OUTPUT :- ");
console.log(Array1);
console.log();


//4.Sorting array as per the condition.
console.log("4.");Array1.sort().sort((a,b) => b-a);
let index1 = Array1.indexOf(1);

for(let i = 0;i < Array1.length-index1; i++)
{   
    Array1.push(Array1[i]);
    i--;
    Array1.shift();
    if(Array1.indexOf(1) == Array1.length-1)
    {
        break;
    }
}
console.log("OUTPUT :- ");
console.log(Array1);
console.log();
//With this code there 1 limitation that i assumed that array consist of elememt 1 and smallest integer is 1.
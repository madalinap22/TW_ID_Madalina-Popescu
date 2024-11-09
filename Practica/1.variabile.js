var x = 5;
const y = 7;
let z = 9;

console.log(x);

var a;
console.log(a);


if(true)
{
    var b = 9;
    let c = 10;

console.log("variabila let",c);
}

console.log(b);
//console.log(c); //eroare  "c is not defined"


//operatori
//operatorii de comparatie pot fi folositi si pe strings

let text1 = "Ana";
let text2 = "Banana";

let result = text1 < text2;
console.log(result);

let res2 = text1 +" "+ text2;
console.log("concatenare",res2);

//atribuire

let t1 = "Mere ";
let t2 = "verzi";

//t1 += t2;
t1 += "verzi"

console.log("atribuire: ",t1);

//strings and numbers

t1 += 5;
console.log("strings and numbers: ",t1);

//operatorul +
console.log(3 + 3); //6
console.log(3 - 3);//0

console.log(3 + "3"); // 33; concatenare -> operatorul "+" este supraincaract pt clasa string
console.log(3 - "3"); //operatorul "-" nu este supraincarcat, dar 3 este number si incearacsa converteasca tipul string la number si daca reuseste se aplica diferenta

console.log(3 - "Ana"); //NaN (Not a Number) -> nu reuseste sa converteasca la number

console.log(1 + 2 + 3);
console.log(1 + "2" + 3);
console.log(1 + +"2" + 3); //+"2" ->converteste tipul string la tipul number; face conversie si apoi 1+2 + 3

console.log(typeof("2")); //string
console.log(typeof(+"2")); //number

//operatorul =
if(1 == "1") //comparatie doar pe valoare
{
    console.log("Am intrat");
}
else{
    console.log("Nu am intrat");
}
if (1 === "1")  //compara tipul si valoarea
{
console.log("Am intrat")
}
else{
    console.log("Nu am intrat");
}

//recomandare de folosit ===  (strong type)

//Validari de null
//mai intalnim in alte limbaje: null, undefined, "", "      "

//instructiuni de baza - JS Statements

let array1 = ["test1", "test2", "test3"];

//for in afiseaza pozitiile; similar cu for-ul clasic; poate itera pe un oiect, dar i-ul nu este indexul ci proprietatea (nume, email, etc).
//daca trebuie sa gasim o proprietate, de exemplu. La valoarea proprietatii facem la fel: "obj1[i]"
for(let i in array1)  
{
    console.log(i);
}

//for in cu acces valoare "console.log(array1[i])"
for(let i in array1)  
    {
        console.log(array1[i]);
    }

//for of -> for each-ul de la alte limbaje; nu itereaza pe un obiect
for (i of array1)
{
    console.log(i);
}

//iterare obiect
let obj1 = {
    x: 0,
    y: 1
}

for (i in obj1)
{
    console.log(i); //afiseaza x, y
}

console.log(obj1); //afisare obiect


let array2 = ["Ioana", "Alexandra", "Mihaela"];

//adaugare elemente
array2.push("Adrian"); //adauga element la final
console.log(array2);

//sterge ultima pozitie
array2.pop();

//adauga pe prima pozitie
array2.unshift("Georgel");

//sterge prima pozitie
array2.shift();


//adaugare la pozitie
array2.splice(1,0,"Octavian"); //1-> pozitia de la care vreau sa incep, 0->cate elemente m-ar interesa sa sterg 
                                //(daca vreau sa sterg); 
                               //parametrul 3 cate elemente m-ar interesa sa adaug
console.log(array2);

//splice -> are fie 3 parametri, fie 2



//copiere array la pozitie
let arrayNew = array2.slice(1,3); //copiaza elemnetele de la pozitia 1 la 3 (3 nu este inclus)

console.log(arrayNew);

array2.forEach((item, index) =>{
    console.log(item + " "+ index);
})




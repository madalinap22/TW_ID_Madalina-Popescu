function square(a, b){
    return a*b;
}

console.log(square(2,3));


//arrow function => functii care primesc alte functii ca parametru
//cand ne declaram un arrow function pe care o sa o mai folosim o declaram cu const

const squareArrow = (a, b) => a*b;
console.log(squareArrow(2,3));

//object.freeze

const arr = Object.freeze(["Mihai", "Andrei"]);
const obj2 = Object.freeze({x : 0, y : 0 });

//arr.push("Dana"); //eroare

//functie recursiva => functie care se apeleaza ea pe ea
function loop(x){
    console.log(x)
    if(x>= 10)
    {
        return;
    }
    x++;
    loop(x);  
}
loop(10);

//functie ca parametru
// second() - luam rezultatul ei, invocam functia
//second - trimitem functia mai departe pentru a fi invocata in alta parte

function first(second){
second();
}

function second()
{
   console.log("print");
}

//first(second()); //!NO-se executa. Cand vrem sa o trimitem mai departe o trimitem fara ()

first(second);

//Rest Parameters
function multiplicator (multiplicator, ...numbers){ //...numbers va fi interpretat ca un arrray
for(item of numbers){
    console.log(item*multiplicator);
}
}

multiplicator(2, 1, 2, 3 );

//shallow copy vs deep copy
//Shallow copy -> copiaza primul nivel, referinta
//Deep copy -> copiaza toate nivelele (referinta + obiect)

//shallow copy
let obj3 = {color: "Blue", age: 20};

function copy(ob){
    ob.color = "red";
    console.log(ob)
}

//copy(obj3);

//deep copy

function copy(ob){
    let obj4 = JSON.parse(JSON.stringify(ob));
    ob.color = "red";
    console.log(ob);
    console.log(obj4);
}

copy(obj3);

//functie deepClone
let ob1 = {nume: "Andreea", varsta: 25};

function deepClone(ob){
    return JSON.parse(JSON.stringify(ob)); //stringify il transforma in string si parse inapoi in obiect
}

let obNou = deepClone(ob1);
console.log("functie deep clone")
console.log(obNou);

//to do! metode de comparare obiecte - operatori vs functii


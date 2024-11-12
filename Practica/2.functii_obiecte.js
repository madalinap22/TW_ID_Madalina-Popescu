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


//nested function (functie in functie). Intr-o functie de JS imi declar alte functii

function square(a,b){
    function sum(a){
        return a+a;
    }
  return sum(a) * sum(b);
}

console.log(square(2,3));  //face produsul a 2 sume: 2*2 + 3*3

function outSideFunc(x){
    function insideFunc(y){
        return x * y;
    }

    return insideFunc; //fara () -> doar returneaza functia nu o invoca; ca sa o invoce trebuie dat (5) - o invoci cu un parametru
}

let c  = outSideFunc(2);
console.log(c);

console.log(outSideFunc(2));

//ca sa iau rezultatul
let result = c(5);
console.log(result); //output 10

//sau
console.log(outSideFunc(2)(5)); 

//aplicabilitate
//intorc un set de functii. functiile de nivelul 2 sunt tinute intr-un obiect
//varianta veche
function Persoana(name){
    let age;
    return {
        getName: () =>name,
        setName: (newName) => name= newName,
        getAge: () => age,
        setAge: (newAge) => age = newAge,
        getNameAndAge: () => `${name} are ${age} ani. Este un om tanar` //tilda cu ${} pt string-uri
    }

}
let p = Persoana("Ionut");
console.log(p);

//invocare functii: obiect + metoda
console.log(p.getName());
p.setAge(20);
console.log(p.getNameAndAge());


let myArr = [
    {id:1, name: "Ionut", isActive: true, age: 25},
    {id:2, name: "Raluca",isActive: true, age: 20},
    {id:3, name: "Alex",isActive: false, age: 30},
    {id:4, name: "Alex",isActive: true, age: 18}
]

console.log(myArr);

//filtrare array
//.filter este similar cu clauza WHERE din sql
//la .filter sa verificam ca nu e un array empty
let f = myArr.filter(item => item.isActive); //filter intaorce un nou array, daca nu matchuieste intoarce un array empty
console.log(f);

//intoarce primul element care indeplineste conditia sau undefined
//la .find sa verificam ca nu intoarce undefined
console.log(myArr.find(item => item.name === "Alex"));

// .map -> face un array cu noile proprietati
//similar cu clauza SELECT din sql
console.log(myArr.map(item => item.name)); //intoarce un array de stringuri cu numele
console.log(myArr.map(item => { return item.name } )); //similar cu linia de mai sus

//!!!niciodata nu punem clauze de filtrare in map. Pentru ca .map nu filtreaza array-ul

let p1 = myArr.filter(item => item.isActive);
console.log(p1.map(item => item.name));

//sau:
console.log(myArr.filter(item => item.isActive).map(item => item.name)); //pt ca intorc array-uri si sunt metode care lucreaza pe array-uri

//dupa orice functie care imi intorce un array pot folosi alta care intoarce tot un array. .find intoarce un obiect

//verificam daca am un element care este activ
//.some() verifica ceva, intoarce true/false 
//negatia ei este every() care le parcurge pe toate, nu se recomanda (ca le parcurge pe toate). Some este mai performant pt ca face break
//pt asta putem face un some pe dos, vad daca am unul inactiv, deci nu toate sunt active
console.log(myArr.some(item => item.isActive)); 
console.log(myArr.some(item => !item.isActive)); //falsy value, vad daca am elemente inactive


//sort folosit pe strings
console.log(myArr.sort((a, b) => a.name.localeCompare(b.name))); //pt sortare inversa schimbi a cu b la localeCompare

//sau
let ar1 = myArr.sort((a, b) => {
    if (a.name < b.name) return -1; // a.name comes before b.name
    if (a.name > b.name) return 1;  // a.name comes after b.name
    return 0; // a.name is equal to b.name
});  //pt sortare inversa schimbi <; >
console.log(ar1);



//sort numbers
console.log("sort numbers")
console.log(myArr.sort((a, b) => a.age - b.age)); //compare function ca sa le sorteze numeric



//toString => converteste un numar, boolean sau un string in String
//custom toString pe 1 obiect
let person = {
    name: "John",
    age: 30,
    toString: function() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
};

console.log("toString pe 1 obiect: ", person.toString());

//custom toString pe un array de obiecte
//in loc de transformare array in string prin .map si apoi toString() putem folosi JSON.stringfy
let stringRepresentation = myArr.map(item => (
     ` id: ${item.id}, name: ${item.name}, isActive: ${item.isActive}, age: ${item.age}`
)).toString();

console.log("toString pe obiecte: ", stringRepresentation);

//inlocuire toString pe o serie de obiecte cu JSON.stringfy
let stringRepresentation2 = JSON.stringify(myArr);
console.log("inlocuire toString cu json stringfy: ", stringRepresentation2);


//reduc array-ul la un singur element
//.reduce() -> parcurge left to right; 
//.reduceRight -> parcurge right to left; un fel de for descrescator
let nr = [1,2,3,4,5,];
console.log(nr.reduce((a, b) => a + b)); //= 15, aduna valoarea previous cu cea curenta;

//.join() => transforma intr-un string cu separator
//converteste fiecare element al unui array intr-un string folosind toString()
console.log(nr.join("; "));

//.join() pe obiecte
let joinedString = myArr
    .map(item => `id: ${item.id}, name: ${item.name}, isActive: ${item.isActive}, age: ${item.age}`)
    .join(" / ");

console.log("join pe un array de obiecte:", joinedString);

//declarare obiecte sub forma de class
class Om{
    constructor(age, name){
        this.age = age;
        this.name = name
    }
    getName = () => this.name
}

let o = new Om(20, "Nume");
console.log(o);

class Student extends Om{
    constructor (age, name, faculty){
        super(age,name);
        this.faculty = faculty
    }

}

let s = new Student(20, "Nume", "ASE");
console.log(s);

//declarare enum - declar niste string-uri sau niste int-uri
//varianta de enum la JS
const ColorEnum = Object.freeze({
    RED: 1, //red inseamna 1
    BLUE: 2

})
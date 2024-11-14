//2 modalitati de a scrie cod: sincron (cod care se executa linie cu linie) si asincron
//main thread al aplicatiei (interfata)
//multi-thread -> pot rula cod in paralel
//JS - single hread

//Request -> aplicatia Client(app de interfata) se va integra cu un Server si acesta va avea acces la baza de date, de exemplu
//Event Loop (mecanism implementat in Js) vede ca este o operatie asincrona (request) si o inregistreaza intr-o coada. 
//Cat timp ea sta in coada Js va executa alte functii. thread-ul principal nu se va bloca
//cand operatia are statusul de Operation Complete inseamna ca am datele si pot executa metoda, din coada va fi aruncata inapoi ca JS sa o execute

//Modalitati:
//1.callback
//2.promise - cele mai folosite
//3.async await - cele mai folosite

//simulare
const posts =[
        {title: "Post One", body: "This is post one"},
        {title: "Post Two", body: "This is post two"} 
];

function getPosts()
{
    setTimeout(()=>
    {
        let output = [];
        posts.forEach((post)=>{
            output.push(post);
        })

        console.log(output);
    }, 2000)
}

// getPosts();
// console.log(1);

//orice metoda care foloseste callback poate fi rescrisa cu promise
//callback
function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        console.log("Adaugare");
        callback();
    }, 2000)
}

getPosts();
//createPost({title: "Post 3", body: "This is post 3"}, getPosts)

//promise - nu avem de metode ca parametru
function createPostPromise(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
           
            const error = false;

            if (!error)
                resolve();
            else
                reject("Error");

        }, 2000)
    })
}

//consumare promise
//try-catch-ul nu merge pe un promise

// createPostPromise({title: "Post 3", body: "This is post 3"})
// .then(getPosts) //.then() ce vrei sa se intample dupa ce s-a executat promise-ul


//fetch API
// const promise1 = Promise.resolve("Hello");
// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, "Bye");
// })
// const promise3 = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())

// Promise.all([promise1, promise2, promise3]).then(values => console.log(values));


//ASYNC - AWAIT
async function createElem()
{
    await createPostPromise({title: "Post 3", body: "This is post 3"});
    getPosts();
}

// createElem();
// console.log(5);

//rescriere fetch cu async away
async function fetchData(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log(res);
    const data = await res.json();
    console.log(data);
}

fetchData();

//fetch este un promise la promise; mai simplu cu ajax

//EVENIMENTE
//document ruleaza doar in browser; nu si in terminalul JS
const btn = document.getElementById("btnId");
if(btn){
    btn.addEventListener("click", function(e){//atasez un eveniment de click la elementul btn; //function(e) =functie callback care se executa cand este apasat butonul (adica evenimentul de click are loc)
        e.preventDefault(); //in caz ca pun script-ul din html intr-un form
        e.stopPropagation(); //opresc propagarea evenimentului din buton pe o iconita pusa pe buton, de exp
        console.log("test 2");
    })
}

//function(e) = functie callback, se declanseaza la evenimentul click
//Functie callbak = este o funcție care este transmisă ca argument unei alte funcții și este executată mai târziu, de obicei după ce un eveniment sau o operațiune specifică este completată.
//Pe scurt: Cand ceva se intampla, apeleaza aceasta functie
//De ce folosim funcții callback?
//Gestionarea evenimentelor: Callback-urile sunt folosite pentru a gestiona evenimente precum click-uri, trimiterea de formulare, sau răspunsuri de la server.
//Operațiuni asincrone: Callback-urile sunt esențiale pentru gestionarea operațiunilor asincrone, cum ar fi cereri de date de la un server, fără a bloca executarea codului.
//Modularitate și reutilizare: Funcțiile callback fac codul mai modular și mai ușor de reutilizat.




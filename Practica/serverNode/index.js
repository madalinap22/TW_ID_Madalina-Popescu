//LOGICA UNUI SERVER

import express from 'express'
import cors from 'cors'

//configuratii de baza pt aplicatie
let app = express();  //instanta a app Express
let router = express.Router();  //obiect router pt gestionarea grupurilor de rute (rute modulare)

app.use(express.json());  //folosim date in format json
app.use(express.urlencoded({ //url-ul poate fi extins (exp, la filtrarea in BD)
    extended: true
}))

//orice server poate avea un singur folder static unde se afla aplicatia de FE (""public")
app.use(express.static('public')) //trebuie sa ii zic aplicatiei care este folderul static 



//Cross-Origin Resource Sharing-CORS
app.use(cors());  //permite aplicatiei sa gestioneze cereri venite de la alte origini (un frontend care rulează pe un alt domeniu decât serverul)
app.use("/api", router); //spune aplicației Express să folosească router pentru toate rutele care încep cu /api. De exemplu, dacă adaugi o rută /users în router, aceasta va fi disponibilă la /api/users.

//va fi inlocuita cu BD
let data = [
    {
        "id": 1, "name": "Alex", "Faculty": "ASE"
    },
    {
        "id": 2, "name": "Mihai", "Faculty": "ASE"
    },
    {
        "id": 3, "name": "Ionut", "Faculty": "Poli"
    },
    {
        "id": 4, "name": "Octavian", "Faculty": "Medicina"
    },
    {
        "id": 5, "name": "George", "Faculty": "Universitate"
    },
]
//!! daca modific orice la codul de BE - trebuie inchis si repornit Postman 
//definirea rutelor de baza: GET, GETbyID, PUT, POST, DELETE

//MIDDLEWARE - orice request trece mai intai prin acest middleware - loc unde putem handle erorile generale (la fel si pt autentificare)
router.use((req, res, next)=>{
    console.log("middleware");
    next();
    })

//GET - nu are body. Toate datele care se trimit se pun in ruta/link
function getData(){
    return data;
}

router.route("/data").get((req, res) => 
    {//se apeleaza o metoda care lucreaza cu BD
        res.json(getData());    
})

//getById
function getDataById(id){
    return data.find(x => x.id === parseInt(id))
}

router.route("/data/:id").get((req, res) => //sau router.route("/data/:id/:name/:surname" = route parameters sunt mandatory, trebuie neaparat sa le dam o valoare (nu poti fi null). Pentru filtrare avem query parameters
    {
        res.json(getDataById(req.params.id));   //params obiect care contine toti parametrii
})

//POST
function createData(elem){
    data.push(elem);
    return elem;
}

router.route("/data").post((req, res) => 
    {
        res.json(createData(req.body));  //  elementul se trimite in body-ul request-ului nu in link (ca sa nu vada user-ul link-ul cu valorile noului element)
})

//UPDATE -primim un id si un element
function updateElem(id, elem){
    if(parseInt(id) !== parseInt(elem.id)){
        return "Error";
    }

    data = data.map(obj => obj.id === parseInt(id) ? elem: obj);
    //data = data.map(obj => {obj.id === parseInt(id) ? elem: obj}); //array-ul devine undefined; orice functie care nu are un return type intoarce undefined by default
    //data = data.map(obj => {return obj.id === parseInt(id) ? elem: obj}); Cand folosesc aceste {} intr-o metoda, intr-un arrow function si daca trebuie sa returneze ceva punem "return"
    return elem;
}

router.route("/data/:id").put((req, res)=> {
    res.json(updateElem(req.params.id, req.body));
})

//DELETE
function deleteElem(id){
    let el = getDataById(id);

    if (!el){
        return "Element deja sters";
    }

    let index = data.indexOf(el);
    data.splice(index, 1);
    return data;
}

router.route("/data/:id").delete((req, res)=> {
    res.json(deleteElem(req.params.id, req.body));
})





let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);


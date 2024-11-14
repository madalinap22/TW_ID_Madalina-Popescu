const link = "https://jsonplaceholder.typicode.com/posts/"; //API //mai punem un / la sfarsitul rutei ca sa puntem face delete dupa id

let postsToUse = [];

headerObj = {
    headers:{
        "Content-Type": "application/json"
    }
}
//De ce este important headerObj in Axios?
// Când faci o cerere POST (sau alte cereri care trimit date, cum ar fi PUT) și trimiți date în format JSON, trebuie să specifici acest antet pentru ca serverul să știe cum să interpreteze datele.
// Fără acest antet, serverul ar putea să nu înțeleagă corect formatul datelor transmise sau să le respingă.



//GET - creare metoda de API
async function getPosts(){
    let posts = (await axios.get(link)).data;
    console.log(posts)
    return posts
}

//GET
async function callGetPosts(){
    //ca sa nu randam de 100 ori
    let table = document.getElementById("tableId")
    if (table)
        return;

    let p = await getPosts();
    postsToUse = JSON.parse(JSON.stringify(p)); //Transformă obiectul p într-un șir de caractere (string) JSON (serializare in JSON; JSON.parse(...) ransformă șirul de caractere JSON înapoi într-un obiect JavaScript 
    renderTable(postsToUse);
}

//POST - creare metoda de API
async function createPosts(post){
    let newElem = (await axios.post(link, post, headerObj)).data;
    console.log(newElem)
    return newElem
}

//POST - creaza o noua postare si actualizeaza tabelul
async function callCreatePost(post){
    let p = await createPosts(post);
    postsToUse.push(p);
    renderTable(postsToUse);
}

//DELETE - se face dupa un id
//pas 1 - metoda asincrona
//pas 2 - apelarea metodei cand dam click pe buton - daugam un eveniment in metoda de renderTable dupa ce am creat butonul de delete
//pas 3 - apelare API, sters din array (blobal state) elementul nostru si de randat tabelul fara acel element

async function deletePosts(postId){
    let deleteElem = (await axios.delete(link + postId)).data;
    console.log(deleteElem)
    return deleteElem  //intoarce elementul sters
}

async function callDeletePost(postId){
     return await deletePosts(postId);
}

//UPDATE
//Pas 1 - creare formular in html
//Pas 2 - metoda asincrona GetById- ca atunci cand dau click pe butonul ed Update sa-mi populeze in campurile de UserId, Title si Body datele din array
//Pas 3 - actualizarea datelor la Submit

async function getPostsById(postId){
    let post = (await axios.get(link + postId)).data;
    console.log(post)
    return post
}

//apelare date pt update si setarea datelor
async function callGetPostById(postId){
    let post = await getPostsById(postId);

    //populare campuri din html
    document.getElementById("putUserId").value = post.userId;
    document.getElementById("putTitle").value = post.title;
    document.getElementById("putBody").value = post.body;

    document.getElementById("putId").textContent = post.id; //label-ul ascuns din html

}

//pas 3 - update - metoda care ne apeleza API(backend-ul)
async function updatePosts(post, postId){
    let updateElem = (await axios.put(link + postId, post, headerObj)).data;
    console.log(updateElem)
    return updateElem
}

async function callUpdatePost(post, postId){
    let updateElem = await updatePosts(post, postId);
    postsToUse = postsToUse.map(obj => parseInt(obj.id) === parseInt(postId) ? updateElem : obj);
    renderTable(postsToUse);

}


//creare si scriere tabel
function renderTable(posts){
    if(!posts || posts.length === 0){  //conditie ca am minim 1 obiect
        return;
    }
    //un refresh fortat pt metodele de put/post; la REACT sta pe alta pagina
    let oldTable = document.getElementById("tableId")
    if (oldTable)
        document.body.removeChild(oldTable);

    //creare tabel
    let table = document.createElement("table");
    let tableHeader = document.createElement("thead"); //capul de tabel
    let tableBody = document.createElement("tbody");

     //creare antet/ cap de tabel
    let headerRow = document.createElement("tr");
   
    for(i in posts[0]){ //i =index; posts[0] primul obiect din array; i' devine cheia fiecarei proprietati a primului obiect; 
        let columnCell = document.createElement("th");
        columnCell.innerText = i; // afiseaza cheia ca text in celula de antet; prin .innerText setez textul
        headerRow.appendChild(columnCell) //adauga celula la randul de antet
    }
    tableHeader.appendChild(headerRow);

    //creare body tabel
    for (let item of posts){ //imi iau obiectul(item) cu for of
        let bodyRow = document.createElement("tr");

        //iterez prin fiecare proprietate a obiectului
        for(i in item){  //parcurg obiectul
            let columnCell = document.createElement("td"); //creez coloana
            columnCell.innerText = item[i]; //luam valoarea
            bodyRow.appendChild(columnCell) 
        }


        //creare buton pt Update si Delete ca si coloane
        let updateCell = document.createElement("td"); 
        let updateBtn = document.createElement("button")
        updateBtn.textContent = "Update";
        updateCell.appendChild(updateBtn);

        ///pas 3 -update
        updateBtn.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();

            callGetPostById(item.id); //apelare

        })

        let deleteCell = document.createElement("td");
        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete";
        deleteCell.appendChild(deleteBtn);

        //pas 2
        deleteBtn.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();

            //pas 3 - apelare API
            callDeletePost(item.id);

            let index = posts.indexOf(item);
            postsToUse.splice(index, 1); //update in array
            renderTable(postsToUse); //randare tabel

        })

        bodyRow.appendChild(updateCell);
        bodyRow.appendChild(deleteCell);

        tableBody.appendChild(bodyRow);


    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    table.id = "tableId";
    document.body.appendChild(table);


}
getPosts();

//POST
//creare event
function createPostEvent(){
    let btn = document.getElementById("postButtonId");
        if(!btn){
            return;
            }

    btn.addEventListener("click", function(e){ //atasez un eveniment de click la elementul btn; //function(e) =functie callback care se executa cand este apasat butonul (adica evenimentul de click are loc)
        e.preventDefault();
        e.stopPropagation();

    
    let userId = document.getElementById("userId")?.value //? (ca un fel de null check) in caz ca dau un id care nu exista ca sa nu crape programul
    let title = document.getElementById("title")?.value 
    let body = document.getElementById("body")?.value 

    //verificam valorile (validare)
    if(!userId || !title || !body){
        alert("Please fill all the fields");
        return;
    }

    callCreatePost({userId: userId, id: 101, title: title, body: body}); //Proprietatea userId primește valoarea variabilei userId
})

    
}
createPostEvent();

//  <form id="putForm"> din html Atunci cand nu o aveam dupa ce incarcam datele cu GetPost 
//si daca apasam butonul 2 de Submit se dadea refresh la pagina
function putForm(e){  
    e.preventDefault();
    e.stopPropagation();

    let userId = document.getElementById("putUserId")?.value //? (ca un fel de null check) in caz ca dau un id care nu exista ca sa nu crape programul
    let title = document.getElementById("putTitle")?.value 
    let body = document.getElementById("putBody")?.value 
    let id = document.getElementById("putId")?.textContent //pt hidden label din html

    //verificam valorile (validare)
    if(!userId || !title || !body){
        alert("Please fill all the fields");
        return;
    }

    callUpdatePost({userId: userId, id: id, title: title, body: body}, id);


}

const link = "https://jsonplaceholder.typicode.com/posts";

let postsToUse = [];

headerObj = {
    headers:{
        "Content-Type": "application/json"
    }
}


async function getPosts(){
    let posts = (await axios.get(link)).data;
    console.log(posts)
    return posts
}

async function callGetPosts(){
    let p = await getPosts();
    postsToUse = JSON.parse(JSON.stringify(p));
    renderTable(postsToUse);
}


//scriere date intr-un tabel
function renderTable(posts){
    if(!posts || posts.length === 0){  //conditie ca am minim 1 obiect
        return;
    }

    //creare tabel
    let table = document.createElement("table");
    let tableHeader = document.createElement("thead"); //capul de tabel
    let tableBody = document.createElement("tbody");

     //creare antet/ cap de tabel
    let headerRow = document.createElement("tr");
   
    for(i in posts[0]){ //i =index; posts[0] primul obiect din array; i' devine cheia fiecarei proprietati a primului obiect; 
        let columnCell = document.createElement("th");
        columnCell.innerHTML = i; // afiseaza cheia ca text in celula de antet
        headerRow.appendChild(columnCell) //adauga celula la randul de antet
    }
    tableHeader.appendChild(headerRow);

    //creare body tabel
    for (let item of posts){
        let bodyRow = document.createElement("tr");

        //iterez prin fiecare proprietate a obiectului
        for(i in item){  //parcurg obiectul
            let columnCell = document.createElement("td"); //creez coloana
            columnCell.innerHTML = item[i]; //luam valoarea
            bodyRow.appendChild(columnCell) 
        }
        tableBody.appendChild(bodyRow);


    }





}


getPosts();
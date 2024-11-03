const arr = [1,2,3,4,5];  //0 prima pozitie

const lastElement = arr.pop(); //salvare in variabila

// console.log(lastElement);

// console.log(arr.slice(0,3));

for (let i = 0; i< arr.length; i++)
{
    console.log(arr[i]);
}

for (x of arr)  
{
    console.log(x); //for of
}

for (y in arr) //for in - afiseaza pozitiile
{
    console.log(y);
}


console.log('for each')
//for each - nu merge salvat intr-o variabila ca in cazul map-ului. Nici nu putem sa facem request-uri asincron, doar la map
arr.forEach(z => {
console.log(z);
})

console.log('for each permite si afisarea indexului')

arr.forEach((w, index) => {
    console.log(w, index);
    })


    //map returneaza un array nou. Putem salva array-ul intr-o variabila si il putem face asincron
    console.log('map')
    arr.map((l, index) =>{
        console.log(l, index);
        return [l, index];  //returneaza ca array  sau return { value: l, index: index }; ca obiect

    })

    console.log('map salvare in variabila')
    const mapArray = arr.map((l, index) =>{
        console.log(l, index);
        return [l, index];

    })

    console.log('afisare salvare array map in variabila')
    console.log(mapArray);

    console.log('map asincron')
    const mapArray2 = arr.map(async (l, index) =>{
        console.log(l, index);

        //const result = await fetch('');
        return [l, index];

    })
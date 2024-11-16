/*function test (){
    if(true)
    {
        var var1 = 1;
        let let1 = 2;
        const const1 = 3;
    }


    console.log(var1);
    console.log(let1);
    console.log(const1);

}

test(); */


function test2() {
    let let1;
    const const1 = 3; // aceasta trebuie initializata la declarare

    if (true) {
        let1 = 2;
        console.log(const1); // functioneaza pt ca este folosita in blocul in care a afost declarata {}
    }

    console.log(let1); // 'let1' este vizibila aici pt ca a fost declarata in afara blocului 'if'
    // 'const1' nu ar putea fi accesata aici daca ar fi fost declarata in 'if'
}

//let si const vor fi vizibile doar in contextul executiei {}, var in toata functia
//const e constanta

// CTRL+/ pt comment linie

//test2();



//declarare obiect
const obj = {};
obj.name = "Ana";  //putem sa definim atribute/metode noi atata timp cat nu schimbam referinta in memorie in care este; idem si pt array
console.log(obj);

//alterare zona de memorie
//const obj = {};
// obj = {};

//array
const arr = [1,2,3,4];
arr.push(5);

// arr = [6,7,8]; //nu

console.log(arr);

//la const putem modifica primitivele (doar comportamentul nu si zona de memorie), nu si non-primitivele




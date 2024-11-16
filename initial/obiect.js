const obj1 = {
    name: 'Ana',
    email: "ana@gmail.com",
    varsta: 20,
    meet: function(){
     console.log(this.name)
    }
    //crearea unuie functii cu => nu putem folosi this
    //,
    // meet2: () => {
    //     console.log(this.)
    // }
}



console.log(obj1);
console.log(obj1.name);
console.log(obj1['email']);
console.log(obj1.meet); //afiseaza referinta
obj1.meet();   //afiseaza rezultatul functiei


//problema apare la folosirea this. in functii. La => se creeaza un nou context de executie si 
//nu mai stie cine este obiectul in care s-a creeat functia cu =>
    //IN CADRUL OBIECTELOR/CLASELOR OBIECTELOR NU FOLOSIM =>, CI FUNCTION

const test = a => console.log(a); //alta modalitate de declarare functii cu 1 parametru
test(90);
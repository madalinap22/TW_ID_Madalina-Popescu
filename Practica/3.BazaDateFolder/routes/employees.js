//ne adaugam aici toate rutele

//ne importam entitatea
const Employee = require("../models/employee");
console.log(Employee); // Afișează modelul în consolă pentru verificare


//const router - pt a putea sa ne definim rutele noastre
const router = require("express").Router();

//definirea rutelor
router
    .route("/employees")
    .get(async (req, res)=>{
        try{
            const employees = await Employee.findAll();
            return res.status(200).json(employees);
        }catch(err){
            return res.status(500).json(err)
        }
    })
    .post(async (req, res)=>{   //la aceeasi ruta
        try{
            console.log(req.body);
            const newEmployee = await Employee.create(req.body);
            return res.status(200).json(newEmployee);
        }catch(err){
            console.error("Eroare la crearea angajatului:", err);
            return res.status(500).json(err)
        }
    })    
    
    module.exports = router;
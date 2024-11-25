//ne adaugam aici toate rutele

//ne importam entitatea
const Employee = require("../models/employee");
console.log(Employee); // Afișează modelul în consolă pentru verificare

const {Op} = require('sequelize'); //importul din sequelize a operatorilor SQL(>=, <=, =, LIKE, etc) pt where conditions

const Project = require("../models/project");

//const router - pt a putea sa ne definim rutele noastre
const router = require("express").Router();


//definirea rutelor
router
    .route("/employees")
    .get(async (req, res)=>{
        try{

            const{minSalary} = req.query; //pt where condition; query parameters
            
            const employees = await Employee.findAll({
                where: minSalary ? {salary : {[Op.gt]: minSalary}} : undefined //where condition: http://localhost:7000/api/employees?minSalary=5000 (>=)
            });



            return res.status(200).json(employees);
        }catch(err){
            return res.status(500).json(err)
        }
    })  

        //PT PROIECTIE (afisare fara id) : http://localhost:7000/api/employees?simplified=true
    // .get(async (req, res)=>{

    //     const {simplified} = req.query; //

    //     try{

    //         const employees = await Employee.findAll({
    //             attributes: simplified ? { exclude: "id"} : undefined
    //             //attributes: ["firstName", "lastName"],  //afisare doar nume si prenume
    //         });

    //         return res.status(200).json(employees);
    //     }catch(err){
    //         return res.status(500).json(err)
    //     }
    // })

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
    
    router
    .route("/employees/:id")
    .get(async (req, res)=>{
        try{
            const employee = await Employee.findByPk(req.params.id);
            if (employee){
                return res.status(200).json(employee);
            }else{
                return res.status(404).json({error: `Employee with id ${req.params.id} not found`}) //ai grija sa pui tilda `` nu ''
            }
        }catch(err){
            return res.status(500).json(err)
        }
    })
    .put(async (req, res)=>{   //la aceeasi ruta
        try{
            const employee = await Employee.findByPk(req.params.id);
            if (employee){
                const updateEmployee = await employee.update(req.body)
                return res.status(200).json(employee);
            }else{
                return res.status(404).json({error: 'Employee with id ${req.params.id} not found'})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }) 

    // POST pentru a adăuga un proiect unui angajat
    // {
    //     "projectName": "Proiect Nou",
    //     "projectStatus": "IN DERULARE"
    // }
    
router.post("/employees/:employeeId/projects", async (req, res, next) => {
    try {
        // Găsește angajatul cu ID-ul specificat
        const employee = await Employee.findByPk(req.params.employeeId);

        if (employee) {
            // Creează un nou proiect și setează `EmployeeId` pentru a-l asocia cu angajatul
            const project = new Project(req.body);
            project.EmployeeId = employee.id; // Asociază proiectul cu angajatul
            await project.save();

            // Trimite răspunsul cu detaliile proiectului creat
            res.status(201).json({ message: "Project created!", project });
        } else {
            // Dacă angajatul nu este găsit, trimite eroare 404
            res.status(404).json({ message: "404 - Employee Not Found" });
        }
    } catch (error) {
        // În cazul unei erori, trimite răspunsul de eroare
        console.error("Eroare la crearea proiectului:", error);
        next(error);
    }
});

    
    // GET toate proiectele asociate unui angajat
router.get("/employees/:employeeId/projects", async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.params.employeeId, {
            include: [Project]
        });

        if (employee) {
            res.status(200).json(employee.Projects);
        } else {
            res.status(404).json({ message: "404 - Employee Not Found!" });
        }
    } catch (err) {
        console.error("Eroare la obținerea proiectelor pentru angajat:", err);
        next(err);
    }
});

    
    

//TO DO
//implementează o condiție de filtrare a angajaților după nume.
//implementează o sortare (ordonare) pentru query-ul get all employees, în funcție de un câmp primit ca și query param.


    
    module.exports = router;

const Project = require("../models/project"); // import modelul Project
const Employee = require("../models/employee"); // daca vreau sa accesez relatia


const {Op} = require('sequelize'); //importul din sequelize a operatorilor SQL(>=, <=, =, LIKE, etc) pt where conditions

//const router - pt a putea sa ne definim rutele noastre
const router = require("express").Router();

// GET toate proiectele
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json(projects);
    } catch (err) {
        console.error("Eroare la obtinerea proiectelor:", err);
        return res.status(500).json(err);
    }
});

// POST pentru a crea un proiect (asociat unui angajat)
router.post("/projects", async (req, res) => {
    try {
        const { projectName, projectStatus, employeeId } = req.body;

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ error: `Employee with id ${employeeId} not found` });
        }

        const newProject = await Project.create({
            projectName,
            projectStatus,
            EmployeeId: employeeId
        });

        return res.status(201).json(newProject);
    } catch (err) {
        console.error("Eroare la crearea proiectului:", err);
        return res.status(500).json(err);
    }
});




// DELETE șterge un proiect după ID
router.delete("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            await project.destroy();
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: `Project with id ${req.params.id} not found` });
        }
    } catch (err) {
        console.error("Eroare la ștergerea proiectului:", err);
        return res.status(500).json(err);
    }
});


module.exports = router;



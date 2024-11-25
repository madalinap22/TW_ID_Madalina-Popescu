"use strict";

const express = require('express')
const sequelize = require('./sequelize') //atentie la ./

const Employee = require("./models/employee");
const Project = require("./models/project");

// Definire relație - Employee => Manager Proiect (un proiect are 1 singur manager, 1 manager poate avea mai multe proiecte)
//relatia va adauga automat coloana EmployeeId in tabela Projects 
Employee.hasMany(Project, { foreignKey: "EmployeeId" }); // Cheie străină explicită
Project.belongsTo(Employee, { foreignKey: "EmployeeId" }); // Cheie străină explicită

const app = express();
app.use(express.json());  //ATENTIE SA AI ASTA

app.use("/api", require("./routes/employees"));  //importul rutelor !!! Atentie sa ai module.exports = router; la fisierul de rute
app.use("/api", require("./routes/projects"));






app.listen(7000, async ()=> {
    console.log("Server started on http://localhost:7000");
    try{
        await sequelize.authenticate();
        console.log("Conexiune stabilita cu succes")
    }catch(err){
        console.error("Nu s-a putut face conexiunea cu BD", error)
    }
})
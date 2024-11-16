"use strict";

const express = require('express')
const sequelize = require('./sequelize') //atentie la ./
require("./models/employee"); //includem fisierul in main

const app = express();
app.use(express.json());  //ATENTIE SA AI ASTA

app.use("/api", require("./routes/employees"));




app.listen(7000, async ()=> {
    console.log("Server started on http://localhost:7000");
    try{
        await sequelize.authenticate();
        console.log("Conexiune stabilita cu succes")
    }catch(err){
        console.error("Nu s-a putut face conexiunea cu BD", error)
    }
})
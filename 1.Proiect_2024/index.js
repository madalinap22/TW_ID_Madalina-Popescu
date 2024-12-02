"use strict"; //directiva

const express = require('express')
const sequelize = require('./sequelize') //atentie la ./

const ParkingLot = require("./models/parcare");

const app = express();
app.use(express.json());

app.use("/api", require("./routes/parcari")); //importul rutelor




app.listen(8000, async ()=>{
    console.log("Server started on http://localhost:8000");
    try{
        await sequelize.authenticate();
        console.log("Conexiune stabilita cu succes")
    }catch(err){
        console.error("Nu s-a putut face conexiunea cu BD", error)
    }
})

"use strict"; //directiva

const express = require('express')
const sequelize = require('./sequelize') //atentie la ./

const ParkingLot = require("./models/parcare");
const ParkingSpot = require("./models/locParcare");

ParkingLot.hasMany(ParkingSpot, { foreignKey: "parkingLotId"}); //,onDelete: "CASCADE" - pt stergere inclusiv a locurilor de parcare
ParkingSpot.belongsTo(ParkingLot, { foreignKey: "parkingLotId" });

const app = express();
app.use(express.json());

app.use("/api", require("./routes/customParcari")); //Atentie la ordine! pt ca am pus parcari/:id la rute la parcare si locuri de parcare
app.use("/api", require("./routes/parcari")); 
app.use("/api", require("./routes/locuriParcare"));





app.listen(8000, async ()=>{
    console.log("Server started on http://localhost:8000");
    try{
        await sequelize.authenticate();
        console.log("Conexiune stabilita cu succes")
    }catch(err){
        console.error("Nu s-a putut face conexiunea cu BD", error)
    }
})

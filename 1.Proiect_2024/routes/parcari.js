const ParkingLot = require("../models/parcare");
console.log(ParkingLot);

const {Op} = require('sequelize'); ////importul din sequelize a operatorilor SQL(>=, <=, =, LIKE, etc)

//const router - pt a putea sa definim rutele din proiect
const router = require("express").Router();

router
    .route("/parcari")
    .get(async(req, res)=>{
        try{
            const parcari = await ParkingLot.findAll();
            return res.status(200).json(parcari);
        }catch(err){
            return res.status(500).json(err)
        }
    })
    .post(async(req, res)=>{
        try{
            const newParcare = await ParkingLot.create(req.body)
            return res.status(200).json(newParcare);
        }catch(err){
            return res.status(500).json(err)
        }
    })

    router
    .route("/parcari/:id")
    .get(async (req, res)=>{
        try{
            const parcare = await ParkingLot.findByPk(req.params.id);
            if (parcare){
                return res.status(200).json(parcare);
            }else{
                return res.status(404).json({error: `Parcarea cu id-ul ${req.params.id} nu a putut fi gasita`}) //ai grija sa pui tilda `` nu ''
            }
        }catch(err){
            return res.status(500).json(err)
        }
    })

    .put(async (req, res)=>{   //la aceeasi ruta
        try{
            const parcare = await ParkingLot.findByPk(req.params.id);
            if (parcare){
                const updateParcare = await parcare.update(req.body)
                return res.status(200).json(parcare);
            }else{
                return res.status(404).json({error: `Parcarea cu id-ul ${req.params.id} nu a putut fi gasita`})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }) 

    .delete(async (req, res) => {
        try {
            const parcare = await ParkingLot.findByPk(req.params.id);
            if (parcare) {
                await parcare.destroy(); //sterge din BD
                return res.status(200).json({ message: `Parcarea cu id-ul ${req.params.id} a fost stearsa` });
            } else {
                return res.status(404).json({ error: `Parcarea cu id-ul ${req.params.id} nu a fost gasita` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });


//console.log("Exporting router:", router);
module.exports = router; //ca sa il pot adauga in index.js
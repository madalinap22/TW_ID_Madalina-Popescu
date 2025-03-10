const express = require("express");
const router = express.Router();
const ParkingLot = require("../models/parcare");
const ParkingSpot = require("../models/locParcare"); 

const {Op} = require('sequelize'); //importul din sequelize a operatorilor SQL(>=, <=, =, LIKE, etc)

//Parcari+detalii
router.get("/parcari/detalii", async (req, res) => {
    try {
        const parcari = await ParkingLot.findAll({
            include: [{ model: ParkingSpot, attributes: ["status"] }]
        });

        const response = parcari.map(parcare => {
            const locuri = parcare.ParkingSpots || [];
            const totalLocuriOcupate = locuri.filter(loc => loc.status === "OCUPAT").length;
            const totalLocuriLibere = locuri.filter(loc => loc.status === "LIBER").length;

            return {
                id: parcare.id,
                name: parcare.name,
                adresa: parcare.adresa,
                capacitate: parcare.capacitate,
                totalLocuriOcupate,
                totalLocuriLibere
            };
        });

        return res.status(200).json(response);
    } catch (err) {
        console.error("Eroare la GET /parcari/detalii:", err);
        return res.status(500).json(err);
    }
});
//Parcari disponibile
router.get("/parcari/disponibile", async (req, res) => {
    try {
        const parcari = await ParkingLot.findAll({
            include: [{ model: ParkingSpot, attributes: ["status"] }]
        });

        const response = parcari.filter(parcare => {
            const locuriLibere = parcare.ParkingSpots.filter(loc => loc.status === "LIBER");
            return locuriLibere.length > 0;
        }).map(parcare => ({
            id: parcare.id,
            name: parcare.name,
            adresa: parcare.adresa,
            capacitate: parcare.capacitate,
            locuriLibere: parcare.ParkingSpots.filter(loc => loc.status === "LIBER").length
        }));

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//cauta parcari dupa nume/adresa/nume&adresa
router.get("/parcari/cauta", async (req, res) => {
    try {
        const { name, adresa } = req.query;

        const where = {};
        if (name) where.name = { [Op.like]: `%${name}%` };
        if (adresa) where.adresa = { [Op.like]: `%${adresa}%` };

        const parcari = await ParkingLot.findAll({ where });
        return res.status(200).json(parcari);
    } catch (err) {
        return res.status(500).json(err);
    }
});





module.exports = router;

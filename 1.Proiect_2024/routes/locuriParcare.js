const ParkingSpot = require("../models/locParcare");
const ParkingLot = require("../models/parcare"); //import modelul !!!


const router = require("express").Router();

router
    .route("/locuri")
    .get(async (req, res) => {
        try {
            const locuri = await ParkingSpot.findAll({
                include: [{ model: ParkingLot, attributes: ["name"] }] //ca sa pot aduce numele parcarii
            });

            const response = locuri.map(loc => ({ //iterez prin fiecare obiect si pt fiecare "loc" creez un nou obiect (vezi metodele JS)
                id: loc.id,
                numarLoc: loc.numarLoc,
                status: loc.status,
                parkingLotId: loc.parkingLotId,
                parkingLotName: loc.ParkingLot?.name //daca exista adauga numele
            }));

            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const { numarLoc, status, parkingLotId } = req.body;
            //const parkingLot = await ParkingLot.findByPk(parkingLotId);
            const parkingLot = await ParkingLot.findByPk(parkingLotId, {
                include: [{ model: ParkingSpot }]
            });

            if (!parkingLot) {
                return res.status(404).json({ error: `Parcarea cu id-ul ${parkingLotId} nu a fost gasita` });
            }
    
            //validare pt a nu depasi capacitate parcarii
            const totalLocuriExistente = parkingLot.ParkingSpots.length;
            if (totalLocuriExistente >= parkingLot.capacitate) {
            return res.status(400).json({ 
                error: `Nu se pot adauga mai multe locuri. Capacitatea maxima (${parkingLot.capacitate} locuri) a parcarii  a fost atinsa.` 
            });
        }
            const newParkingSpot = await ParkingSpot.create({
                numarLoc,
                status,
                parkingLotId
            });

             const response = {
                ...newParkingSpot.toJSON(), // "..." spread operator ca sa nu mai scriu manual atributele; convertesc ParkingSpot in JSON
                parkingLotName: parkingLot.name // adaug numele parcarii pt afisare
            };
    
            return res.status(201).json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    });

    router
    .route("/locuri/:id")
    .get(async (req, res) => {
        try {
            const loc = await ParkingSpot.findByPk(req.params.id, {
                include: [{ model: ParkingLot, attributes: ["name"] }]
            });

            if (!loc) {
                return res.status(404).json({ error: `Locul de parcare cu id-ul ${req.params.id} nu a fost gasit` });
            }

            const response = {
                id: loc.id,
                numarLoc: loc.numarLoc,
                status: loc.status,
                parkingLotId: loc.parkingLotId,
                parkingLotName: loc.ParkingLot?.name
            };

            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const loc = await ParkingSpot.findByPk(req.params.id);
            if (loc) {
                const updatedLoc = await loc.update(req.body);
                return res.status(200).json(updatedLoc);
            } else {
                return res.status(404).json({ error: `Locul de parcare cu id-ul ${req.params.id} nu a fost gasit` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const loc = await ParkingSpot.findByPk(req.params.id);
            if (loc) {
                await loc.destroy();
                return res.status(200).json({ message: `Locul de parcare cu id-ul ${req.params.id} a fost sters` });
            } else {
                return res.status(404).json({ error: `Locul de parcare cu id-ul ${req.params.id} nu a fost gasit` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });
    



module.exports = router;

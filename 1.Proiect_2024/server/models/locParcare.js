const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const ParkingSpot = sequelize.define("ParkingSpot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numarLoc: {
        type: DataTypes.INTEGER,
        unique: true
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['OCUPAT', 'LIBER'],
    },
});

module.exports = ParkingSpot;

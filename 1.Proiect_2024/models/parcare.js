const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");



const ParkingLot = sequelize.define("ParkingLot",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        adresa:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 80]
            }
        },
        capacitate:{
            type: DataTypes.INTEGER
        },
        latitudine:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitudine:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }
)

module.exports = ParkingLot;
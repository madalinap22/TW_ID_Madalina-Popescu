const { DataTypes } = require("sequelize"); //DataTypes = obiect oferit de Sequelize pt definirea tipurilor de date ale coloanelor tabeleleor
const sequelize = require("../sequelize");

const Employee = sequelize.define(
    "Employee",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING,
        
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 10]
            }
        },
        email:{
            type: DataTypes.STRING,
            validate:{
                isEmail: true
            }
        },
        birthYear:{
            type: DataTypes.INTEGER,
            validate: {min: 1900}
        },
        salary:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {min: 0,},
        }

        //{tableName:"Employees"} //sequelize face asta automat

     })

     module.exports = Employee;
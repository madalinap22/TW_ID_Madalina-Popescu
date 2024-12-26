const { DataTypes } = require("sequelize"); //DataTypes = obiect oferit de Sequelize pt definirea tipurilor de date ale coloanelor tabeleleor; Exemplu: firstName: DataTypes.STRING, // Definește coloana firstName ca un STRING
const sequelize = require("../sequelize"); //import instanta sequelize definita in sequelize.js pt a crea modele si conexiunea la BD

const Employee = sequelize.define("Employee",
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

     module.exports = Employee; //exporta modelul Employee pt a fi utilizat in alte fisiere din proiect
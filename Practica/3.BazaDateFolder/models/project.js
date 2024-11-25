const { DataTypes } = require("sequelize"); //DataTypes = obiect oferit de Sequelize pt definirea tipurilor de date ale coloanelor tabeleleor; Exemplu: firstName: DataTypes.STRING, // Definește coloana firstName ca un STRING
const sequelize = require("../sequelize");//import instanta sequelize definita in sequelize.js pt a crea modele si conexiunea la BD

const Project = sequelize.define("Projects",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        projectName: DataTypes.STRING,

        projectStatus: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['IN DERULARE', 'FINALIZAT', 'SUSPENDAT']
        }
    }

)

module.exports = Project;
const { DataTypes } = require("sequelize");
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

        //{tableName:"Employees"} //sequelize face asta automat

     })

     module.exports = Employee;
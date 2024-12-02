//aici instantiem conexiunea la BD

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/proiect.db"
});



sequelize.sync().then(() => {
    console.log("Toate tabelele au fost sincronizate");
});


module.exports = sequelize;

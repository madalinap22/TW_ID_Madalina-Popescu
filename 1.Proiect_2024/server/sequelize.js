//aici instantiem conexiunea la BD
require('dotenv').config();

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/proiect.db",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});


//cand ai deja creata o parte din BD si vrei sa o actualizezi
// sequelize.sync({ force: true }).then(() => {
//     console.log("Tabelele si relatiile au fost sincronizate.");
// });

sequelize.sync().then(() => {
    console.log("Toate tabelele au fost sincronizate");
});

module.exports = sequelize;

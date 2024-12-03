//aici instantiem conexiunea la BD

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/proiect.db"
});


//cand ai deja creata o parte din BD si vrei sa o actualizezi
// sequelize.sync({ force: true }).then(() => {
//     console.log("Tabelele si relatiile au fost sincronizate.");
// });

sequelize.sync().then(() => {
    console.log("Toate tabelele au fost sincronizate");
});

module.exports = sequelize;

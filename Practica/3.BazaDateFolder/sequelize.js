//aici instantiem conexiunea la BD

const {Sequelize} = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/test.db"
})

//activam sincronizarea pe entitatea de sequelize
// sequelize.sync({alter: true}).then(()=>{  //daca tabela existenta coincide cu ce avem in cod tabela nu se sterge
//     console.log("Toate tabelele au fost sincronizate");
// });

sequelize.sync().then(() => {
    console.log("Toate tabelele au fost sincronizate");
});


module.exports = sequelize


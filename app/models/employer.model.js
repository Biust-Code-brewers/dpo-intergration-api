module.exports = (sequelize, Sequelize) => {
    return sequelize.define("employers", {
        docId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
        ,
        employer_name: {
            type: Sequelize.STRING
        },

    });

};
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        docId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isExisting: {
            type: Sequelize.BOOLEAN
        }
        ,
        fnames: {
            type: Sequelize.STRING
        },
        snames: {
            type: Sequelize.STRING
        },
        omang: {
            type: Sequelize.STRING,
        },
        dob: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        maritalStatus: {
            type: Sequelize.STRING
        },
    });

    return Client;

};
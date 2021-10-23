module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        docId: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        fnames: {
            type: Sequelize.STRING
        },
        snames: {
            type: Sequelize.STRING
        },
        omang: {
            type: Sequelize.INTEGER,
            primaryKey: true,
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
        employer: {
            type: Sequelize.STRING
        },
        grossSalary: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        netPay: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        totalFixedAllowances: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
    });

    return Client;

};
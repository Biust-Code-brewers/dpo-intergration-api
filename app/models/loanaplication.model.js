module.exports = (sequelize, Sequelize) => {
    const loanApplication = sequelize.define("loanAplication", {
        omang: {
            type: Sequelize.INTEGER,
            foreignKey:true,
        },
        affordability: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        rates: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        loan_term: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        maximum_amount: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        take_home: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
    });

    return loanApplication;
};
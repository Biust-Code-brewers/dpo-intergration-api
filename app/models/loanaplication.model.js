module.exports = (sequelize, Sequelize) => {
    const loanApplication = sequelize.define("loanAplication", {
        omang: {
            type: Sequelize.STRING,
            foreignKey:true,
        },
        selected:{
            type: Sequelize.BOOLEAN
        },
        affordability: {
            type: Sequelize.INTEGER
        },
        rates: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        loan_term: {
            type: Sequelize.INTEGER
        },
        maximum_amount: {
            type: Sequelize.STRING
        },
        take_home: {
            type: Sequelize.STRING
        },
        installment:{
            type: Sequelize.STRING
        },
    });

    return loanApplication;
};
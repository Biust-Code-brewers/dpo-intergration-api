module.exports = (sequelize, Sequelize) => {
    const loanApplication = sequelize.define("loanAplication", {
        omang: {
            type: Sequelize.STRING,
            foreignKey: true,
        },
        selected: {
            type: Sequelize.BOOLEAN
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
        basicSalary: {
            type: Sequelize.DECIMAL.UNSIGNED
        },
        affordability: {
            type: Sequelize.INTEGER
        },
        rates: {
            type: Sequelize.STRING
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
        installment: {
            type: Sequelize.STRING
        },
    });

    return loanApplication;
};
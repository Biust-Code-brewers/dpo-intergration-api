const db = require("../models");
const LoanApplication = db.loanApplication;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req);


    const loanapplication = {
        omang: req.body.omang,
        affordability: req.body.affordability,
        rates: req.body.rates,
        loan_term: req.body.loan_term,
        maximum_amount: req.body.maximum_amount,
        take_home: req.body.take_home,
        installment: req.body.installment
    };

    // Save Client in the database
    LoanApplication.create(loanapplication)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating a loan application."
            });
        });
};

// Retrieve all loan applications from the database.
exports.findAll = (req, res) => {
    const omang = req.body.omang
    var condition = omang ? {omang: {[Op.like]: `%${omang}%`}} : null;

    LoanApplication.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all Loan Applications."
            });
        });
};

// Find all loan applications for a single client using their id
exports.findOne = (req, res) => {
    const omang = req.params.omang;

    LoanApplication.findAll({where: {omang: req.params.omang}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + omang
            });
        });

};

// Delete a a loan application with the specified omang in the request
exports.delete = (req, res) => {
    const omang = req.params.omang;

    LoanApplication.destroy({
        where: { omang: omang }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "loan application was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete loan application with id=${omang}. 
                    Maybe loan application was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete loan application with id=" + omang
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    LoanApplication.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} loan application were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all loan application."
            });
        });
};

/**
 * Not sure if this is required but we can find out from Coulson
 */
// Update a loan application by the id in the request
/*
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });

};*/

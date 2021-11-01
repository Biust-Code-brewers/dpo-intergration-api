const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {

    const client = {
        fnames: req.body.fname,
        snames: req.body.sname,
        dob: req.body.dob,
        omang: req.body.omang,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        maritalStatus: req.body.MaritalStatus,
        employer: req.body.Employer,
        grossSalary: req.body.GrossSalary,
        netPay: req.body.NetPay,
        totalFixedAllowances: req.body.TotalFixedAllowances,
        basicSalary: req.body.BasicSalary,
    };

    // Save Client in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the client."
            });
        });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {

    Client.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
    const omang = req.params.omang;

    Client.findAll({where: {omang: req.params.omang}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + omang
            });
        });

};

// Update a Client by the id in the request
exports.update = (req, res) => {
    const omang = req.params.omang;

    Client.update(req.body, {
        where: {omang: omang}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${omang}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + omang
            });
        });

};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const omang = req.params.omang;

    Client.destroy({
        where: {omang: omang}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${omang}. Maybe Client was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + omang
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Clients were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Clients."
            });
        });
};




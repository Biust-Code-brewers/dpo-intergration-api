const db = require("../models");
const Employer = db.employers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    let employer = {
        employer_name: req.body.employer_name,
    };

    Employer.create(employer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message || "Some error occurred while creating the employer.")
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the employer."
            });
        });


};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {

    Employer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message || "Some error occurred retrieving employers")

            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employers."
            });
        });
};

// Update a Employer by the id in the request
exports.update = (req, res) => {
    const employer_name = req.params.employer_name;

    Employer.update(req.body, {
        where: {employer_name: employer_name}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Employer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employer with id=${employer_name}. Maybe Employer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err.message || "Some error occurred while creating the client.")

            res.status(500).send({
                message: "Error updating Employer with id=" + employer_name
            });
        });

};

// Delete a Employer with the specified id in the request
exports.delete = (req, res) => {
    const employer_name = req.params.employer_name;

    Employer.destroy({
        where: {employer_name: employer_name}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Employer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employer with id=${employer_name}. Maybe Employer was not found!`
                });
            }
        })
        .catch(err => {
            console.log(err.message || "Some error occurred while creating the client.")

            res.status(500).send({
                message: "Could not delete Employer with id=" + employer_name
            });
        });
};



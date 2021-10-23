const {FirebaseFunctions} = require("../models/firebaseFunctions");
const fb = new FirebaseFunctions();


exports.getFbApps = async (req, res) => {
    try {
        const apps = await fb.getLoanApplications();

        res.status(200).send(apps);
    } catch (err) {
        res.status(500).send(err)
    }
};

exports.getFbClients = async (req, res) => {
    try {
        const clients = await fb.getClients();

        res.status(200).send(clients);
    } catch (err) {
        res.status(500).send(err)
    }
};

exports.createFbClient = async (req, res) => {

    const client = {
        docId: req.body.docId,
        fname: req.body.fname,
        sname: req.body.sname,
        dob: req.body.dob,
        omang: req.body.omang,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        maritalStatus: req.body.maritalStatus,
        employer: req.body.employer,
        grossSalary: req.body.grossSalary,
        netPay: req.body.netPay,
        totalFixedAllowances: req.body.totalFixedAllowances,
    };

    fb.addClient(client)
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

exports.logFbErrors = async (req, res) => {
    let error = req.body
    fb.logError(error)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while reporting your the error."
            });
        });
}



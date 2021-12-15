module.exports = app => {
    const clients = require("../controllers/client.controller.js");

    const loanApplications = require("../controllers/loanapplications.controller")

    const router = require("express").Router();

    // base urls
    const clientURL = '/clients';
    const loanAppURL = '/loan-applications';

    // Create a new client -- client/new
    router.post(`${clientURL}/new`, clients.create);

    // Retrieve all clients
    router.get(clientURL, clients.findAll);

    // Retrieve a single client with omang
    router.get(`${clientURL}/:omang`, clients.findOne);

    // Update a client with omang
    router.put(`${clientURL}/:omang`, clients.update);

    // Delete a client with omang
    router.delete(`${clientURL}/:omang`, clients.delete);

    // Delete all clients
    router.delete("/delete/clients/delete/all", clients.deleteAll);


    /**
     * Routes for loan applications
     * **/
    //create loan application
    router.post(`${loanAppURL}/new`, loanApplications.create);

    //Get all loan applications
    router.get(loanAppURL,  loanApplications.findAll);

    //Get a single client with their omang
    router.get(`${loanAppURL}/:omang`, loanApplications.findOne);

    //Delete a loan application using an Omang
    router.delete(`${loanAppURL}/:omang`,loanApplications.delete)

    //Delete all clients from the database
    router.delete("/loan-applications/delete/all", loanApplications.deleteAll)

    /*
    interactions with the firebase database
    */

    app.use('/api/', router);
};

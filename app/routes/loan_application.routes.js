module.exports = app => {
    const clients = require("../controllers/client.controller.js");

    const loanApplications = require("../controllers/loanapplications.controller")

    const firebase = require("../controllers/firebase.controller.js")

    const router = require("express").Router();

    // Create a new client
    router.post("/new/client", clients.create);

    // Retrieve all clients
    router.get("/", clients.findAll);


    // Retrieve a single client with omang
    router.get("/:omang", clients.findOne);

    // Update a client with omang
    router.put("/:omang", clients.update);

    // Delete a client with omang
    router.delete("/:omang", clients.delete);

    // Delete all clients
    router.delete("/delete/clients/all", clients.deleteAll);


    /**
     * Routes for loan applications
     * **/
    //create loan application
    router.post("/new/loan-application", loanApplications.create);

    //Get all loan applications
    router.get("/loan-application", loanApplications.findAll);

    //Get a single client with their omang
    router.get("/loan-application:omang", loanApplications.findOne);

    //Delete a loan application using an Omang
    router.delete("/loan-application:omang",loanApplications.delete)

    //Delete all clients from the database
    router.delete("loan-applications/delete", loanApplications.deleteAll)

    /*
    interactions with the firebase database
    */

    //get all clients from the firebase database
    router.get("/firebase/clients", firebase.getFbClients)

    //create a new client and save it to the firebase database
    router.post("/firebase/new/client", firebase.createFbClient)

    //get all loan applications from firebase
    router.get("/firebase/applications", firebase.getFbApps)

    //save any errors that occur to the firebase database
    router.post("/firebase/new/error", firebase.logFbErrors)

    app.use('/api/', router);
};
/**
 * Contains functions for accessing firebase db
 */
class FirebaseFunctions {

    // initialise connection
    constructor() {

        const serviceAccount = require("../config/firebase-service-account-key.json");
        const admin = require("firebase-admin");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        const db = admin.firestore();

        this.clientsRef = db.collection('clients');
        this.loanApplicationsRef = db.collection('loanApplications');
        this.debugLogRef = db.collection('debugLog');

    }

    /**
     * Get all clients or one if id is supplied
     * @param id Optional argument for client's omang or passport number
     * @return array of clients if found, or empty array if not found
     */
    getClients = async (id = undefined) => {
        // stores docs from db query
        let docs;
        // doc reference for getting -- db.collection('clients')
        let docsRef = this.clientsRef;
        // stores array of clients from the db
        let clients = [];

        // check if there's an id supplied, if so, edit query to get one document
        if (id) {
            docsRef = docsRef.where('omang', '==', id);
        }

        // finish up query ref and get
        docs = await docsRef.get();

        // loop through docs from db and fill array
        docs.forEach(doc => {
            const data = doc.data();

            try {
                // parse each client and add to array
                clients.push({
                    fname: data.fname,
                    sname: data.sname,
                    omang: data.omang,
                    dob: data.dob,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    MaritalStatus: data.MaritalStatus,
                    NetPay: data.NetPay,
                    Employer: data.Employer,
                    BasicSalary: data.BasicSalary,
                    TotalFixedAllowances: data.TotalFixedAllowances,
                    docId: data.docId,
                })
            } catch (err) {
                // log error to db
                this.logError(err);
                // return error message
                return err;
            }
        });

        // return the result
        return clients;
    }


    /**
     * Add a new client to database
     * @param client Client object with all fields
     */
    addClient = async (client) => {
        // get a unique doc started
        let newClientRef = await this.clientsRef.doc();
        // set that doc's details
        await newClientRef.set({...client, docId: newClientRef.id});
    }


    /**
     * @param status 'pending' or 'resolved' if you dont want to get all loan applications
     * @retuns array of loan applications
     */
    getLoanApplications = async (status = undefined) => {
        // list applications
        let apps = [];
        // doc reference for getting -- db.collection('loanApplications')
        let docsRef = this.loanApplicationsRef;

        // if there's a status, use it to filter
        if (status) {
            docsRef = docsRef.where('status', '==', status);
        }

        // finish up query ref and get
        const docs = await docsRef.orderBy('appliedOn', 'asc').get();

        // loop through docs from db and fill array
        docs.forEach((doc) => {
            const d = doc.data();
            // parse each client and add to array
            try {
                apps.push({
                    resolvedBy: d.resolvedBy ? d.resolvedBy : '',
                    resolvedOn: d.resolvedOn ? d.resolvedOn.toDate() : '',
                    allLoanOptions: d.allLoanOptions,
                    chosenLoanOption: d.chosenLoanOption,
                    dob: d.dob,
                    docId: d.docId,
                    email: d.email,
                    Employer: d.Employer,
                    fname: d.fname,
                    MaritalStatus: d.MaritalStatus,
                    omang: d.omang,
                    BasicSalary: d.BasicSalary,
                    GrossSalary: d.GrossSalary,
                    NetPay: d.NetPay,
                    TotalFixedAllowances: d.TotalFixedAllowances,
                    phoneNumber: d.phoneNumber,
                    sname: d.sname,
                    status: d.status,
                    // special handling for date
                    appliedOn: d.appliedOn.toDate()
                })
            } catch (err) {
                // log error to db
                this.logError(err);
                // return error message
                return err;
            }
        });

        return apps;
    }


    /**
     * Function to log any errors to the database
     * @param error Error object
     */
    logError = async (error) => {
        try {
            await this.debugLogRef.add({
                date: new Date(),
                message: error.message,
                details: error.stack
            });
        } catch (err) {
            // irony of issues with the logger itself -- refresh the app
            console.log(err);
        }
    }

}

module.exports = {FirebaseFunctions}
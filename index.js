const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const {sendSMS} = require("./functions");

// initialise express into app variable
const app = express();

// calculate loan external url
const calculateLoanUrl = "http://10.16.32.26:443/calculateLoan";

// for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cross origin access to allow backend to communicate with frontend
app.use(cors());

/**
 * Get route for testing if the API if functional
 * @return string API is running if functional
 */
app.get('/test', (req, res) =>{
    res.status(200).send("API is running! 🚀")
});

/**
 * Post route for calculating a loan's payment options
 * @params formData object containing information required to calculate the loan
 * @return loanOptions object with array or loan payment options
 */
app.post('/calculateLoan', async(req, res) => {

    try {
        // get form data from the body
        const formData = req.body.formData;

        // call api and supply data provided
        const response = await axios.post(calculateLoanUrl, formData);
        // get the data if successful
        const data = {loanOptions: JSON.parse(response.data).section};

        res.status(200).send(data);
    }
    catch(err){
        console.log(err);
        // return any error info with 500 status code
        res.status(500).send(err.message)
    }
})

/**
 * Post route for sending an SMS to a phone number
 * @params params object: {params : { recipient: '2677123456', message: 'Hello World!' } }
 * @return loanOptions object with array or loan payment options
 */
app.post('/sendSMS', async(req, res) => {
    try {
        // get params from body
        const {recipient, message} = req.body.params;

        // check if both are present
        if (!(recipient && message)){
            // one or both are missing, send error message to client
            res.status(400).send('Missing parameter(s). Required {"params" : { "recipient": "2677123456", "message": "Hello World!" } }');
        }

        // call sendSMS function with the parameters
        const responseData = await sendSMS(recipient, message);

        // return response from message API
        res.status(200).send(responseData);
    }
    catch (err) {
        // for other errors, send error message
        res.status(500).send(err.message);
    }
})

// listen at endpoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server Ready! at port ${PORT} 🚀`));
const apiKey = require("./app/config/loancalculatorapikey.js")
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const path = require('path')
const {sendSMS} = require("./functions");
const calculateLoanUrl = require('./app/config/calculate-loan-url.js');
require('dotenv').config()


// initialise express into app variable
const app = express();

// for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// cross origin access to allow backend to communicate with frontend
app.use(cors());

const db = require("./app/models/index");
// to drop existing database and resync the database
db.sequelize.sync({force: false})

require("./app/routes/loan_application.routes")(app);


app.use(express.static(path.resolve(__dirname, 'assets')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'assets', 'index.html'));
});

/**
 * Post route for calculating a loan's payment options
 * @params formData object containing information required to calculate the loan
 * @return loanOptions object with array or loan payment options
 */
app.post('/calculateInternal', async (req,
                                  res) => {
    try {
        // get form data from the body
        const formData = req.body.data;

        // call api and supply data provided
        // console.log("calculateLoanUrl:",calculateLoanUrl,"formData:", formData, "apiKey:",apiKey)
        const response = await axios.post(calculateLoanUrl, formData, apiKey);
        // get the data if successful
        const data = {loanOptions: JSON.parse(response.data).section};

        res.status(200).send(data);
    } catch (err) {
        // console.log(err);
        // return any error info with 500 status code
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

/**
 * Post route for sending an SMS to a phone number
 * @params params object: {params : { recipient: '2677123456', message: 'Hello World!' } }
 * @return loanOptions object with array or loan payment options
 */
app.post('/sendSMS', async (req,
                            res) => {
    try {
        // get params from body

        const {recipient, message} = req.body.data;

        // check if both are present
        if (!(recipient && message)) {
            // one or both are missing, send error message to client
            res.status(400).send('Missing parameter(s). ' +
                'Required {"params" : { "recipient": "2677123456", ' +
                '"message": "Hello World!" } }');
        }else{
            // call sendSMS function with the parameters
            const responseData = await sendSMS(recipient, message);

            // return response from message API
            res.status(200).send(responseData);
        }


    } catch (err) {
        // for other errors, send error message
        console.log(err.message)
        res.status(500).send(err.message);
    }
})

// listen at endpoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Ready! at port ${PORT} 🚀`));

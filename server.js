const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
require('dotenv').config()


// initialise express into app variable
const app = express();

// for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// cross origin access to allow backend to communicate with frontend
app.use(cors());

/**
 * Post route for making a payment
 * @params formData object containing information required to make a payment
 * @return response object with array or payment options
 */
app.post('/makePayment', async (req, res) => {
    try {
        // get form data from the body
        const formData = req.body;
        console.log(req.body)

        const xmlBodyStr = `
        <?xml version="1.0" encoding="utf-8"?>
            <API3G>
                <CompanyToken>${process.env.COMPANY_TOKEN}</CompanyToken>
                <Request>createToken</Request>
                <Transaction>
                    <PaymentAmount>${formData.amount}</PaymentAmount>
                    <PaymentCurrency>${formData.currency || 'Bwp'}</PaymentCurrency>
                    <PTL>${process.env.PTL}</PTL>
                    <PTLtype>${process.env.PTL_TYPE}</PTLtype>
                    <customerEmail>${formData.customerEmail}</customerEmail>
                    <customerFirstName>${formData.customerFirstName}</customerFirstName>
                    <customerLastName>${formData.customerLastName}</customerLastName>
                    <customerAddress>${formData.customerAddress}</customerAddress>
                    <customerCity>${formData.customerCity}</customerCity>
                    <customerCountry>${formData.customerCountry}</customerCountry>
                    <customerDialCode>${formData.customerDialCode}</customerDialCode>
                    <customerPhone>${formData.customerPhone}</customerPhone>
                    <CompanyAccRef>${formData.CompanyAccRef}</CompanyAccRef>
                </Transaction>
                <Services>
                    <Service>
                        <ServiceType>${process.env.SERVICE_TYPE}</ServiceType>
                        <ServiceDescription>${formData.serviceDiscription}</ServiceDescription>
                        <ServiceDate>${formData.serviceDate}</ServiceDate>
                    </Service>
                </Services>
            </API3G>`;
        let config = {
            headers: {
                'Content-Type': 'text/xml',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }

        };
        // call api and supply data provided
        // console.log("calculateLoanUrl:",calculateLoanUrl,"formData:", formData, "apiKey:",apiKey)
        const response = await axios.post("https://secure.3gdirectpay.com/API/v6/", xmlBodyStr, config).then(async response => {
            return response
        })
        // get the data if successful
        res.status(200).send(response.data);
    } catch (err) {
        // console.log(err);
        // return any error info with 500 status code
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

/**
 * Post route for making a payment
 * @params formData object containing information required to make a payment
 * @return response object with array or payment options
 */
app.post('/verifyPayment', async (req, res) => {
    try {
        // get form data from the body
        const formData = req.body;

        const xmlBodyStr = `<?xml version="1.0" encoding="utf-8"?>
        <API3G>
            <CompanyToken>${process.env.COMPANY_TOKEN}</CompanyToken>
            <Request>verifyToken</Request>
            <TransactionToken>${formData.TransactionToken}</TransactionToken>
        </API3G>`;
        let config = {
            headers: {
                'Content-Type': 'text/xml',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }

        };
        // call api and supply data provided
        // console.log("calculateLoanUrl:",calculateLoanUrl,"formData:", formData, "apiKey:",apiKey)
        const response = await axios.post("https://secure.3gdirectpay.com/API/v6/", xmlBodyStr, config).then(async response => {
            return response
        })
        // get the data if successful
        res.status(200).send(response.data);
    } catch (err) {
        // console.log(err);
        // return any error info with 500 status code
        console.log(err.message)
        res.status(500).send(err.message)
    }
})


// listen at endpoint
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Ready! at port ${PORT} 🚀`));

const axios = require("axios");

async function verifyPayment (companyRef) {
    try {
        console.log("payment")
        await axios.post("https://secure.3gdirectpay.com/API/v6/", {
            CompanyToken: process.env.COMPANY_KEY,
            Request: "verifyToken",
            CompanyRef: companyRef,
            VerifyTransaction: 1
        }).then(response => {
            console.log(response)
        })

    } catch( error) {
        // console.log(err);
        // return any error info with 500 status code
        console.log(error.message)
    }
}

module.exports = {verifyPayment};
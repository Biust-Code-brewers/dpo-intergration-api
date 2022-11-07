const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const axios = require("axios");
const {verifyPayment} = require("./functions");
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// cross origin access to allow backend to communicate with frontend
app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Post route for making a payment
 * @params formData object containing information required to make a payment
 * @return response object with array or payment options
 */
app.post('/make-payment', async (req, res) => {
    try {
        // get form data from the body
        const formData = req.body.data;
        // call api and supply data provided
        // console.log("calculateLoanUrl:",calculateLoanUrl,"formData:", formData, "apiKey:",apiKey)
        const response = await axios.post("https://secure.3gdirectpay.com/API/v6/", {
            // Create a tocken
            CompanyToken: process.env.COMPANY_KEY,
            Request: "createToken",
            // send payment request parameters
            PaymentAmount: formData.amount,
            PaymentCurrency: formData.currency,
            CompanyRef: formData.companyRef,
            RedirectURL: formData.redirectUrl,
            BackURL: formData.redirectUrl,
            customerEmail: formData.user.email,
            customerFirstName: formData.user.fullName,
            customerAddress: formData.user.address,
            customerPhone: formData.user.phone,
            // token to identify who made the payment
            userToken: formData.user.userId,
            // Name of the default country for the payment option
            DefaultPaymentCountry: "Botswana",
            // source of the transaction
            TransactionSource: "Website"
        }).then(async response => {
            console.log("payment ressponse is : ", response)
            // after payment is done, verify it
            await verifyPayment(formData.companyRef).catch((err)=>{
                // console.log(err);
                // return any error info with 500 status code
                console.log(err.message)
                res.status(500).send(err.message)
            })
            return response
        })
        // get the data if successful
        const data = {paymentResponse: JSON.parse(response.data).section};
        res.status(200).send(data);
    } catch (err) {
        // console.log(err);
        // return any error info with 500 status code
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

// listen at endpoint
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Ready! at port ${PORT} 🚀`));

module.exports = app;

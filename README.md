# node-server

This is the Tiro e teng api to connect to the DPO

### Steps:

```text
1. Clone this repository
2. Install node on on your machine by downloading it here https://nodejs.org/en/
3. Run npm install on the root of the node-server folder you just cloned on your terminal
4. Using the terminal on the root of the node-server folder you just cloned run: npm run dev
```

# Configure test and production environments

To configure for the test environments, create a .env file in the route of the project and add the
following line in the file

>NODE_ENV=development

To configure for the production environments, create a .env file in the route of the project and add the
following line in the file

>NODE_ENV=production

# Configure DPO Settings
URL to redirect the customer after the payment.
The customer will be redirected to this URL with the below variables in GET method.
You can send your link with additional variables, the system will recognize it and the additional variables will be sent out with “&” instead of “?” in the beginning.
Variables:

TransID - Transaction ref.
CCDapproval - Approval number
PnrID - Customer ref
TransactionToken - Transaction ref. (repeated)
CompanyRef - Customer ref. (repeated)

>COMPANY_TOKEN=_your token goes here_

URL to let the customer go back from the payment page.
The customer will be redirected to this URL with "TransactionToken" and "CompanyRef"
variables in GET method. You can send your link with additional variables, the system
will recognize it and the additional variables will be sent our with "&" instead of "?" in the beginning
> REDIRECT_URL= _url_

url to redirect customers after transaction
>BACK_URL=_url_

Number of hours to payment time limit
>PTL=_8_

Define if “PTL” tag is hours or minutes. options: “hours” or “minutes”
>PTL_TYPE=

Internal accounting reference number
>COMPANY_ACC_REF=

Service type number according to the options accepted from DPO
>SERVICE_TYPE=5525

Service type name according to the options accepted from DPO
>SERVICE_TYPE_NAME=


####NB: the .env file is not version controlled since it can also be used to save port and api keys

# Set up custom ports

To set up custom ports for the api you can edit
> node-server/server.js

inside you can change the port to your custom port by editing the

```javascript
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
```

replace port 8080 with your own custom port
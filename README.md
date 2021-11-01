# node-server

This is the node API for interacting with the calculator api to see how it works please see the README.md in
this https://github.com/DURIGA-TECH/loan-calculator.git repository

# Set up mysql database

navigate to the
> node-server/app/config

And edit

> db.config.js

configuration for MySQL database are saved and stored in this file. in the file there is the following code snippet

```javascript
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345678",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
```

First five parameters are for MySQL connection. pool is optional, it will be used for Sequelize connection pool
configuration:

```
max: maximum number of connection in pool
min: minimum number of connection in pool
idle: maximum time, in milliseconds, that a connection can be idle before being released
acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
```

when the above step is done you configure your app so that it can locate the configurations and this is done in the file
at
> app/models/

open and edit
> index.js

inside index.js you edit the line

> const dbConfig = require("<path to your config file>/db.config.js");

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

# Using this code as an Api

This project can be used as an api between api for the Bayport loan calculator and the inhouse My-sql database but this
api can be used to send data to any database

To test this project as an api:

use https:localhost:8080/api with the following routes

post:
> create new clients and add a new loan-application in the mysql database

```
1. /api/new/clients
2. /api/loan-applications
```

Get:

```
1. /api/clients -> returns all the clients in the mysql database
2. /api/clients/:id -> replace id with the actual id of the client and it will return that client
```

Put:

```
1. api/clients/:id -> saves a client of id specified into the mysql database client table
```

delete:

```
1. api/clients/:id -> deletes a client of specified id from thew mysql databse
2. /delete/clients/all -> deletes all clients from the myslq database
```
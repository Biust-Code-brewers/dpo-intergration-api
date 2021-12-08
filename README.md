# node-server

This is the Bayport Botswana loan calculator. Before using this calculator, connect to the vpn first and follow the
following steps to start up the application.

### Steps:

```text
1. Clone this repository: https://github.com/DURIGA-TECH/node-server.git
2. Install node on on your machine by downloading it here https://nodejs.org/en/
3. Run npm install on the root of the node-server folder you just cloned on your terminal
4. Using the terminal on the root of the node-server folder you just cloned run: npm run dev
5. Then navigate to http://localhost:5000/ on your local browser to access the loan calculator app
```

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

> const dbConfig = require("...(path to your config file)/db.config.js");

# Configure test and production environments

To configure for the test environments, create a .env file in the route of the project and add the
following line in the file

>NODE_ENV=development

To configure for the production environments, create a .env file in the route of the project and add the
following line in the file

>NODE_ENV=production

####NB: the .env file is not version controled since it canalso be used to save port and api keys

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
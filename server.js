const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// body-parser is a module that parses the request (of various content types) and creates a req.body object that we can access in our routes.
//A middleware is a function that has access to the request and response objects. It can execute any code, transform the request object, or return a response.
app.use(bodyParser.urlencoded({extended: true}))


// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//define route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notes (API) app."})
})

// Require Notes routes
require('./app/routes/note.routes.js')(app);

//listen for requests
app.listen(3000,()=> {
    console.log("Server is listening on port 3000");
})
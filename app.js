const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const tutorialRouter = require('./src/routes/tutorial.routes');

const app = express();

let corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(morgan());

//* parse requests of content-type - application/json
app.use(express.json());

//* parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//! Router
app.use('/api/tutorials', tutorialRouter);

module.exports = app;

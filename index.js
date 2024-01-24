const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
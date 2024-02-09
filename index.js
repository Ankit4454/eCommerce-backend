const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const path = require('path');
const firebaseApp = require('./config/firebase');
const expressLayouts = require('express-ejs-layouts');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(passport.initialize());
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
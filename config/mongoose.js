const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECT_LC);
const db = mongoose.connection;

db.on('error', console.error.bind(console, `Error while connecting to MongoDB`));

db.once('open', function(){
    console.log(`Connected to Database :: MongoDB`);
}); 

module.exports = db;
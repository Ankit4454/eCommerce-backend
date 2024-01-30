const firebase = require('firebase/app');

const firebaseConfig = {
    apiKey: process.env.LC_API_KEY,
    authDomain: process.env.LC_AUTH_DOMAIN,
    projectId: process.env.LC_PROJECT_ID,
    storageBucket: process.env.LC_STORAGE_BUCKET,
    messagingSenderId: process.env.LC_MESSAGING_SENDER_ID,
    appId: process.env.LC_APP_ID,
    measurementId: process.env.LC_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);

module.exports = app;
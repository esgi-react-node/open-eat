"use strict";

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyD8WIcdDrNRFjJGhmX3mwG8_D-4QwdNlzs",
    authDomain: "openeat-a325a.firebaseapp.com",
    databaseURL: "https://openeat-a325a.firebaseio.com",
    projectId: "openeat-a325a",
    storageBucket: "openeat-a325a.appspot.com",
    messagingSenderId: "568497594623",
    appId: "1:568497594623:web:ff62a6c9cd3cb6dcad6cca",
    measurementId: "G-3VT0ZG2E0F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const application = express();

application.use(cors({origin: true}));

application.get("/", (request, response) => {
    firebase.database().ref("/orders").once("value").then((snapshot) => {
        console.log(snapshot);
    });

    response.json({
        success: true
    });
});
application.get("/:id", (request, response) => response.json({success: true, id: request.params.id}));

exports.orders = functions.https.onRequest(application);

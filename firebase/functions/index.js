"use strict";

const express = require("express");
const cors = require("cors");
const firebase = require("firebase");
const functions = require("firebase-functions");

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

firebase.initializeApp(firebaseConfig);

const application = express();
const firestore = firebase.firestore();

application.use(cors({origin: true}));

application.get('', async (request, response) => {
    let data = [];

    if (request.query.user) {
        data = await firestore.collection('orders').where('user', '==', request.query.user).get();
    } else {
        data = await firestore.collection('orders').get();
    }

    const orders= [];
    
    data.forEach((doc) => {
        orders.push(doc.data());
    });

    response.json(orders);
});

application.get('/:id', async (request, response) => {
    const order = await firestore.collection('orders').where('id', '==', parseInt(request.params.id)).get();
    response.json(order.data());
});

application.post('', async (request, response) => {
    await firestore.collection('orders').add(request.body).then(async docRef => {
        const order = await firestore.collection('orders').doc(docRef.id).get();
        response.send(order.data());
    });
});

application.put('/:id', async (request, response) => {
    await firestore.collection('orders').where('id', '==', parseInt(request.params.id)).set(request.body);
    const order = await firestore.collection('orders').where('id', '==', parseInt(request.params.id)).get();
    response.send(order.data());
});

application.delete('/:id', async (request, response) => {
    const snapshot = await firestore.collection('orders').where('id', '==', parseInt(request.params.id)).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    
    snapshot.forEach(async doc => {
        await firestore.collection('orders').doc(doc.id).delete();
    });

    response.send(null)
});

exports.orders = functions.https.onRequest(application);

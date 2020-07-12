"use strict";

const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

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

const serviceAccount = require("./adminsdk_key.json");
const fcmToken = 'BA1kWXUhkHPV0Drrbn5YdDHet3gPh0G-UsMCQp-JfxTqfq9X3uhNE1B3CBL2Ev4FAeeiWuzhz4KCi3PWI--xZj8';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://openeat-a325a.firebaseio.com"
});

const app = express();
const firestore = firebase.firestore();

app.use(cors({origin: true}));

// --- Orders ---
app.get('/orders', async (request, response) => {
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

app.post('/orders', async (request, response) => {
    await firestore.collection('orders').add(request.body).then(async docRef => {
        const order = await firestore.collection('orders').doc(docRef.id).get();
        response.json(order.data());
    });
});

app.delete('/orders/:id', async (request, response) => {
    const snapshot = await firestore.collection('orders').where('id', '==', parseInt(request.params.id)).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    
    snapshot.forEach(async doc => {
        await firestore.collection('orders').doc(doc.id).delete();
    });

    response.json(null)
});

// --- Users ---
app.get('/users/:id', async (request, response) => {
    const snapshot = await firestore.collection('users').where('id', '==', request.params.id).get();
    
    if (snapshot.empty) {
        response.json({});
    }

    snapshot.forEach(async doc => {
        const user = await firestore.collection('users').doc(doc.id).get();
        response.json(user.data());
    });
});

app.post('/users', async (request, response) => {
    await firestore.collection('users').add(request.body).then(async docRef => {
        const user = await firestore.collection('users').doc(docRef.id).get();
        response.json(user.data());
    });
});

app.put('/users/:id', async (request, response) => {
    const snapshot = await firestore.collection('users').where('id', '==', request.params.id).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    snapshot.forEach(async doc => {
        await firestore.collection('users').doc(doc.id).update(request.body);
        const user = await firestore.collection('users').doc(doc.id).get();
        response.json(user.data());
    });
});

// --- Restaurants
app.get('/restaurants', async (request, response) => {
    const snapshot = await firestore.collection('restaurants').get();
    let restaurants = [];

    snapshot.forEach(async doc => {
        restaurants.push(doc.data());
    });

    response.json(restaurants);
});

app.put('/restaurants/:id', async (request, response) => {
    const snapshot = await firestore.collection('restaurants').where('id', '==', parseInt(request.params.id)).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    snapshot.forEach(async doc => {
        await firestore.collection('restaurants').doc(doc.id).update(request.body);
        const restaurant = await firestore.collection('restaurants').doc(doc.id).get();
        response.json(restaurant.data());
    });
});

exports.api = functions.https.onRequest(app);
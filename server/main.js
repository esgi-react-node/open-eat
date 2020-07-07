const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());

app.get('/orders', (req, res) => {
    fetch('http://client:5001/openeat-a325a/us-central1/orders-all')
    .then(response => {
        return response.json();
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

app.get('/orders/show/:id', (req, res) => {
    fetch(`http://client:5001/openeat-a325a/us-central1/orders-get/${req.params.id}`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

app.get('/orders//add', (req, res) => {
})

app.get('/orders/update/:id', (req, res) => {
})

app.get('/orders/delete/:id', (req, res) => {
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
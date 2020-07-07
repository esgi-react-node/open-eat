const functions = require('firebase-functions');

exports.all = functions.https.onRequest((req, res) => {
    res.send([
        {
            user: "test",
            order: ["oeuf", "tomate"],
            total: 5
        },
        {
            user: "toto",
            order: ["banane", "orange"],
            total: 7
        }
    ]);
});

exports.get = functions.https.onRequest((req, res) => {
    res.send(req.params.id);
});

exports.add = functions.https.onRequest((req, res) => {
    // ...
});

exports.update = functions.https.onRequest((req, res) => {
    // ...
});

exports.delete = functions.https.onRequest((req, res) => {
    // ...
});
const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
const app = express()

admin.initializeApp({
    credential: admin.credential.cert('./credentials.json'),
    databaseURL: "https://fb-api-cbcc4.firebaseio.com"
})

app.get('/hello-word', (req, res) => {
    return res.status(200).json({ message: 'hello word' })
})

app.use(require('./routes/ProductsRoutes'))

exports.app = functions.https.onRequest(app);


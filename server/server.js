const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./route/routes');
require('dotenv').config();

app.use(express.json()); 

// Enable CORS middleware
app.use((req, res, next) => {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow certain headers to be sent
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Allow certain HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.listen(5000, function check(error) {
    if (error) {
        console.log("An error has occurred");
    } else {
        console.log("Started server");
    }
});

mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.czmy3sa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error Connecting to DB:', error);
});

db.once('open', () => {
    console.log('Successfully Connected to DB');
});

app.use(routes);
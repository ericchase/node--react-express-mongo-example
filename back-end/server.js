const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://readonly:48z43UnL5B2j5BWn8nWU2R69Zqk97vTv@cluster0.x1lvu.mongodb.net';

app.route('/mongodb').get(function (req, res) {
    MongoClient.connect(url, async function (err, connection) {
        if (err) throw err;
        const db = connection.db('sampledb');
        const collection = db.collection('collection0');
        const cursor = collection.find().limit(1);
        cursor.toArray(function (err, data) {
            if (err) throw err;
            res.send(data);
            connection.close();
        });
    });
});


mongoose.connect("mongodb+srv://readonly:48z43UnL5B2j5BWn8nWU2R69Zqk97vTv@cluster0.x1lvu.mongodb.net/sampledb", {
    useNewUrlParser: true
});

const collection0 = mongoose.model("collection0",
    new mongoose.Schema({
        hello: {
            type: String
        }
    })
);

app.route('/mongoose').get(function (req, res) {
    collection0.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

const server = app.listen(8080, function () { });

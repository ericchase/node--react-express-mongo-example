let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb+srv://readonly:48z43UnL5B2j5BWn8nWU2R69Zqk97vTv@cluster0.x1lvu.mongodb.net/test';

app.route('/api/home').get(function (req, res) {
    MongoClient.connect(url, async function (err, connection) {
        if (err) throw err;
        let db = connection.db('sample_training');
        let collection = db.collection('zips');
        let cursor = collection.find().limit(1);
        cursor.toArray(function (err, data) {
            if (err) throw err;
            console.log(data);
            res.send(data);
            connection.close();
        });
    });
});

let server = app.listen(8080, function () { });

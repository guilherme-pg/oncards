var express = require('express')
// const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/oncards')
    .then(
    () => {console.log('Database is connected.')},
    err => {console.log('Can not connect to the database ' + err)}
);


const cardRoute = require('./routes/card.route');
// const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/card', cardRoute);


app.get('/', function (req, res) {
    res.send("OnCards WORKING!");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);
});

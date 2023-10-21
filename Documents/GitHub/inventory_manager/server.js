const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Model = require("./model");

const port = 3000;

const doc = new Model({
    assetTag: "123ABC",
    serialNumber: "ABC123",
    deviceType: "Laptop",
    organization: "Department of Educaiton"
})


app.set('view engine', 'ejs');
app.use(express.static('Public'));

app.get('/data', function(req, res) {
    if(error) {
        res.status(500).end();
    } else {
        res.render('data.ejs')
    }
})

app.listen(port, function(error) {
    if(error) {
        console.log("Soimething went wrong", error);
    } else {
        console.log("Server listening on port " + port);
    }
});
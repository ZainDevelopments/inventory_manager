//dotenv
const dotenv = require("dotenv");
dotenv.config();

//Express
const express = require('express');
const app = express();
const port = process.env.PORT_KEY;

//MongoDB
const {MongoClient} = require("mongodb");
const MONGO_KEY = process.env.MONGO_KEY;
const uri = MONGO_KEY;
const client = new MongoClient(uri);
let db = client.db("PS97");



// client.connect();
// async function linkDB() {
//     try {
//       await client.connect();
//       console.log("CONNECTED");
      
//     } catch(e) {
//       console.log(e);
//     }
// }
// linkDB();

app.set('view engine', 'ejs');
app.use(express.static('Public'));

app.get('/data', function(req, res) {
    let dummy = [
        {
            assetTag : "DOE-1234",
            serialNumber: "1234",
            deviceType : "Laptop",
            assignedTo : "Zain",
            id : "TBD"
        },
        {
            assetTag : "DOE-56789",
            serialNumber: "56789",
            deviceType : "iPad",
            assignedTo : "Huong",
            id : "TBD"
        },
        {
            assetTag : "DOE-12739821",
            serialNumber: "5612739821789",
            deviceType : "iPad",
            assignedTo : "Cece",
            id : "TBD"
        }
    ]
    res.render('data', {data : dummy})
})

app.listen(port, function(error) {
    if(error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Server listening on port " + port);
    }
});
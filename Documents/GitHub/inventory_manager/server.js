//dotenv
const assert = require("assert");
const dotenv = require("dotenv");
dotenv.config();

//Express
const express = require('express');
const app = express();
const port = process.env.PORT_KEY; //Port 3000

//Mongo
const {MongoClient, ObjectId} = require('mongodb');
if(process.env.MONGO_KEY !== 'production') {
    require('dotenv').config();
}
const MONGO_KEY = process.env.MONGO_KEY;
const uri = MONGO_KEY;
const client = new MongoClient(uri);
var db = client.db("PS97");
var collection = db.collection("Test");

var baseUrl = '/default';

//Express Stuff
app.use(express.json())
app.use(express.static('Public'));
app.set('view engine', 'ejs');

//Start GETs
app.get(baseUrl, (req,res) => {

    const dataReq = req.query.data;
    const colReq = req.query.col;

    if(dataReq != db && dataReq != undefined) {
        changeDB(dataReq);
    }
    if(colReq != collection && colReq != undefined) {
        changeCollection(colReq);
    }

    // console.log(`DATABASE: ${dataReq}\nCOLLECTION: ${colReq}`);

    if(dataReq && colReq) {
        listDatabases(client).then((dbList)=> {
            ListCols(db).then((colList)=> {
                FindAllDocs(db, colReq).then((documents) => {
                    res.render('default', {
                        database : dbList.databases,
                        collection : colList,
                        docs : documents
                    }),
                    () => {
                        console.log("Error");
                    }
                })
            })
        })
    } else {
        listDatabases(client).then((dbList)=> {
            ListCols(db).then((colList)=> {
                res.render('default', {
                    database : dbList.databases,
                    collection : colList,
                    docs : false
                }),
                () => {
                    console.log("Error");
                }
            })
        })
    }
});

app.get('/', (req, res) => {
    console.log("In /");
    res.redirect('/default');
})


//Start POSTs
app.post(baseUrl, async (req, res) => {
    console.log();
    console.log('Request Received');
    const data = req.body;
    console.log("INFORMATION RECEIVED: ");
    console.log(data);

    const filter = {_id : new ObjectId(data.id)};
    const update = {
        $set: {
            assetTag : data.assetTag,
            serialNumber : data.serialNumber,
            deviceType : data.deviceType,
            assignedTo : data.assignedTo
        }
    };

    try {
        // console.log("INSIDE TRY STATE");
        const result = await collection.updateOne(filter, update);
        console.log("DATABASE SUCCESSFULLY UPDATED: ", result);
        res.json({
            STATUS: "SUCCESS",
        });
    } catch (err) {
        console.log("ERROR UPDATING DATABASE: " + err);
        res.json({
            STATUS: "FAILED",
        });
    }
})

app.post('/default' + "/delete", async (req, res) => {
    console.log();
    console.log("INSIDE DELETE");
    console.log('Request Received');
    const data = req.body;
    console.log("INFORMATION RECEIVED: ");
    console.log(data);

    const filter = {_id : new ObjectId(data.id)};
    try {
        const result = await collection.deleteOne(filter);
        console.log("DATABASE SUCCESSFULLY UPDATED: ", result);
        res.json({
            STATUS : "SUCCESS"
        })
    } catch (e) {
        console.log("ERROR UPDATING DATABASE: " + err);
        res.json({
            STATUS : "FAILED"
        })
    }
})

app.post(baseUrl + "/add", async (req, res) => {
    console.log();
    console.log("INSIDE ADD");
    console.log('Request Received');
    const data = req.body;
    console.log("INFORMATION RECEIVED: ");
    console.log(data);
    
    try {
        const result = await collection.insertOne(data);
        console.log("DATABASE SUCCESSFULLY UPDATED: ", result);
        res.json({
            STATUS: "SUCCESS"
        });
    } catch (e) {
        console.log("ERROR UPDATING DATABASE: " + e);
        res.json({
            STATUS: "FAILED"
        });
    }
})

    //Create new Collection
app.post(baseUrl + '/createCol', async (req, res) => {
    console.log();
    console.log("INSIDE CREATE COL");
    console.log('Request Received');
    const collectionName = req.body;
    console.log("INFORMATION RECEIVED: ");

    try {
        const result = await db.createCollection(collectionName.colName);
        console.log("DATABASE SUCCESSFULLY UPDATED: ", result);
        res.json({
            STATUS: "SUCCESS"
        });
    } catch (e) {
        console.log("ERROR UPDATING DATABASE: " + e);
        res.json({
            STATUS: "FAILED"
        });
    }
})

app.post(baseUrl + '/deleteCol', async (req, res) => {
    console.log();
    console.log("INSIDE DELETE COL");
    try {
        const result = await db.collection(collection.collectionName).drop();        
        console.log("DATABASE SUCCESSFULLY UPDATED: ", result);
        res.json({
            STATUS: "SUCCESS"
        });
    } catch (e) {
        console.log("ERROR UPDATING DATABASE: " + e);
        res.json({
            STATUS: "FAILED"
        });
    }
})

// //Start connections
client.connect().then(()=> {
    console.log("Connected to Mongo");
    app.listen(port, ()=> console.log(`Server.js listening to port ${port}`)) 
}, ()=> {
    console.log("Failed to connect to Mongo");
});

//Mongo Functions

    //Helper functinos
function changeDB(name) {
    // console.log(`CHANGING DB NAME TO ${name}`);
    db = client.db(name); 
}

function changeCollection(name) {
    // console.log(`CHANGING COL NAME TO ${name}`);
    collection = db.collection(name);
}

function closeDB() {
    client.close();
}

async function listDatabases(client) {
    dbList = await client.db().admin().listDatabases({nameOnly : true});
    //console.log("Databases:");
    //dbList.databases.forEach(db => console.log(` - ${db.name}`))
    return dbList;
}

async function ListCols(db) {
    const list = await db.collections();
    return list;
}

async function CreateCol(db, colName) {
    const col = db.collection(colName);
    await db.createCollection(colName);
    console.log(`Created new Collection '${colName}' inside ${db.name}`);
}

async function FindAllDocs(db, col) {
    const collection = db.collection(col);
    const docs = await collection.find({}).toArray();
    return docs;
}

async function FindDoc(db, col, tag) {
    const doc = await db.collection(col).find({assetTag : tag});
    console.log(`${tag} found from ${col}`);
    return doc;
}

async function UpdateDoc(filter, options) {
    console.log("IN UPDATE DOC");

    const result = await collection.updateOne(filter, options, (err, result) => {
        if(err) {
            console.log("UPDATE FAILED: ", err);
        } else {
            console.log("UPDATE SUCCESSFUl");
        }
    });
    return result;
}
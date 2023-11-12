//dotenv
const assert = require("assert");
const dotenv = require("dotenv");
dotenv.config();

//Express
const express = require('express');
const app = express();
const port = process.env.PORT_KEY; //Port 3000

//Mongo
const {MongoClient} = require('mongodb');
if(process.env.MONGO_KEY !== 'production') {
    require('dotenv').config();
}
const MONGO_KEY = process.env.MONGO_KEY;
const uri = MONGO_KEY;
const client = new MongoClient(uri);
let db = client.db("PS97");
let collection = db.collection("Test");

//Express Stuff
app.set('view engine', 'ejs');
app.use(express.static('Public'));
app.use(express.json())

//Start GETs
app.get('/default', (req,res) => {
    const dataReq = req.query.data;
    const colReq = req.query.col;

    if(!dataReq == db) {
        changeDB(dataReq);
    }
    
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
    db = client.db(name); 
}

function changeCollection(name) {
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
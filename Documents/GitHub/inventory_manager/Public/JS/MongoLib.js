const {MongoClient} = require("mongodb");
var mongoose = require('mongoose');
const Model = require('../../model');

if(process.env.MONGO_KEY !== 'production') {
  require('dotenv').config();
}

const MONGO_KEY = process.env.MONGO_KEY;


//Secure in another file later on
const uri = MONGO_KEY;
const client = new MongoClient(uri);
let db = client.db("PS97");

export function print(n) {
  console.log(n);
}

async function linkDB() {
  try {
    await client.connect();
    console.log("CONNECTED");
  } catch(e) {
    console.log(e);
  }
}

async function closeDB() {
  try {
    await client.close();
  } catch(e) {
    console.log(e);
  }
}

export function changeDB(name) {
  db = client.db(name);
}

export async function listDatabases(client) {
  dbList = await client.db().admin().listDatabases();
  console.log("Databases:");
  dbList.databases.forEach(db => console.log(` - ${db.name}`))
}

export async function CreateCol(db, colName) {
  try {
    linkDB();
    const col = db.collection(colName);
    await db.createCollection(colName);
    console.log(`Created new Collection '${colName}' inside ${db.name}`);
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function CreateManyCol(db, colList) {
  linkDB();
  for(let i = 0; i < colList.length; i++) {
    await db.createCollection(colList[i]);
    console.log(`Created new Collection '${colName.name}' inside ${db.name}`);
  }
}

export async function ListCols(db) {
  try {
    linkDB();
    const list = await db.collections();
    console.log("Collections: ")
    list.forEach(c => {
      if(c.collectionName == "Test") {
      }
      console.log(`- ${c.collectionName}`)
    })
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function CheckColExist(db, colName) {
  try {
    linkDB();
    const list = await db.collections();
    list.forEach(c => {
      if(c.collectionName == colName) {
        console.log(`${colName} already exists`);
        return true;
      }
    })
    return false;
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function DropCol(db, col) {
  try {
    linkDB();
    await db.collection(col).drop();
    console.log(`'${col}' Collection was deleted`);
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function CreateDoc(db, col, doc) {
  try {
    linkDB();
    await db.collection(col).insertOne(doc);
    console.log(`Created ${doc.name} inside ${col}`);
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function CreateManyDocs(db, col, docList) {
  try {
    linkDB();
    const result = await db.collection(col).insertMany(docList);
    console.log(`${result.insertedCount} Documents were added`);
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function FindDocId(db, col, assestTag) {
  try {
    linkDB();
    const doc = await db.col.find({assetTag : assestTag});
    console.log(`${assestTag} was found`);
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function DropDeviceDocs(db, col, field) {
  try {
    linkDB();
    const result = await db.collection(col).deleteMany({device_Field : field});
    console.log(`${result.deletedCount} Documents deleted`)
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function DropAssestDoc(db, col, tag) {
  try{
    linkDB();
    const result = await db.collection(col).deleteMany({assetTag : tag});
    console.log(`${result.deletedCount} Documents deleted`)
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function DropSerialDoc(db, col, serial) {
  try {
    linkDB();
    const result = await db.collection(col).deleteMany({serialNumber : serial});
    console.log(`${result.deletedCount} Documents deleted`)
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function ListDocs(db, col) {
  try {
    linkDB();
    const list = await db.collection(col).find({}).toArray();
    console.log(`Documents inside '${col}':`);
    list.forEach(c => console.log(` - ${c._id}:\n\t\tassestTag : ${c.assetTag}\n\t\tserialNumber : ${c.serialNumber}`))
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function MoveDoc(docTag, colSource, colDest) {
  try {
    linkDB();
    const sourceCollection = db.collection(colSource);
    const colDestination = db.collection(colDest);
    const doc = sourceCollection.find({assetTag : docTag})
    console.log(doc);
    if(doc) {
      await colDestination.insertOne(doc);
      await sourceCollection.deleteOne({assetTag : docTag});
      console.log(`Document '${doc._id}' with a tag of ${docTag} was moved to ${colDest} from ${colSource}`);
    } else {
      console.log(`Document with tag ${docTag} was not found inside ${sourceCollection}`);
    }
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
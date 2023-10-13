//import mongoLink from config.js;

const { MongoClient } = require("mongodb");

if(process.env.MONGO_KEY !== 'production') {
  require('dotenv').config();
}

const MONGO_KEY = process.env.MONGO_KEY;

console.log(MONGO_KEY);

let document = {
  asset_tag: 123456,
  serial_number: 1233451234213213,
  device_type: "Laptop",
  organization: "Department of Education"
};

let documents = [
  {
    asset_tag: 1212313456,
    serial_number: 234213213,
    device_type: "Laptop",
    organization: "Department of Education"
  },
  {
    asset_tag: 56,
    serial_number: 13,
    device_type: "Laptop",
    organization: "Department of Education"
  },
  {
    asset_tag: 16,
    serial_number: 1231233,
    device_type: "iPad",
    organization: "Department of Education"
  }
];



async function main() {
  //Secure in another file later on
  const uri = MONGO_KEY;
  const client = new MongoClient(uri);
  const db = client.db("PS97");

  try {
    await client.connect();
    await listDatabases(client);
    // await CreateCol(db, "Test");
    // await CreateCol(db, "TestTwo");
    // await ListCols(db); 
    //await CreateManyCol(db, ["TestOne", "TestTwo"]);
    //await CreateDoc(db, "Test", document);
    // await CreateManyDocs(db, "Test", documents);
    //await CheckColExist(db, "Test");
    //await DropCol(db, "TestTwo");
    //await DropDeviceDocs(db, "Test", "Laptop")
    // await ListDocs(db, "Test");
    //await FindDocId(db, "Test", "651a4bc1451fbc6bed7bab3f")
    //await MoveDoc(56, "Test", "TestTwo");

  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }

  // Lists all databases currently
  async function listDatabases(client) {
      dbList = await client.db().admin().listDatabases();
      console.log("Databases:");
      dbList.databases.forEach(db => console.log(` - ${db.name}`))
  }

  async function CreateCol(db, colName) {
    await db.createCollection(colName);
    console.log(`Created new Collection '${colName}' inside ${db.name}`);
  }

  async function CreateManyCol(db, colList) {
    for(let i = 0; i < colList.length; i++) {
      await db.createCollection(colList[i]);
      console.log(`Created new Collection '${colName.name}' inside ${db.name}`);
    }
  }
  
  async function ListCols(db) {
    const list = await db.collections();
    console.log("Collections: ")
    list.forEach(c => {
      if(c.collectionName == "Test") {
      }
      console.log(`- ${c.collectionName}`)
    })
  }

  async function CheckColExist(db, colName) {
    const list = await db.collections();
    list.forEach(c => {
      if(c.collectionName == colName) {
        console.log(`${colName} already exists`);
        return true;
      }
    })
    return false;
  }

  async function DropCol(db, col) {
    await db.collection(col).drop();
    console.log(`'${col}' Collection was deleted`);
  }

  async function CreateDoc(db, col, doc) {
    await db.collection(col).insertOne(doc);
    console.log(`Created ${doc.name} inside ${col}`);
  }

  async function CreateManyDocs(db, col, docList) {
    const result = await db.collection(col).insertMany(docList);
    console.log(`${result.insertedCount} Documents were added`);
  }

  async function DropDeviceDocs(db, col, field) {
    const result = await db.collection(col).deleteMany({device_Field : field});
    console.log(`${result.deletedCount} Documents deleted`)
  }

  async function DropAssestDoc(db, col, tag) {
    const result = await db.collection(col).deleteMany({asset_tag : tag});
    console.log(`${result.deletedCount} Documents deleted`)
  }

  async function DropSerialDoc(db, col, serial) {
    const result = await db.collection(col).deleteMany({serial_number : serial});
    console.log(`${result.deletedCount} Documents deleted`)
  }

  async function ListDocs(db, col) {
    const list = await db.collection(col).find({}).toArray();
    console.log(`Documents inside '${col}':`);
    list.forEach(c => console.log(` - ${c._id}:\n\t\tassest_tag : ${c.asset_tag}\n\t\tserial_number : ${c.serial_number}`))
  }

  async function MoveDoc(docTag, colSource, colDest) {
    const sourceCollection = db.collection(colSource);
    const colDestination = db.collection(colDest);
    const doc = sourceCollection.find({asset_tag : docTag})
    console.log(doc);
    if(doc) {
      await colDestination.insertOne(doc);
      await sourceCollection.deleteOne({asset_tag : docTag});
      console.log(`Document '${doc._id}' with a tag of ${docTag} was moved to ${colDest} from ${colSource}`);
    } else {
      console.log(`Document with tag ${docTag} was not found inside ${sourceCollection}`);
    }
  }
}

main().catch(console.error);
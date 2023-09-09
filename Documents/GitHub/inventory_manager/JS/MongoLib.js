const { MongoClient } = require("mongodb");

//Secure in another file later on
const uri =
  "mongodb+srv://ZainAliDevelopments:%23Zainpokemon1122@zaindevelopments.moocc6b.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db("PS97");

async function main() {
  let array = ['Room 464', 'Room 460','Room 458', 'Room 456', 'Room 319'];

  try {
    await client.connect();
    //await listDatabases(client);
    // await CreateCollection("Room 462");
    // await CreateCollection("Room 464");
    await CreateManyCollections(array);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }

  // Lists all databases currently
  // async function listDatabases(client) {
  //     dbList = await client.db().admin().listDatabases();
  //     console.log("Databases:");
  //     dbList.databases.forEach(db => console.log(` - ${db.name}`))
  // }
}

async function CreateCollection(collectionName) {
  collectionExists = CheckCollectionExist(collectionName);

  if (collectionExists) {
    console.log(`Collection '${collectionName}' already exists`);
  } else {
    database.createCollection(collectionName);
    console.log(collectionName, " Successfully created");
  }
}

async function CreateManyCollections(collectionList) {
    const collectionNames = await database.listCollections().toArray();

    for(let i = 0; i < collectionList.length; i++) {
        let currentCollection = collectionList[i];
        let collectionExists = CheckCollectionExist(currentCollection)
        if(collectionExists) {
            console.log(`Collection '${currentCollection}' already exists`);
        } else {
            database.CreateCollection(currentCollection);
            console.log(`Collection '${currentCollection}' successfully created`);
        }
    }
}

async function CheckCollectionExist(collectionName) {
  const collectionNames = database.listCollections().toArray();
  return collectionNames.some((coll) => coll.name === collectionName);
}

main().catch(console.error);

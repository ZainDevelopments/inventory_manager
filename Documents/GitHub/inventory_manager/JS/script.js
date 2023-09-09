const {MongoClient} = require('mongodb');

//Secure in another file later on
const uri = "mongodb+srv://ZainAliDevelopments:%23Zainpokemon1122@zaindevelopments.moocc6b.mongodb.net/";
const client = new MongoClient(uri);


async function main() {

    

    try {
        await client.connect();
        //await listDatabases(client);
        await CreateCollection('Room 462');
        await CreateCollection('Room 464');
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
    // try {
    //     await client.connect();
        const database = client.db("PS97");

        collectionExists = CheckCollectionExist(collectionName)

        if(collectionExists) {
            console.log(`Collection '${collectionName}' already exists`);
        } else {
            database.createCollection(collectionName);
            console.log(collectionName, " Successfully created");
        }
    // } catch (e) {
    //     console.log(e);
    // } finally {
    //     await client.close();
    // }

}

async function CheckCollectionExist(collectionName) {
    const collectionNames = await database.listCollections().toArray();
    const collectionExists = collectionNames.some((coll) => coll.name === collectionName);

    return collectionExists;
}

main().catch(console.error);

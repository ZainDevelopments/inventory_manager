const {MongoClient} = require('mongodb');


async function main() {

    //Secure in another file later on
    const uri = "mongodb+srv://ZainAliDevelopments:%23Zainpokemon1122@zaindevelopments.moocc6b.mongodb.net/";
    const client = new MongoClient(uri);
    

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }

    async function listDatabases(client) {
        dbList = await client.db().admin().listDatabases();
        console.log("Databases:");
        dbList.databases.forEach(db => console.log(` - ${db.name}`))
    }
}

main().catch(console.error);
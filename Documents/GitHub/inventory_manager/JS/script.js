const {MongoClient} = require('mongodb');


async function main() {
    const uri = "mongodb+srv://ZainAliDevelopments:%23@zaindevelopments.moocc6b.mongodb.net/";
    const client = new MongoClient(uri);
    

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
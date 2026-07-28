import { MongoClient } from 'mongodb';

const LOCAL_URI = "mongodb://localhost:27017/sehaat-saathi";
const ATLAS_URI = "mongodb+srv://sehaatsaathi_db_user:Abhi620008780@sehaat-saathi.0f6yp12.mongodb.net/sehaat-saathi?appName=Sehaat-Saathi";

async function migrate() {
    const localClient = new MongoClient(LOCAL_URI);
    const atlasClient = new MongoClient(ATLAS_URI);

    try {
        console.log("Connecting to Local DB...");
        await localClient.connect();
        const localDb = localClient.db("sehaat-saathi");

        console.log("Connecting to Atlas DB...");
        await atlasClient.connect();
        const atlasDb = atlasClient.db("sehaat-saathi");

        const collections = await localDb.collections();
        console.log(`Found ${collections.length} collections to migrate.`);

        for (const collection of collections) {
            const colName = collection.collectionName;
            console.log(`Migrating collection: ${colName}...`);
            
            const documents = await collection.find({}).toArray();
            if (documents.length > 0) {
                const atlasCollection = atlasDb.collection(colName);
                
                // Clear existing in Atlas just to be safe
                await atlasCollection.deleteMany({});
                
                // Insert all
                await atlasCollection.insertMany(documents);
                console.log(`   -> Copied ${documents.length} documents for ${colName}`);
            } else {
                console.log(`   -> Skipping ${colName} (empty)`);
            }
        }
        
        console.log("Migration completed successfully! 🎉");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await localClient.close();
        await atlasClient.close();
    }
}

migrate();

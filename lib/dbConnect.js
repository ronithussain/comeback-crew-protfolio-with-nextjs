import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

export const collectionNamesObj = {
    servicesCollection: "test-services",
    userCollection: "test-user",
    bookingCollection: "test-booking"
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export default function dbConnect(collectionName) {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_NAME).collection(collectionName);
}
import { MongoClient } from "mongodb";
import type {  Db } from "mongodb";

const MONGODB_DB = "Juridicas";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}
if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local",
  );
}

// Define the structure of the connection object
interface Connection {
  client?: MongoClient; // client is optional to prevent undefined access
  db?: Db; // type the db as Db from mongodb
}

interface Cached {
  conn?: Connection; // conn is optional to prevent undefined access
}

const connectToDatabase = async (): Promise<Cached> => {
  const cached: Cached = {}; // Initialize cached as an empty object of type Cached
  const conn: Connection = {}; // Initialize conn as an empty object of type Connection

  const opts = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true, // deprecated
  };
  
  console.log("connecting");
  
  const promise = MongoClient.connect(uri, opts)
    .then((client) => {
      conn.client = client; // Set the client on the conn object
      const db = client.db(MONGODB_DB);
      console.log(db, "connected");
      return db;
    })
    .then((db) => {
      conn.db = db; // Set the db on the conn object
      cached.conn = conn; // Cache the connection
    });

  await promise;
  console.log(promise, cached);
  
  return cached; // Return cached object
};

export default connectToDatabase;

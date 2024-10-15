import { MongoClient } from "mongodb";
const MONGODB_DB = "Juridicas";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
console.log(uri);
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

const connectToDatabase = async () => {
  // console.log("here")
  let cached = {};
  const conn = {};
  const opts = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true, deprecated
  };
  console.log("conecting");
  const promise = MongoClient.connect(uri, opts)
    .then((client) => {
      conn.client = client;
      const db = client.db(MONGODB_DB);
      console.log(db, "conected");
      return db;
    })
    .then((db) => {
      conn.db = db;
      const recipes = db.collection("Colormetta");
      cached.conn = conn;
    });
  await promise;
  console.log(promise, cached);
  return cached;
};
export default connectToDatabase;

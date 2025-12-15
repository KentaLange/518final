import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../config.env") });

const uri = process.env.ATLAS_URI || "";
if (!uri) {
  throw new Error("ATLAS_URI environment variable is not set");
}

const client = new MongoClient(uri, { /* options, if any */
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch (err) {
  console.error("MongoDB connection error:", err);
  throw err;
}

let db = client.db("pomodoro");

export default db;
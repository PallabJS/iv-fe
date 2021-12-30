const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");

dotenv.config();

// MONGO CONNECTION VARIABLES
let mongoUri = process.env["MONGO_URI"] || "mongodb://localhost:27017";

let databaseName = "demo";
global.db = null;

// Call this when the app starts
const connectToMongoDb = async () => {
    let client = await MongoClient.connect(mongoUri);
    db = client.db(databaseName);
    console.log("MONGO CONNECTED");
    return db;
};

module.exports = { connectToMongoDb };

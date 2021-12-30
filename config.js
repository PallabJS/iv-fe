const dotenv = require("dotenv");
const { connectToMongoDb } = require("./app_extensions/mongodb");

dotenv.config();

// config variables
const PORT = process.env.PORT || 8000;

// initialize app connections
const initializeAppExtension = async () => {
    let extensions = {};

    // connect mongo
    extensions.db = await connectToMongoDb();
    return extensions;
};

module.exports = { initializeAppExtension, PORT };

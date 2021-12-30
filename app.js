const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { PORT, initializeAppExtension } = require("./config");

// Load envirenment variables
dotenv.config();

const app = express();

async function initializeApp() {
    const { dashboardRouter } = require("./routers/dashboard");

    app.use(cors());
    app.use(express.json());

    // ROUTERS
    app.use("/dashboard", dashboardRouter);

    app.get("/", (req, res) => {
        res.json({ STATUS: "OK" });
    });
}

async function startServer() {
    await initializeAppExtension();
    await initializeApp();

    app.listen(PORT, () => {
        console.log("Server is Listening as port: ", PORT);
    });
}

startServer();

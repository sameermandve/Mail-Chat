import dotenv from "dotenv";
import path from "path";

// Configuration for env file
dotenv.config({
    path: "./.env",
});

import { connectDB } from "./db/database.js";
import { app } from "./app.js";
import { setupSocket } from "./utils/socket.js";

const __dirname = path.resolve();

// Database connection
connectDB()
    .then(() => {
        const { server } = setupSocket(app);

        server.on("error", () => {
            console.error(`Error while starting the server: ${error}`);
        });

        server.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error while connecting database: ${error}`);
    });

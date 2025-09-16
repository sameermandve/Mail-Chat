import dotenv from "dotenv";

// Configuration for env file

dotenv.config({
    path: "./.env",
});

import { app } from "./app.js";
import { connectDB } from "./db/database.js";

// Database connection

connectDB()
    .then(() => {
        app.on("error", () => {
            console.error(`Error while starting the server: ${error}`);
        });

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error while connecting database: ${error}`);
    });
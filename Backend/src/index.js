import dotenv from "dotenv";
import path from "path";
import express from "express";

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

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../frontend/dist")));

            app.get("*", (_, res) => {
                res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
            });
        }

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

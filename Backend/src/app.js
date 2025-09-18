import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb",
}));

app.use(cookieParser());

// All parent routes

import { ApiError } from "./utils/ApiError.js";

import { userRouter } from "./routes/userRouter.route.js";
import { messageRouter } from "./routes/messageRouter.route.js";
import { friendRouter } from "./routes/friendRouter.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/search-friend", friendRouter);

const errorHandler = async (err, req, res, next) => {
    
    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json({
                statusCode: err.statusCode,
                success: false,
                message: err.message,
                errors: err.errors || [],
            });
    }

    console.log(`Unknown Error: ${err}`);
    return res
        .status(500)
        .json({
            success: false,
            message: "Internal Server Error",
        });
}

app.use(errorHandler);

export { app }
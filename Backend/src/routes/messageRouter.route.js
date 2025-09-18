import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUsersWhoAreFriendsOnly } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter
    .route("/")
    .get(verifyJWT, getUsersWhoAreFriendsOnly);

export { messageRouter }
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getMessages, getUsersWhoAreFriendsOnly, sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter
    .route("/")
    .get(verifyJWT, getUsersWhoAreFriendsOnly);

messageRouter
    .route("/:receiverID")
    .get(verifyJWT, getMessages);

messageRouter
    .route("/send/:receiverID")
    .post(verifyJWT, upload.single("mediaMessage"), sendMessage);

export { messageRouter }
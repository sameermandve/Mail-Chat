import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addAsFriend, getSearchedUser, removeAsFriend } from "../controllers/friend.controller.js";

const friendRouter = Router();

friendRouter
    .route("/")
    .get(verifyJWT, getSearchedUser);

friendRouter
    .route("/add/:receiverID")
    .post(verifyJWT, addAsFriend);

friendRouter
    .route("/remove/:receiverID")
    .post(verifyJWT, removeAsFriend);

export { friendRouter }
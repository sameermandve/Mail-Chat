import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addAsFriend, getSearchedUser } from "../controllers/friend.controller.js";

const friendRouter = Router();

friendRouter
    .route("/")
    .get(verifyJWT, getSearchedUser);

friendRouter
    .route("/add/:receiverID")
    .post(verifyJWT, addAsFriend);

export { friendRouter }
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    checkAuth,
    deleteUser,
    loginUser,
    logoutUser,
    registerUser,
    uploadAvatar
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter
    .route("/register")
    .post(upload.none(), registerUser);

userRouter
    .route("/login")
    .post(upload.none(), loginUser);

userRouter
    .route("/logout")
    .post(verifyJWT, logoutUser);

userRouter
    .route("/checkAuth")
    .get(verifyJWT, checkAuth);

userRouter
    .route("/upload-avatar")
    .put(verifyJWT, upload.single("avatar"), uploadAvatar);

userRouter
    .route("/delete")
    .delete(verifyJWT, deleteUser);

export { userRouter }
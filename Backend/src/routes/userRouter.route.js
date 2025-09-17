import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(upload.none(), registerUser);

userRouter.route("/login").post(upload.none(), loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser);

export { userRouter }
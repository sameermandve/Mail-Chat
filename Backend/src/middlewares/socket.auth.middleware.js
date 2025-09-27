import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const socketAuthMiddleware = asyncHandler(async (socket, next) => {

    try {

        // fetching cookie
        const cookieString = socket.handshake.headers.cookie || "";
        const cookies = cookie.parse(cookieString);
        const token = cookies.jwt;

        // verifying if token received
        if (!token) {
            console.log("Socket connection rejected - No token provided");
            throw new ApiError(401, "Unauthorized request - No token provided");
        }

        // verify obtained token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            console.log("Socket connection rejected - Invalid Token");
            throw new ApiError(401, "Unauthorized request - Invalid Token");
        }

        // find user from db
        const user = await User.findById(decodedToken.userID).select("-password");

        if (!user) {
            console.log("Socket connection rejected - User not found");
            throw new ApiError(404, "user not found");
        }

        // attach user to the socket
        socket.user = user;
        socket.userID = user._id.toString();

        console.log(`Socket connection authenticated for user: ${user.fullname} (${user._id})`);

        next();

    } catch (error) {
        console.log(`Error in socket authentication: ${error.message}`);
        throw new ApiError(401, "Unauthorized - Authentication failed");
    }

});
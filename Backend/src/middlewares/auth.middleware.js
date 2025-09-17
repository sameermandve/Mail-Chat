import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {

    try {

        const token = req.cookies?.jwt;

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized Request");
        }
        
        const user = await User.findById(decodedToken.userID).select("-password");

        if (!user) {
            throw new ApiError(401, "Unauthorized Request");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }

});

export { verifyJWT }
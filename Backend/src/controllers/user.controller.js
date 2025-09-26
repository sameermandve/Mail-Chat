import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { deleteOldFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
};

const registerUser = asyncHandler(async (req, res) => {

    const { fullname, username, email, password } = req.body;

    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if (!isEmailValid(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password length must be greater than 6");
    }

    const isUserExist = await User.findOne({
        $or: [
            {fullname : fullname},
            {username: username},
            {email: email},
        ]
    });

    if (isUserExist) {
        throw new ApiError(403, "User already exists");
    }

    const newUser = new User({
        fullname,
        username,
        email,
        password,
    });

    if (!newUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    {
                        _id: newUser._id,
                        fullname: newUser.fullname,
                        username: newUser.username,
                        email: newUser.email,
                    },
                    "User registered successfully"
                )
            );
    }

});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if (!isEmailValid(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    if (password.length < 6) {
        throw new ApiError(401, "Invalid credentials");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isValidPassword = await user.isPasswordValid(password);

    if (!isValidPassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    generateToken(user._id, res);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                },
                "User logged in successfully"
            )
        );

});

const logoutUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .cookie("jwt", "", { maxAge: 0 })
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully",
            )
        );
});

const checkAuth = asyncHandler(async (req, res) => {

    const user = req.user;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Fetched user successfully",
            )
        );

});

const uploadAvatar = asyncHandler(async (req, res) => {

    const avatarFilePath = req.file?.path;
    const oldFilePublicID = req.user?.avatar?.publicID;
    const user = req.user;

    if (!avatarFilePath) {
        throw new ApiError(400, "Avatar File not found");
    }

    const newAvatar = await uploadOnCloudinary(avatarFilePath);

    if (!newAvatar.url || !newAvatar.public_id) {
        throw new ApiError(500, "Error while uploading on cloudinary");
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                avatar: {
                    url: newAvatar.url,
                    publicID: newAvatar.public_id,
                }
            }
        },
        {
            new: true,
        }
    ).select("-password");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    if (oldFilePublicID) {
        deleteOldFromCloudinary(oldFilePublicID);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "Avatar uploaded successfully",
            )
        );

});

const deleteUser = asyncHandler(async (req, res) => {

    const userID = req.user?._id;
    const oldFilePublicID = req.user?.avatar?.publicID;

    if (!userID) {
        throw new ApiError(404, "User not found");
    }

    try {

        if (oldFilePublicID) {
            await deleteOldFromCloudinary(oldFilePublicID);
        }

    } catch (error) {
        console.error(`Cloudinary deletion failed: ${error}`);
        throw new ApiError(500, "Cloudinary deletion failed");
    }

    await Message.deleteMany(
        {
            $or: [{ senderID: userID }, { receiverID: userID }]
        },
    );

    const deleteExistingUser = await User.findByIdAndDelete(userID);

    if (!deleteExistingUser) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .clearCookie("jwt")
        .json(
            new ApiResponse(
                200,
                {},
                "User account deleted successfully",
            )
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    uploadAvatar,
    deleteUser,
}
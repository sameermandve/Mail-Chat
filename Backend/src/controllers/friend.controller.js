import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Friend } from "../models/friends.model.js";

const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
};

const getSearchedUser = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (email.trim() === "") {
        throw new ApiError(400, "Email required");
    }

    if (!isEmailValid(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    const searchedUser = await User.findOne({ email }).select("-password");

    if (!searchedUser) {
        throw new ApiError(404, "Searched user not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                searchedUser,
                "Searched user fetched successfully",
            )
        );

});

const addAsFriend = asyncHandler(async (req, res) => {

    const { receiverID } = req.params;
    const senderId = req.user?._id;

    if (!receiverID) {
        throw new ApiError(400, "Receiver is missing or not found");
    }

    if (senderId.toString() === receiverID) {
        throw new ApiError(400, "You cannot add yourself as a friend");
    }

    const existingFriendship = await Friend.findOne({
        $or:
            [
                { person: senderId, friend: receiverID },
                { person: receiverID, friend: senderId },
            ]
    });

    if (existingFriendship) {
        throw new ApiError(400, "User is already your friend");
    }

    const newFriendship = await Friend.create({
        friend: receiverID,
        person: senderId,
    });

    if (!newFriendship) {
        throw new ApiError(500, "Something went wrong while adding user as friend");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                newFriendship,
                "Searched User added as friend successfully",
            )
        );

});

export {
    getSearchedUser,
    addAsFriend,
}
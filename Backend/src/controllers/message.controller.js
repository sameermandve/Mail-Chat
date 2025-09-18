import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { deleteOldFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const getUsersWhoAreFriendsOnly = asyncHandler(async (req, res) => {

    const { username } = req.user;

    if (!username.trim()) {
        throw new ApiError(404, "User not found");
    }

    const currentUser = await User.findOne({ username: username.toLowerCase() });

    if (!username.trim()) {
        throw new ApiError(404, "User not found");
    }

    const friends = await User.aggregate([
        {
            $match: {
                _id: currentUser._id,
            }
        },
        {
            $lookup: {
                from: "friends",
                localField: "_id",
                foreignField: "person",
                as: "initiatedFriends",
            }
        },
        {
            $lookup: {
                from: "friends",
                localField: "_id",
                foreignField: "friend",
                as: "receivedFriends",
            }
        },
        {
            $project: {
                friendsIDs: {
                    $setUnion: [
                        "$initiatedFriends.friend",
                        "$receivedFriends.person",
                    ]
                }
            }
        },
        {
            $unwind: "$friendsIDs"
        },
        {
            $lookup: {
                from: "users",
                localField: "friendsIDs",
                foreignField: "_id",
                as: "friendProfile",
            }
        },
        {
            $unwind: "$friendProfile"
        },
        {
            $replaceRoot: {
                newRoot: "$friendProfile"
            }
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                email: 1,
                avatar: 1,
                _id: 1,
            }
        }
    ]);

    if (!friends || friends.length === 0) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    [],
                    "User has no friends"
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                friends,
                "User's friends fetched successfully"
            )
        );

});

export {
    getUsersWhoAreFriendsOnly,
}
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { deleteOldFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { getIO, getReceiverSocketIDHelper } from "../utils/socket.js";

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
    ]).sort({createdAt: 1});

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

const sendMessage = asyncHandler(async (req, res) => {

    const { textMessage = "" } = req.body;
    const media = req.file?.path;
    const { receiverID: messageReceiverID } = req.params;
    const messageSenderID = req.user?._id;

    const io = getIO();
    const getReceiverSocketID = getReceiverSocketIDHelper();


    if (!textMessage && !media) {
        throw new ApiError(400, "Cannot send an empty message");
    }

    let image_url = "";
    if (media) {
        const uploadRes = await uploadOnCloudinary(media);
        if (uploadRes && uploadRes.url) {
            image_url = uploadRes.url;
            console.log(image_url)
        } else {
            throw new ApiError(500, "Failed to upload image");
        }
    }

    const newMessage = await Message.create({
        senderID: messageSenderID,
        receiverID: messageReceiverID,
        textMessage,
        mediaMessage: image_url,
    });

    const receiverSocketID = getReceiverSocketID(messageReceiverID);

    if (receiverSocketID) {
        io.to(receiverSocketID).emit("newMessage", newMessage);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newMessage,
                "Message sent successfully",
            )
        );

});

const getMessages = asyncHandler(async (req, res) => {

    const { receiverID: messageReceiverID } = req.params;
    const messageSenderID = req.user?._id;

    if (!messageSenderID || !messageReceiverID) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    "User IDs are missing",
                )
            );
    };

    const conversation = await Message.find({
        $or: [
            { senderID: messageSenderID, receiverID: messageReceiverID },
            { senderID: messageReceiverID, receiverID: messageSenderID },
        ]
    }).sort({ createdAt: 1 });

    if (!conversation) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    [],
                    "No messages found"
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                conversation,
                "Messages fetched successfully",
            )
        );

});

export {
    getUsersWhoAreFriendsOnly,
    sendMessage,
    getMessages,
}
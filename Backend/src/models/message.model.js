import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        senderID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        receiverID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        textMessage: {
            type: String,
        },
        mediaMessage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);
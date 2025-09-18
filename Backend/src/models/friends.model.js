import mongoose, { Schema } from "mongoose";

const friendsSchema = new Schema(
    {
        friend: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        person: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

export const Friend = mongoose.model("Friend", friendsSchema);
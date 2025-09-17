import mongoose, { Schema } from mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            url: {
                type: String,
                default: "",
            },
            publicID: {
                type: String,
                default: "",
            }
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next;

    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordValid = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
};

export const User = mongoose.model("User", userSchema);
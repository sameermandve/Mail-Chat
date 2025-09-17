// Utility to store images outside of server for better performance
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// In this function, we are upoading file from server to cloudinary and then deleting the file from server

const uploadOnCloudinary = async (localFilePath) => {

    try {

        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        console.log(`Error occured while uploading on cloudinary: ${error}`);
        fs.unlinkSync(localFilePath);
        return null;
    }

};

// Here, we are destroying the old file from cloudinary which is of no use

const deleteOldFromCloudinary = async (oldFilePath) => {

    try {

        cloudinary.uploader.destroy(oldFilePath, (error, result) => {
            if (error) {
                console.error(`Error while deleting: ${error}`);
            } else {
                console.log(`Old file deleted successfully: ${result.result}`);
            }
        });

    } catch (error) {
        console.log(`Error occured while deleting form cloudinary: ${error}`);
    }

}

export {
    uploadOnCloudinary,
    deleteOldFromCloudinary
}
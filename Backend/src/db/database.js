import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);

        console.log(`Database connected! Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error(`Error connecting database: ${error}`);
        process.exit(1);
    }
}

export { connectDB }
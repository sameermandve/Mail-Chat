import { Server } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

let ioInstance = null;
let getReceiverSocketID = null;

const setupSocket = (app) => {
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        }
    });

    ioInstance = io;

    // socket auth middleware
    io.use(socketAuthMiddleware);

    getReceiverSocketID = (userID) => {
        return userSocketMap[userID];
    }

    // for online users
    const userSocketMap = {}; // {userID: socketID}

    io.on("connection", (socket) => {
        console.log(`A user connected: ${socket.user.fullname}`);

        const userID = socket.userID;

        userSocketMap[userID] = socket.id;

        // it sends events to all connected devices
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // socket.on() is used to listen to events from clients
        socket.on("disconnect", () => {
            console.log(`A user disconnected: ${socket.user.fullname}`);

            delete userSocketMap[userID];

            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return { io, server };

}

let getReceiverSocketIDHelper = () => getReceiverSocketID;
const getIO = () => ioInstance;

export { setupSocket, getReceiverSocketIDHelper, getIO }
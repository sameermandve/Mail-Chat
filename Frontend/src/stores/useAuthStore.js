import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create(
    (set, get) => ({

        authUser: null,
        isLoggingIn: false,
        isSigningUp: false,
        isUpdatingProfile: false,
        isDeletingUser: false,
        isCheckingAuth: true,
        socket: null,
        onlineUsers: [],

        checkAuth: async () => {
            try {

                const res = await axiosInstance.get("/users/checkAuth");
                if (res.data.success) {
                    set({ authUser: res.data });
                    get().connectSocket();
                } else {
                    set({ authUser: null });
                }

            } catch (error) {
                console.error(`Error in checkAuth: ${error}`);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        registerUser: async (data) => {
            set({ isSigningUp: true });

            try {

                const res = await axiosInstance.post("/users/register", data);
                if (res.data.success) {
                    set({ authUser: res.data });
                    toast.success("User registered successfully");
                    get().connectSocket();
                }

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                set({ isSigningUp: false });
            }
        },

        loginUser: async (data) => {
            set({ isLoggingIn: true });

            try {

                const res = await axiosInstance.post("/users/login", data);
                if (res.data.success) {
                    set({ authUser: res.data });
                    toast.success("Login successful");
                    get().connectSocket();
                }

            } catch (error) {
                console.error(`Error while login: ${error}`);
                toast.error(error.response.data.message);
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {

                const res = await axiosInstance.post("/users/logout");
                set({ authUser: null });
                toast.success("Logout successful");
                get().disconnectSocket();

            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        uploadAvatar: async (data) => {
            set({ isUpdatingProfile: true });

            try {

                const res = await axiosInstance.put("/users/upload-avatar", data);
                if (res.data.success) {
                    set({ authUser: res.data });
                    toast.success("Avatar upload successful");
                }

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isUpdatingProfile: false });
            }
        },

        deleteAccount: async () => {
            set({ isDeletingUser: true });

            try {

                const res = await axiosInstance.delete("/users/delete");
                set({ authUser: null });
                toast.success("Account deleted successfully");
                get().disconnectSocket();

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isDeletingUser: false });
            }
        },

        connectSocket: () => {
            const { authUser } = get();

            if (!authUser || get().socket?.connected) return;

            const socket = io(BASE_URL, {
                withCredentials: true,
            });

            socket.connect();

            set({ socket: socket });

            socket.on("getOnlineUsers", (userIDs) => {
                set({ onlineUsers: userIDs });
            })
        },

        disconnectSocket: () => {
            if (get().socket?.connected) get().socket.disconnect();
        },

    })
);

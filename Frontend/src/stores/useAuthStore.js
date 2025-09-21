import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create(
    (set) => ({

        authUser: null,
        isLoggingIn: false,
        isSigningUp: false,
        isUpdatingProfile: false,
        isDeletingUser: false,
        isCheckingAuth: true,

        checkAuth: async () => {
            try {

                const res = await axiosInstance.get("/users/checkAuth");
                const user = res.data;
                set({ authUser: user });

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
                set({ authUser: res.data });
                toast.success("User registered successfully");

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
                set({ authUser: res.data });
                toast.success("Login successful");

            } catch (error) {
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

            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        uploadAvatar: async () => {
            set({ isUpdatingProfile: true });

            try { 

                const res = await axiosInstance.put("/users/upload-avatar");
                set({ authUser: res.data });
                toast.success("Avatar upload successful");

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

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isDeletingUser: false });
            }
        }, 

    })
);
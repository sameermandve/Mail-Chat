import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

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
        }

    })
);
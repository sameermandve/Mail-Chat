import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";

export const useSearchStore = create(
    (set) => ({
        searchedUser: null,
        isSearchingUser: false,

        searchUser: async (data) => {
            set({ isSearchingUser: true });

            try {

                const res = await axiosInstance.post("/search-friend/", data);
                set({ searchedUser: res.data });

            } catch (error) {
                set({ searchedUser: null });
                toast.error(error.response.data.message);
            } finally {
                set({ isSearchingUser: false });
            }
        },

        clearSearch: () => {
            set({ searchedUser: null, isSearchingUser: false });
        }
    })
);
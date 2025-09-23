import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";
import { useMessageStore } from "./useMessageStore.js";
import { isRouteErrorResponse } from "react-router-dom";

export const useSearchStore = create(
    (set) => ({
        searchedUser: null,
        isSearchingUser: false,
        isAddingUserAsFriend: false,
        isRemovingUserAsFriend: false,

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

        addUserAsFriend: async (id) => {
            set({ isAddingUserAsFriend: true });

            try {

                const res = await axiosInstance.post(`/search-friend/add/${id}`);
                if (res.data.success) {
                    toast.success("User added as friend successfully");
                    useMessageStore.getState().fetchFriends();
                }

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isAddingUserAsFriend: false });
            }
        },

        removeUserAsFriend: async (id) => {
            set({ isRemovingUserAsFriend: true });

            try {

                const res = await axiosInstance.post(`/search-friend/remove/${id}`);
                if (res.data.success) {
                    toast.success("User removed as friend successfully");
                    useMessageStore.getState().fetchFriends();
                }

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isRemovingUserAsFriend: false });
            }
        },

        clearSearch: () => {
            set({ searchedUser: null, isSearchingUser: false });
        },
    })
);
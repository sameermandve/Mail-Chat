import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";

export const useMessageStore = create(
    (set) => ({
        friendsList: [],
        fetchingFriendsList: false,

        fetchFriends: async () => {
            set({ fetchingFriendsList: true });

            try {

                const res = await axiosInstance.get("/messages/");
                set({ friendsList: res.data });

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
                set({ fetchingFriendsList: false });
            }
        }
    })
);
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";

export const useMessageStore = create(
    (set, get) => ({
        friendsList: [],
        messages: [],
        selectedUserToChat: null,
        fetchingFriendsList: false,
        fetchingMessages: false,

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
        },

        fetchMessages: async (userID) => {
            set({ fetchingMessages: true });

            try {

                const res = await axiosInstance.get(`/messages/${userID}`);
                set({ messages: res.data.data });

            } catch (error) {
                toast.error(error.response.messages);
            } finally {
                set({ fetchingMessages: false });
            }
        },

        sendMessage: async (data) => {
            set({ sendingMessage: true });
            const { selectedUserToChat, messages } = get();

            try {

                const res = await axiosInstance.post(`/messages/send/${selectedUserToChat._id}`, data);
                set({ messages: [...messages, res.data.data] });

            } catch (error) {
                console.log(error);
                toast.error(error.response?.data.message);
            } finally {
                set({ sendingMessage: false });
            }
        },

        setSelectedUserToChat: (selectedUserToChat) => set({selectedUserToChat}),
    })
);
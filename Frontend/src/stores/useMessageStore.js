import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

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
                set({ friendsList: res.data.data });

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

        subscribeToMessages: () => {

            const { selectedUserToChat } = get();

            if (!selectedUserToChat) return;

            const socket = useAuthStore.getState().socket;

            socket.on("newMessage", (newMessage) => {
                const currentMessages = get().messages;
                set({ messages: [...currentMessages, newMessage] });
            });

        },

        unsubscribeFromMessages: () => {
            const socket = useAuthStore.getState().socket;
            socket.off("newMessage");
        },

        setSelectedUserToChat: (selectedUserToChat) => set({selectedUserToChat}),
    })
);
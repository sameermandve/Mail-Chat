import { X } from "lucide-react";
import { useMessageStore } from "../stores/useMessageStore";
import { useAuthStore } from "../stores/useAuthStore";

function ChatHeader() {

    const { selectedUserToChat, setSelectedUserToChat } = useMessageStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className='p-2 pl-4 pb-4 h-16.6 border-b border-base-300'>
            <div className="flex items-center justify-between">
                {/* User img and name */}
                <div className="flex items-center gap-4">
                    <img
                        src={selectedUserToChat.avatar.url}
                        alt="avatar"
                        className="size-12 object-cover rounded-full ring-1 ring-base-content"
                    />

                    <div className="flex flex-col items-start">
                        <h1 className="font-semibold text-lg">{selectedUserToChat.fullname}</h1>
                        <p
                            className={`text-xs font-medium mt-1 tracking-wider ${onlineUsers.includes(selectedUserToChat._id) ? "" : "text-base-content/60"}`}
                        >
                            {onlineUsers.includes(selectedUserToChat._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                {/* User img and name end */}

                <button
                    className="cursor-pointer hover:scale-110"
                    onClick={() => setSelectedUserToChat(null)}
                >
                    <X className="size-6 text-base-content/80 hover:text-base-content" />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader
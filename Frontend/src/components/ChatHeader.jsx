import { X } from "lucide-react";
import { useMessageStore } from "../stores/useMessageStore";

function ChatHeader() {

    const { selectedUserToChat, setSelectedUserToChat } = useMessageStore();

    return (
        <div className='p-2 h-16.3 border-b border-base-300'>
            <div className="flex items-center justify-between">
                {/* User img and name */}
                <div className="flex items-center gap-4">
                    <img
                        src={selectedUserToChat.avatar.url}
                        alt="avatar"
                        className="size-12 object-cover rounded-full ring-1 ring-base-content"
                    />

                    <div className="flex items-center">
                        <h1 className="font-semibold">{ selectedUserToChat.fullname }</h1>
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
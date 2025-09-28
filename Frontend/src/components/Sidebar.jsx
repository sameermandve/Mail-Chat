import { useMessageStore } from "../stores/useMessageStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import SidebarNoUser from "./SidebarNoUser";
import { useAuthStore } from "../stores/useAuthStore";
import { Users } from "lucide-react";

function Sidebar() {

    const { friendsList, fetchFriends, fetchingFriendsList, selectedUserToChat, setSelectedUserToChat } = useMessageStore();
    const { onlineUsers } = useAuthStore();

    const [showOnline, setShowOnline] = useState(false);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    // const list = [...friendsList];
    const list = showOnline ? friendsList.filter((user) => onlineUsers.includes(user._id)) : friendsList;

    if (fetchingFriendsList) {
        return <SidebarSkeleton />;
    }

    if (list?.length === 0) {
        return <SidebarNoUser />;
    }

    return (
        <aside className='h-full w-20 lg:w-72 flex flex-col border-r-2 border-base-300 transition-all duration-200'>
            {/* Sidebar header */}
            <div className='w-full py-3 px-5 border-b border-base-300 space-y-3'>
                <div className='flex items-center gap-3'>
                    <Users className="size-6" />
                    <p className="font-medium hidden lg:block">Contacts</p>
                </div>

                <div className='hidden lg:flex items-center gap-3'>
                    <input
                        type="checkbox"
                        checked={showOnline}
                        onChange={() => setShowOnline(!showOnline)}
                        className='checkbox checkbox-xs checkbox-success'
                    />
                    <p className='font-medium text-base-content/80'>Show online users</p>
                </div>
            </div>
            {/* Sidebar header end */}

            {/* List of Friends */}
            <div
                className="overflow-y-auto w-full py-3"
            >
                {list && list.map((friend) => {
                    return (
                        <button
                            key={friend._id}
                            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors duration-200 ${selectedUserToChat?._id === friend._id ? "bg-base-300" : ""}`}
                            onClick={() => setSelectedUserToChat(friend)}
                        >
                            <div className={`avatar ${onlineUsers.includes(friend._id) ? "avatar-online" : ""}`}>
                                <div className="size-12 rounded-full mx-auto lg:mx-0">
                                    <img
                                        src={friend.avatar.url}
                                        alt={friend.fullname}
                                    />
                                </div>
                            </div>

                            <div className="hidden lg:flex flex-col items-start">
                                <p className="font-semibold ml-2">{friend.fullname}</p>
                                <p
                                    className={`font-medium mt-1 ml-2 text-xs tracking-wider ${onlineUsers.includes(friend._id) ? "" : "text-base-content/60"}`}
                                >
                                    {onlineUsers.includes(friend._id) ? "Online" : "Offline"}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
            {/* List of Friends end */}
        </aside>
    );
}

export { Sidebar }

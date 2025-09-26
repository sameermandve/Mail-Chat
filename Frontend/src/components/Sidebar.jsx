import { useMessageStore } from "../stores/useMessageStore";
import { useEffect } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import SidebarNoUser from "./SidebarNoUser";
import SidebarHead from "./SidebarHead";

function Sidebar() {

    const { friendsList, fetchFriends, fetchingFriendsList, selectedUserToChat, setSelectedUserToChat } = useMessageStore();

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    const list = [...friendsList];

    if (fetchingFriendsList) {
        return <SidebarSkeleton />;
    }

    if (list?.length === 0) {
        return <SidebarNoUser />;
    }

    return (
        <aside className='h-full w-20 lg:w-72 flex flex-col border-r-2 border-base-300 transition-all duration-200'>
            {/* Sidebar header */}
            <SidebarHead />
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
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={friend.avatar.url}
                                    alt="img"
                                    className="size-12 rounded-full object-cover"
                                />
                            </div>

                            <div className="hidden lg:block">
                                <p className="font-semibold ml-4">{friend.fullname}</p>
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

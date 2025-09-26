import { useMessageStore } from "../stores/useMessageStore";
import ChatSelected from "../components/ChatSelected";
import NoChatSelected from "../components/NoChatSelected";
import { Sidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {

    const { selectedUserToChat, setSelectedUserToChat } = useMessageStore();
    const location = useLocation();

    useEffect(() => {
        setSelectedUserToChat(null);
    }, [location]);

    return (
        <div className="h-screen">
            <div className="flex flex-col items-center justify-center pb-6 px-6 pt-20 sm:pb-12">
                <div className="bg-base-100 container mx-auto max-w-6xl rounded-lg h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />

                        {!selectedUserToChat ? <NoChatSelected /> : <ChatSelected />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage }
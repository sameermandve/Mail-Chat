
function ChatSkeleton() {

    const conversationSkeleton = Array(6).fill(null);

    return (
        <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
            {conversationSkeleton.map((_, idx) => {
                return (
                    <div
                        className={`chat ${idx % 2 == 0 ? "chat-end" : "chat-start"}`}
                        key={idx}
                    >
                        {/* image */}
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full'>
                                <div className="skeleton w-full h-full rounded-full"></div>
                            </div>
                        </div>

                        {/* time */}
                        <div className="chat-footer mt-1">
                            <div className="skeleton h-4 w-16"></div>
                        </div>

                        {/* message */}
                        <div className='chat-bubble bg-transparent p-0'>
                            <div className="skeleton h-16 w-[200px]"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatSkeleton
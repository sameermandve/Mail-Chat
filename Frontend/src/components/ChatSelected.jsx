import { useEffect } from 'react';
import { useMessageStore } from '../stores/useMessageStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../stores/useAuthStore';
import ChatSkeleton from './skeletons/ChatSkeleton';
import { extractTime } from '../utils/extractTime.js';

function ChatSelected() {

    const { fetchMessages, fetchingMessages, messages, selectedUserToChat } = useMessageStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        fetchMessages(selectedUserToChat._id);
    }, [selectedUserToChat._id, fetchMessages]);

    let conversation = [...messages];

    if (fetchingMessages) {
        return (
            <div className='flex flex-col flex-1 overflow-auto'>
                <ChatHeader />
                <ChatSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className='flex flex-col flex-1 overflow-auto'>
            <ChatHeader />

            {/* Chat container */}
            <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
                {conversation && conversation.map((message) => {
                    return (
                        <div
                            className={`chat ${message.senderID === authUser.data._id ? "chat-end" : "chat-start"}`}
                            key={message._id}
                        >
                            <div className='chat-image avatar'>
                                <div className='size-8 rounded-full'>
                                    <img
                                        src={message.senderID === authUser.data._id ? authUser.data.avatar.url : selectedUserToChat.avatar?.url}
                                    />
                                </div>
                            </div>
                            <div className='chat-bubble flex flex-col'>
                                {message.mediaMessage &&
                                    <img
                                        src={message.mediaMessage}
                                        alt="Attachment"
                                        className='max-w-[90px] sm:max-w-[130px] rounded-md mb-2'
                                    />
                                }
                                {message.textMessage && <p>{message.textMessage}</p>}
                            </div>

                            <div className='chat-footer mt-1'>
                                <p className='text-base-content/60 font-medium'>{extractTime(message.createdAt)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Chat container end */}

            <MessageInput />
        </div>
    );
}

export default ChatSelected

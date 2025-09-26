import { Image, Send, SendHorizontal, X } from 'lucide-react';
import { useRef, useState } from 'react'
import { useMessageStore } from '../stores/useMessageStore';
import toast from 'react-hot-toast';

function MessageInput() {

    const [text, setText] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useMessageStore();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            toast.error("Select an image file");
            return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        }
        reader.readAsDataURL(file);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !previewImage) return;

        try {
            let formData;

            if (imageFile) {
                formData = new FormData();
                formData.append("textMessage", text);
                formData.append("mediaMessage", imageFile);
            } else {
                formData = { textMessage: text };
            }

            await sendMessage(formData);
    
            setText("");
            setPreviewImage(null);
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Failed to send text");
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className='p-2 w-full'>
            {previewImage && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img
                            src={previewImage}
                            alt="preview"
                            className='size-20 object-cover rounded-lg'
                        />
                        <button
                            onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer'
                        >
                            <X className='size-3' />
                        </button>
                    </div>
                </div>
            )}
            
            <form
                onSubmit={handleSendMessage}
                className='flex items-center gap-2'
            >
                <div className='flex flex-1 gap-2'>
                    <input
                        type="text"
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    {/* File share btn */}
                    <button
                        type='button'
                        className={`hidden sm:flex btn btn-circle`}
                        onClick={() => fileInputRef?.current?.click()}
                    >
                        <Image className="size-5" />
                    </button>
                    {/* File share btn end */}
                </div>
                {/* Send btn */}
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !imageFile}
                >
                    <Send className='size-5' />
                </button>
                {/* Send btn end */}
            </form>
        </div>
    );
}

export default MessageInput
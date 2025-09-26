import { MessageCircleMore } from 'lucide-react';

function NoChatSelected() {
    return (
        <div className='w-full flex flex-col flex-1 items-center justify-center p-14 bg-base-100/50'>
            <div className='max-w-md text-center space-y-8'>
                {/* Icon */}
                <div className='flex justify-center gap-4 mb-4'>
                    <div className='relative'>
                        <div className='size-16 flex items-center justify-center bg-primary/10 rounded-lg animate-bounce'>
                            <MessageCircleMore className='size-8 text-primary' />
                        </div>
                    </div>
                </div>
                {/* Icon end */}

                <div className='flex flex-col text-center space-y-2'>
                    <h1 className='text-xl font-bold tracking-wide'>Welcome to MailChat</h1>
                    <p className='font-medium tracking-tighter text-base-content/60'>Every great chat starts with a single message. Let the conversations begin!</p>
                </div>
            </div>
        </div>
    );
}

export default NoChatSelected
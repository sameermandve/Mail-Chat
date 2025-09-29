import { Search, Users, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useContactsToggle } from '../stores/useContactsToggle';

function SidebarNoUser() {

    const { isSidebarOpen, setSidebarClose } = useContactsToggle();

    return (
        <>
            {/* Sidebar header */}
            <div className='w-full pt-10 pb-3 lg:py-3 px-5 border-b border-base-300 space-y-3'>
                <div className='flex items-center justify-between gap-3'>
                    <div className="flex items-center gap-3">
                        <Users className="size-6" />
                        <p className="font-medium block">Contacts</p>
                    </div>
                    <div className="lg:hidden">
                        <X
                            className="size-5 cursor-pointer"
                            onClick={setSidebarClose}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <input
                        type="checkbox"
                        className='checkbox checkbox-xs checkbox-success'
                    />
                    <p className='font-medium text-base-content/80'>Show online users</p>
                </div>
            </div>
            {/* Sidebar header end */}

            <div className='w-full h-full flex items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-lg font-bold'>No contacts yet</h1>
                    <p className='tracking-tight text-base-content/60'>Search for friends to start chatting!</p>
                    <Link
                        to="/search"
                        className='btn btn-sm flex items-center gap-2 transition-colors mt-2'
                    >
                        <Search className='size-4' />
                        <span>Search</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SidebarNoUser
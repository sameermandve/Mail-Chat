import { Search } from 'lucide-react';
import { Link } from "react-router-dom";
import SidebarHead from './SidebarHead';

function SidebarNoUser() {
    return (
        <aside className='h-full w-20 lg:w-72 flex flex-col border-r-2 border-base-300 transition-all duration-200'>
            {/* Sidebar header */}
            <SidebarHead />
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
        </aside>
    );
}

export default SidebarNoUser
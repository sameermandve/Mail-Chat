import { Users } from 'lucide-react';

function SidebarHead() {
    return (
        <div className='w-full p-5 border-b border-base-300'>
            <div className='flex items-center gap-3'>
                <Users className="size-6" />
                <p className="font-medium hidden lg:block">Contacts</p>
            </div>
        </div>
    );
}

export default SidebarHead
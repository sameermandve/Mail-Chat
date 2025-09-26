import { Users } from 'lucide-react';

function SidebarSkeleton() {

    const skeletons = Array(6).fill(null);

    return (
        <aside className='h-full w-20 lg:w-72 flex flex-col border-r-2 border-base-300 transition-all duration-200 animate-pulse'>
            <div className='w-full p-5 border-b border-base-300'>
                <div className='flex items-center gap-3'>
                    <Users className="size-6" />
                    <p className="font-medium hidden lg:block">Contacts</p>
                </div>
            </div>
            <div
                className="overflow-y-auto w-full py-3"
            >
                {skeletons.map((_, idx) => {
                    return (
                        <div
                            key={idx}
                            className={`w-full p-3 flex items-center gap-3`}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <div className='size-12 rounded-full bg-gray-300'></div>
                            </div>

                            <div className="hidden lg:block text-left min-w-0 flex-1">
                                <div className="ml-4 h-4 w-1/2 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </aside>
    );
}

export default SidebarSkeleton
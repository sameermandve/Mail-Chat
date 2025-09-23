import DangerZoneSkeleton from './DangerZoneSkeleton';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';

function ProfilePageSkeleton() {
    return (
        <div className='h-screen animate-pulse'>
            <div className="max-w-2xl mx-auto px-6 pb-6 pt-23 sm:pb-12">
                <div className="border-2 border-gray-300 rounded-xl space-y-8 p-4">
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-1/4 bg-gray-300 rounded"></div>
                        <div className="mt-3 h-5 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className='size-32 rounded-full bg-gray-300'></div>
                        <div className="h-2 w-1/2 bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col gap-7">
                        <ProfileInfoSkeleton />
                        <ProfileInfoSkeleton />
                        <ProfileInfoSkeleton />
                        <ProfileInfoSkeleton />
                    </div>
                    <DangerZoneSkeleton />
                </div>
            </div>
        </div>
    );
}

export default ProfilePageSkeleton
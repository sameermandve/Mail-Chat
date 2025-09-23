import React from 'react'

function ProfileInfoSkeleton() {
    return (
        <div className="flex flex-col justify-start border-2 border-gray-300 p-4 rounded-xl">
            <div className="flex items-center gap-3">
                <div className="h-4 w-1/4 rounded bg-gray-300"></div>
            </div>
            <div className="h-6 w-1/2 rounded bg-gray-300 mt-2"></div>
        </div>
    );
}

export default ProfileInfoSkeleton
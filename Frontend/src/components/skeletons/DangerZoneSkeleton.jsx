
function DangerZoneSkeleton() {
    return (
        <div className="flex flex-col space-y-5 border-2 border-gray-300 rounded-xl p-4">
            <div className="flex flex-col items-center">
                <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 mt-2 rounded"></div>
            </div>
            <div className="h-8 w-full bg-gray-300 rounded-lg"></div>
        </div>
    );
}

export default DangerZoneSkeleton
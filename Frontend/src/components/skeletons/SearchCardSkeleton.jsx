function SearchCardSkeleton() {
    return (
        <div className="w-full p-4 border-2 rounded-xl animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Pulsing circle for the avatar */}
                    <div className="rounded-full bg-base-content/20 size-10 sm:size-15"></div>
                    <div className="flex flex-col gap-2">
                        {/* Pulsing bars for username and email */}
                        <div className="h-4 rounded bg-base-content/20 w-32"></div>
                        <div className="h-3 rounded bg-base-content/20 w-40"></div>
                    </div>
                </div>
                {/* Pulsing bar for the button */}
                <div className="h-8 rounded-lg bg-base-content/20 w-24"></div>
            </div>
        </div>
    );
}

export default SearchCardSkeleton;

function SearchCard({ id, img, fullname, email, isFriend, handleRequest, isLoading }) {

    return (
        <div className='w-full p-4 border-2 rounded-xl'>
            <div className='flex items-center justify-between'>
                {/* Username and Photo */}
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-full size-10 sm:size-15'>
                            <img
                                src={img}
                                alt="Avatar"
                                className='size-10 sm:size-15 rounded-full object-cover border-2'
                            />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <h1 className='sm:text-lg font-medium'>{fullname}</h1>
                            <p className='text-sm sm:text-base font-medium'>{email}</p>
                        </div>
                    </div>
                </div>
                {/* Username and Photo end */}

                {/* Btn */}
                <div className=''>
                    <button
                        onClick={() => handleRequest(id)}
                        className={`btn btn-xs sm:btn-sm ${!isFriend ? "btn-success" : "btn-error"} ${isLoading ? "animate-pulse" : ""}`}
                        disabled={isLoading}
                    >
                        <span className='text-xs sm:text-base'>
                            {!isFriend ? "Add friend" : "Remove friend"}
                        </span>
                    </button>
                </div>
                {/* Btn end */}
            </div>
        </div>
    );
}

export default SearchCard
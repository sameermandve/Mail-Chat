import { useEffect } from "react";
import { useMessageStore } from "../stores/useMessageStore";

function SearchCard(props) {

    return (
        <div className='w-full p-4 border-2 rounded-xl'>
            <div className='flex items-center justify-between'>
                {/* Username and Photo */}
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-full size-10 sm:size-15'>
                            <img
                                src={props.img}
                                alt="Avatar"
                                className='size-10 sm:size-15 rounded-full object-cover border-2'
                            />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <h1 className='sm:text-lg font-medium'>{props.username}</h1>
                            <p className='text-sm sm:text-base font-medium'>{props.email}</p>
                        </div>
                    </div>
                </div>
                {/* Username and Photo end */}

                {/* Btn */}
                <div className=''>
                    <button
                        className={`btn btn-xs sm:btn-sm ${!props.isFriend ? "btn-success" : "btn-error"}`}
                    >
                        <span className='text-xs sm:text-base'>
                            {!props.isFriend ? "Add friend" : "Remove friend"}
                        </span>
                    </button>
                </div>
                {/* Btn end */}
            </div>
        </div>
    );
}

export default SearchCard
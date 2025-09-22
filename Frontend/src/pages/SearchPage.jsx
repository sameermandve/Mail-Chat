import { Loader, Search, UserRoundSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchStore } from '../stores/useSearchStore.js';
import toast from 'react-hot-toast';
import SearchCard from '../components/SearchCard.jsx';
import { useLocation } from 'react-router-dom';
import SearchCardSkeleton from '../components/skeletons/SearchCardSkeleton.jsx';
import { useMessageStore } from '../stores/useMessageStore.js';

function SearchPage() {

    const [email, setEmail] = useState("");
    const { searchedUser, isSearchingUser, searchUser, clearSearch } = useSearchStore();
    const { fetchFriends, friendsList } = useMessageStore();

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    const location = useLocation();

    useEffect(() => {
        clearSearch();
    }, [location, clearSearch]);

    const validateInput = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.trim()) {
            toast.error("Email required to search user");
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateInput();

        if (success === true) searchUser({ email });
    }

    const isSearchedUserAFriend = friendsList?.data?.some(user => user._id === searchedUser?.data?._id);

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center pb-6 px-6 pt-23 sm:pt-30 sm:pb-12'>
                <div className='container mx-auto md:max-w-lg space-y-10'>
                    {/* Search bar */}
                    <form
                        onSubmit={handleSubmit}
                        className='py-2'
                    >
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none'>
                                <UserRoundSearch className='size-5 text-base-content/80' />
                            </div>
                            <input
                                type="text"
                                placeholder='Search for friend via email'
                                className={`input input-bordered border-2 w-full pl-14 font-medium text-lg focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='absolute inset-y-0 right-0 pr-3 z-10 flex items-center cursor-pointer hover:scale-110'
                            >
                                <Search className='size-7 text-primary/80 hover:text-primary' />
                            </button>
                        </div>
                    </form>
                    {/* Search bar end */}

                    {/* Searched User */}
                    {isSearchingUser ?
                        (
                            <SearchCardSkeleton />
                        ) :
                        searchedUser ?
                            (
                                <SearchCard
                                    img={searchedUser.data.avatar.url}
                                    username={searchedUser.data.username}
                                    email={searchedUser.data.email}
                                    isFriend={isSearchedUserAFriend}
                                />
                            ) : (
                                <div className='w-full h-auto'>
                                    <div className='flex items-center justify-center'>
                                        <div className='flex flex-col items-center gap-2 mt-10'>
                                            <h1 className='text-3xl font-bold tracking-wider'>Search for Users</h1>
                                            <p className='text-xl font-semibold tracking-wide'>No user searched</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    {/* Searched User end */}
                </div>
            </div>
        </div>
    );
}

export { SearchPage } 
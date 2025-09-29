import { Link, useLocation } from "react-router-dom";
import { LogOut, MessageCircleMore, Search, User, Users } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useContactsToggle } from "../stores/useContactsToggle.js";

function Navbar() {
    const { authUser, logout } = useAuthStore();
    const { setSidebarOpen } = useContactsToggle();

    const location = useLocation();

    const disableBtn = location.pathname !== "/";

    return (
        <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg font-[Open_Sans]'>
            <div className='container mx-auto px-6 h-16'>
                <div className='flex items-center justify-between h-full'>
                    {/* Left Side */}
                    <div className='flex items-center gap-8'>
                        <Link
                            to="/"
                            className="flex items-center hover:opacity-80 transition-all gap-2.5"
                        >
                            <div className="flex items-center justify-center">
                                <MessageCircleMore className="size-6 text-primary" />
                            </div>
                            <h1 className="text-xl font-bold tracking-wider">
                                <span className="font-medium">Mail</span>Chat
                            </h1>
                        </Link>
                    </div>
                    {/* Left Side end */}

                    {/* Right Side */}
                    <div className='flex items-center gap-3'>
                        {/* <div className="absolute md:hidden"></div> */}
                        <div> {/*className="hidden md:block"*/}
                            {authUser && (
                                <div className="flex gap-3">
                                    <button
                                        className="lg:hidden btn btn-sm gap-2 transition-colors"
                                        onClick={setSidebarOpen}
                                        disabled={disableBtn}
                                    >
                                        <Users className="size-4" />
                                        <span className="hidden sm:inline">Contacts</span>
                                    </button>

                                    <Link
                                        to={"/search"}
                                        className={`btn btn-sm gap-2 transition-colors`}
                                    >
                                        <Search className="size-4" />
                                        <span className="hidden sm:inline">Search</span>
                                    </Link>

                                    <Link
                                        to={"/profile"}
                                        className={`btn btn-sm gap-2 transition-colors`}
                                    >
                                        <User className="size-4" />
                                        <span className="hidden sm:inline">Profile</span>
                                    </Link>

                                    <button
                                        className="flex gap-2 items-center cursor-pointer"
                                        onClick={logout}
                                    >
                                        <LogOut className="size-4" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Right Side end */}
                </div>
            </div>
        </header>
    );
}

export { Navbar }
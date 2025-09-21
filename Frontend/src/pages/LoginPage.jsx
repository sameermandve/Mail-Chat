import { AtSign, Eye, EyeOff, Loader, Lock, Mail, MessageCircleMore, User } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import toast from 'react-hot-toast';

function LoginPage() {

    const [showPass, setShowPass] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { loginUser, isLoggingIn } = useAuthStore();

    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!loginData.email.trim()) return toast.error("Email cannot be empty");
        if (!emailRegex.test(loginData.email)) return toast.error("Invalid Email format");
        if (!loginData.password.trim()) return toast.error("Password cannot be empty");
        if (loginData.password.length < 6) return toast.error("Password must be atleast 6 characters");

        return true;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) loginUser(loginData);
    };

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center justify-center pb-6 px-6 pt-25 sm:pb-12'>
                <div className='w-full sm:max-w-md space-y-4 border-2 rounded-xl p-6 border-base-content/40'>
                    {/* Login head */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center justify-center gap-2 group'>
                            <div className='size-12 flex flex-col items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-xl'>
                                <MessageCircleMore className='size-10 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Login to MailChat</h1>
                            <p className='tracking-wider text-base-content/60'>Welcome back! Enter your details below</p>
                        </div>
                    </div>
                    {/* Login head end */}

                    {/* Login Form */}
                    <form
                        onSubmit={handleLoginSubmit}
                        className='space-y-8'
                        noValidate
                    >
                        {/* Email */}
                        <div className='flex flex-col gap-2'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered pl-12 w-full font-medium focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200`}
                                    placeholder='Email'
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Email end */}

                        {/* Password */}
                        <div className='flex flex-col gap-2'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className={`input input-bordered pl-12 w-full font-medium focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200`}
                                    placeholder='Password'
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer'
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {
                                        showPass ?
                                            (
                                                <EyeOff className='size-5 text-base-content/40' />
                                            ) :
                                            (
                                                <Eye className='size-5 text-base-content/40' />
                                            )
                                    }
                                </button>
                            </div>
                        </div>
                        {/* Password end */}

                        {/* Submit btn */}
                        <button
                            type='submit'
                            className='btn btn-primary w-full'
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ?
                                (
                                    <>
                                        <span>Loading</span>
                                        <Loader className='size-5 animate-spin' />
                                    </>
                                ) :
                                (
                                    "Login"
                                )
                            }
                        </button>
                        {/* Submit btn end */}
                    </form>
                    {/* Login Form end */}

                    {/* Login bottom */}
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className='link link-primary'
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                    {/* Login bottom end */}
                </div>
            </div>
        </div>
    );
}

export { LoginPage }
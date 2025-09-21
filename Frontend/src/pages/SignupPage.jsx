import { AtSign, Eye, EyeOff, Loader, Lock, Mail, MessageCircleMore, User } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import toast from 'react-hot-toast';

function SignupPage() {

    const [showPass, setShowPass] = useState(false);
    const [signupData, setSignupData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    const { registerUser, isSigningUp } = useAuthStore();

    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!signupData.fullname.trim()) return toast.error("Name cannot be empty");
        if (!signupData.username.trim()) return toast.error("Username cannot be empty");
        if (!signupData.email.trim()) return toast.error("Email cannot be empty");
        if (!emailRegex.test(signupData.email)) return toast.error("Invalid Email format");
        if (!signupData.password.trim()) return toast.error("Password cannot be empty");
        if (signupData.password.length < 6) return toast.error("Password must be atleast 6 characters");

        return true;
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) registerUser(signupData);
    };

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center justify-center pb-6 px-6 pt-22 sm:pb-12'>
                <div className='w-full sm:max-w-md space-y-4 border-2 rounded-xl p-6 pt-4 border-base-content/40'>
                    {/* Signup head */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center justify-center gap-2 group'>
                            <div className='size-12 flex flex-col items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-xl'>
                                <MessageCircleMore className='size-10 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create an account</h1>
                            <p className='tracking-wider text-base-content/60'>Ready to chat? Let's get you started</p>
                        </div>
                    </div>
                    {/* Signup head end */}

                    {/* Signup Form */}
                    <form
                        onSubmit={handleSignupSubmit}
                        className='space-y-6'
                        noValidate
                    >
                        {/* Full name */}
                        <div className='flex flex-col gap-2'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none'>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered pl-12 w-full font-medium focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200`}
                                    placeholder='Full Name'
                                    value={signupData.fullname}
                                    onChange={(e) => setSignupData({ ...signupData, fullname: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Full name end */}

                        {/* Username */}
                        <div className='flex flex-col gap-2'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none'>
                                    <AtSign className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered pl-12 w-full font-medium focus:outline-none focus:ring-2 ring-base transition duration-0 focus:duration-200`}
                                    placeholder='Username'
                                    value={signupData.username}
                                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Username end */}

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
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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
                            disabled={isSigningUp}
                        >
                            {isSigningUp ?
                                (
                                    <>
                                        <span>Registering</span>
                                        <Loader className='size-5 animate-spin' />
                                    </>
                                ) :
                                (
                                    "Register"
                                )
                            }
                        </button>
                        {/* Submit btn end */}
                    </form>
                    {/* Signup Form end */}

                    {/* Signup bottom */}
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already registered?{" "}
                            <Link
                                to="/login"
                                className='link link-primary'
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                    {/* Signup bottom end */}
                </div>
            </div>
        </div>
    );
}

export { SignupPage }
import { AtSign, CalendarRange, Camera, Loader, Mail, SquareUserRound } from "lucide-react";
import ProfileComponent from "../components/ProfileComponent";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import ProfilePageSkeleton from "../components/skeletons/ProfilePageSkeleton";

function ProfilePage() {

    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authUser, checkAuth, uploadAvatar, isUpdatingProfile, deleteAccount, isDeletingUser } = useAuthStore();

    useEffect(() => {
        const fetchAuth = async () => {
            await checkAuth();
            setLoading(false);
        }
        fetchAuth();
    }, [checkAuth]);

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const get64Base = (data) => {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        }

        try {
            const localPreview = get64Base(file);
            setAvatar(localPreview);

            // Server upload
            const formData = new FormData();
            formData.append("avatar", file);
            await uploadAvatar(formData);

        } catch (error) {
            toast.error("Failed to upload Avatar");
        } finally {
            setAvatar(null);
        }
    };

    const extractDate = () => {
        const date = new Date(authUser?.data?.createdAt);
        const options = {
            year: "numeric", 
            month: "long",
            day: "numeric"
        }
        const formattedDate = date.toLocaleDateString("en-US", options);

        return formattedDate;
    }

    if (loading) {
        return <ProfilePageSkeleton />;
    }

    return (
        <div className='h-screen'>
            {authUser && (
                <div className="max-w-2xl mx-auto px-6 pb-6 pt-23 sm:pb-12">
                    <div className="border-2 border-base-content/70 rounded-xl space-y-8 p-4 pb-6">
                        {/* Profile head */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">My Profile</h1>
                            <p className="mt-3 text-base-content/60 font-medium">You can update avatar and see personal information</p>
                        </div>
                        {/* Profile head end */}

                        {/* Avatar */}
                        <div className="flex flex-col gap-4 items-center">
                            <div className="relative">
                                <img
                                    src={avatar || authUser?.data.avatar.url}
                                    alt="Avatar"
                                    className="size-32 object-cover rounded-full border-4"
                                />
                                <label
                                    htmlFor="upload-avatar"
                                    className={`absolute right-0 bottom-0 bg-base-content p-2 hover:scale-110 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                                >
                                    <Camera className="size-5 text-base-200" />
                                    <input
                                        type="file"
                                        id="upload-avatar"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleUploadAvatar}
                                        disabled={isUpdatingProfile}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-zinc-500">
                                {isUpdatingProfile ? "Uploading... Please wait until upload complete" : "Click the camera icon to upload an avatar"}
                            </p>
                        </div>
                        {/* Avatar end */}

                        {/* User info */}
                        <div className="flex flex-col gap-7">
                            <ProfileComponent
                                title="Full name"
                                value={authUser?.data.fullname}
                                Icon={SquareUserRound}
                            />

                            <ProfileComponent
                                title="Username"
                                value={authUser?.data.username}
                                Icon={AtSign}
                            />

                            <ProfileComponent
                                title="Email"
                                value={authUser?.data.email}
                                Icon={Mail}
                            />

                            <ProfileComponent
                                title="Account created"
                                value={extractDate()}
                                Icon={CalendarRange}
                            />
                        </div>
                        {/* User info end */}

                        {/* Delete account */}
                        <div className="flex flex-col space-y-5 border-2 bg-error/10 border-error/70 rounded-xl p-4">
                            <div className="text-center flex flex-col">
                                <h1 className="text-2xl text-red-500 font-bold">Danger Zone</h1>
                                <p className="text-error/80 font-medium mt-2">These actions are permanent and cannot be undone.</p>
                            </div>
                            <button
                                onClick={deleteAccount}
                                className={`btn btn-error w-full ${isDeletingUser ? "animation-pulse pointer-events-none" : ""}`}
                                disabled={isDeletingUser}
                            >
                                <span className="text-lg font-medium">Delete Account</span>
                            </button>
                        </div>
                        {/* Delete account end */}
                    </div>
                </div>
            )}
        </div>
    );
}

export { ProfilePage }

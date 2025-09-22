import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignupPage } from "./pages/SignupPage";
import { SearchPage } from "./pages/SearchPage";

import { Navbar } from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {

    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
        </div>
    ); 

    return (
        <>

            <Navbar />

            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/search" element={authUser ? <SearchPage /> : <Navigate to="/login" />} />
            </Routes>

            <Toaster />

        </>
    )
}

export default App

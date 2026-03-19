import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, User, Settings, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();

        navigate("/login");

        // Force page refresh to reset app state
        window.location.reload();
    };

    return (
        <div className="relative">
            <button
                className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <User className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">

                    {user?.role === "organization" && (
                        <button
                            onClick={() => { navigate("/employer"); setIsOpen(false); }}
                            className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
                        >
                            <Building2 className="w-4 h-4" />
                            Dashboard
                        </button>
                    )}

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" />
                        Profile Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

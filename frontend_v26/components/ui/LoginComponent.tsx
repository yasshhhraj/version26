import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginComponent({ menuOpen, toggleMenu}: { menuOpen: boolean, toggleMenu: () => void}) {
    const [loggedin, setLoggedin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check both cookie (via API) and localStorage for redundancy in this demo
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/session');
                if (res.ok) {
                    setLoggedin(true);
                } else {
                    setLoggedin(localStorage.getItem('loggedIn') === 'true');
                }
            } catch {
                setLoggedin(localStorage.getItem('loggedIn') === 'true');
            }
        };
        void checkAuth();

        // Listen for storage changes (to sync across tabs or from other components)
        const handleStorageChange = () => {
            setLoggedin(localStorage.getItem('loggedIn') === 'true');
        };
        window.addEventListener('storage', handleStorageChange);
        
        // Custom event for same-tab updates
        window.addEventListener('auth-change', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleStorageChange);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.clear();
            setLoggedin(false);
            window.dispatchEvent(new Event('auth-change'));
            router.push("/");
            router.refresh();
        }
    };

    return(
        <div className="  flex items-center gap-4">
            {/* Profile / Login State */}
            {loggedin ? (
                <ProfileBlock logout={handleLogout} />
            ) : (
                <LoginButton />
            )}

            {/* Mobile Hamburger (Visible only on small screens) */}
            <button
                onClick={() => toggleMenu()}
                className="lg:hidden flex flex-col gap-1.5 p-1 z-50"
            >
                <span className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
        </div>
    )
}


function LoginButton() {
    return (
        <Link href={'/auth'}
           className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-purple-900/20"
        >
            Login
        </Link>
    );
}

function ProfileBlock({ logout }: { logout: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const [userInfo, setUserInfo] = useState({ name: '', email: '' });

    useEffect(() => {
        const updateUserInfo = () => {
            setUserInfo({
                name: localStorage.getItem('name') || 'User',
                email: localStorage.getItem('email') || ''
            });
        };
        updateUserInfo();

        // Sync with other components/tabs
        window.addEventListener('storage', updateUserInfo);
        window.addEventListener('auth-change', updateUserInfo);

        return () => {
            window.removeEventListener('storage', updateUserInfo);
            window.removeEventListener('auth-change', updateUserInfo);
        };
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative " ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1  bg-black/10 shadow-2xl  rounded-lg overflow-clip"
            >
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-white">{userInfo.name}</div>
                    <div className="text-[10px] text-gray-400">{userInfo.email}</div>
                </div>
                <div className="w-8 h-8 rounded-md bg-gray-600 overflow-hidden relative flex items-center justify-center">
                    {/* Use next/image here for real profile pic */}
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-indigo-500" />
                    <span className="relative text-white font-bold text-sm uppercase">
                        {userInfo.name.charAt(0)}
                    </span>
                </div>
            </button>

            {isOpen && (
                <div className="absolute glassmorphism top-[110%] right-0 mt-2 w-48 bg-[#171717] border border-[#2E2F2F] rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 z-50">
                    {/* Mobile-only user info inside dropdown */}
                    <div className="px-4 py-2 border-b border-[#2E2F2F] sm:hidden">
                        <p className="text-sm font-medium text-white">{userInfo.name}</p>
                        <p className="text-xs text-gray-400">{userInfo.email}</p>
                    </div>

                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2E2F2F] transition-colors">
                        Profile
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#2E2F2F] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

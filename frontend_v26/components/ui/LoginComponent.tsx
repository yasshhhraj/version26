import {useEffect, useRef, useState} from "react";


export default function LoginComponent({ menuOpen, toggleMenu}: { menuOpen: boolean, toggleMenu: () => void}) {
    const [loggedin, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedValue =  (localStorage.getItem('loggedIn'))
        setLoggedIn(Boolean (storedValue) && storedValue=='true')
    }, []);

    return(
        <div className="flex items-center gap-4">
            {/* Profile / Login State */}
            {loggedin ? (
                <ProfileBlock
                    logout={() => {
                        localStorage.removeItem('loggedIn');
                        setLoggedIn(false);
                    }} />
            ) : (
                <LoginButton />
            )}

            {/* Mobile Hamburger (Visible only on small screens) */}
            <button
                onClick={() => toggleMenu()}
                className="md:hidden flex flex-col gap-1.5 p-1 z-50"
            >
                <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white rounded transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
        </div>
    )
}


function LoginButton() {
    return (
        <a href={'/auth'}
           className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-purple-900/20"
        >
            Login
        </a>
    );
}

function ProfileBlock({ logout }: { logout: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

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
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-white dark:bg-[#171717]/20 border border-gray-200 dark:border-[#2E2F2F] hover:border-gray-300 dark:hover:border-gray-500/40   rounded-lg p-1.5 md:p-2 transition-all duration-200 shadow-2xl dark:shadow-none"
            >
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{name}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">{email}</div>
                </div>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-md bg-gray-200 dark:bg-gray-600 overflow-hidden relative">
                    {/* Use next/image here for real profile pic */}
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-indigo-500" />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#2E2F2F] rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 z-50">
                    {/* Mobile-only user info inside dropdown */}
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-[#2E2F2F] sm:hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{localStorage.getItem('name')}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{localStorage.getItem('email')}</p>
                    </div>

                    <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2E2F2F] transition-colors">
                        Profile
                    </a>
                    <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#2E2F2F] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, BookOpen, Hash, School, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Toast, ToastProps } from "@/components/ui/Toast";

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  college: string;
  roll: string;
  semester: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/profile");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Fallback to localStorage if API fails (for demo continuity)
          const localUser = {
            name: localStorage.getItem("name") || "",
            email: localStorage.getItem("email") || "",
            mobile: localStorage.getItem("mobile") || "N/A",
            college: localStorage.getItem("college") || "N/A",
            roll: localStorage.getItem("roll") || "N/A",
            semester: localStorage.getItem("semester") || "N/A",
          };
          
          if (localUser.email) {
             setUser(localUser);
          } else {
             router.push("/auth");
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile().then(() => {});
  }, [router]);

  const handleLogout = async () => {
    try {
        await fetch("/api/auth/logout", { method: "POST" });
        localStorage.clear();
        setToast({ message: "Logged out successfully", type: "success", duration: 2000 });
        setTimeout(() => {
            router.push("/");
            router.refresh();
        }, 1000);
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-900 via-blue-950 to-black text-white pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Cover Image / Header */}
          <div className="h-48 bg-linear-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-800 overflow-hidden relative shadow-xl">
                 {/* Placeholder Avatar */}
                 <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                 </div>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 md:px-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                className="mt-4 md:mt-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileItem icon={<School className="w-5 h-5 text-blue-400" />} label="College" value={user.college} />
              <ProfileItem icon={<Hash className="w-5 h-5 text-purple-400" />} label="Roll Number" value={user.roll} />
              <ProfileItem icon={<BookOpen className="w-5 h-5 text-green-400" />} label="Semester" value={user.semester} />
              <ProfileItem icon={<Phone className="w-5 h-5 text-yellow-400" />} label="Mobile" value={user.mobile} />
            </div>
          </div>
        </motion.div>
      </div>
      {toast && <Toast {...toast} />}
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
      <div className="p-3 bg-white/5 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-medium text-white">{value || "N/A"}</p>
      </div>
    </div>
  );
}

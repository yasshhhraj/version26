import React, { useState, useEffect } from 'react';
import { Home, Calendar, Lightbulb, Users, ArrowRight } from 'lucide-react';

export default function Version26Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm bg-black/20">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-black tracking-tight">
            <span className="text-purple-500">V</span>
            <span className="text-white">ERSION</span>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <a href="#home" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
            <Home size={18} />
            <span className="font-medium">Home</span>
          </a>
          <a href="#events" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
            <Calendar size={18} />
            <span className="font-medium">Events</span>
          </a>
          <a href="#vision" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
            <Lightbulb size={18} />
            <span className="font-medium">Vision</span>
          </a>
          <a href="#team" className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
            <Users size={18} />
            <span className="font-medium">Team</span>
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right text-sm">
            <div className="font-medium">User Name</div>
            <div className="text-gray-400 text-xs">email@gmail.com</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Edition Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm mb-8 animate-[fadeIn_0.6s_ease-out]">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-sm font-medium">33rd Edition</span>
          </div>

          {/* Main Heading */}
          <div className="mb-6 animate-[slideUp_0.8s_ease-out]">
            <h1 className="text-8xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">V</span>
              <span>ERSION'26</span>
            </h1>
          </div>

          {/* Themed Text */}
          <div className="mb-8">
            <p className="text-lg text-purple-400 mb-2">Themed</p>
            <h2 className="text-5xl font-bold">
              <span className="text-white">Artificial </span>
              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]">
                General
              </span>
              <span className="text-white"> Intelligence</span>
            </h2>
          </div>

          {/* 3D Hand Illustration */}
          <div className="mb-12 relative">
            <div className="w-64 h-64 relative animate-[float_3s_ease-in-out_infinite]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative -rotate-[15deg]">
                  {/* Palm */}
                  <div className="w-32 h-40 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 rounded-3xl shadow-2xl relative">
                    {/* Fingers */}
                    <div className="absolute -top-16 left-4 w-6 h-20 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg -rotate-[10deg]"></div>
                    <div className="absolute -top-20 left-12 w-7 h-24 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                    <div className="absolute -top-20 left-[5.5rem] w-7 h-24 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg rotate-[5deg]"></div>
                    <div className="absolute -top-16 left-32 w-6 h-20 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg rotate-[15deg]"></div>
                    
                    {/* Thumb */}
                    <div className="absolute top-8 -left-8 w-8 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg rotate-[45deg]"></div>
                    
                    {/* Highlight */}
                    <div className="absolute top-4 right-4 w-12 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Where Human Imagination Meets Machine Evolution.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-6">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold flex items-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              <span>Be Part of Version'26</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/30 rounded-full font-semibold flex items-center space-x-2 hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              <span>Meet The Team</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "#gallery" },
        { name: "About Us", href: "#about" },
    ];

    const contactInfo = [
        { icon: Mail, text: "hello@version26.tech" },
        { icon: Phone, text: "+91 12345 67890" },
        { icon: MapPin, text: "Tech Institute, City, Country" },
    ];

    return (
        <footer className="relative bg-black text-white border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#4600be]/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#4600be] rounded-lg flex items-center justify-center font-bold text-xl italic shadow-[0_0_20px_rgba(70,0,190,0.5)]">
                                V
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase">
                                Version&apos;26
                            </span>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            The ultimate tech symposium where innovation meets execution. Join us in shaping the future of technology.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#4600be] hover:border-[#4600be]/50 transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-[#4600be] pl-4 uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        <span className="w-0 h-[1px] bg-[#4600be] group-hover:w-4 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-[#4600be] pl-4 uppercase tracking-widest text-xs">Contact</h4>
                        <ul className="flex flex-col gap-5">
                            {contactInfo.map((info, index) => (
                                <li key={index} className="flex items-start gap-3 text-neutral-400 text-sm">
                                    <info.icon size={18} className="text-[#4600be] shrink-0" />
                                    <span>{info.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-[#4600be] pl-4 uppercase tracking-widest text-xs">Newsletter</h4>
                        <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                            Stay updated with the latest event news and tech insights.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input 
                                type="email" 
                                placeholder="your@email.com"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4600be]/50 transition-colors"
                            />
                            <button className="bg-[#4600be] hover:bg-[#5a10d6] text-white text-sm font-bold py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(70,0,190,0.3)]">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-widest text-neutral-500 uppercase">
                    <p>© {currentYear} VERSION&apos;26 TECH SYMPOSIUM. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
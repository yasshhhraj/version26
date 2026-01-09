"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/version_nit_trichy/", label: "Instagram" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/version-mca-nit-trichy/", label: "LinkedIn" },
    ];

    const exploreLinks = [
        { name: "Events", href: "/events" },
        { name: "Team", href: "/team" },
        { name: "Vision", href: "/vision" },
    ];

    return (
        <footer className="relative bg-black text-white border-t border-white/10 pt-16 pb-8 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#4600be]/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    {/* 1. Logo & Title */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-32 h-10">
                             <Image
                                src="/Assets/final-logo.png"
                                alt="Version'26 Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-wider">Version&apos;26</h3>
                            <p className="text-neutral-400 text-sm">The Annual Tech Symposium</p>
                        </div>
                    </div>

                    {/* 2. Explore */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#4600be]">Explore</h4>
                        <ul className="flex flex-col gap-2">
                            {exploreLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#4600be]">Contact</h4>
                        <div className="flex flex-col gap-2 text-neutral-400 text-sm">
                            <p>NIT Tiruchirappalli</p>
                            <p>Tiruchirappalli - 620015</p>
                            <a href="mailto:contact@version26.in" className="hover:text-white transition-colors">
                                contact@version26.in
                            </a>
                            
                            {/* Secretary Info Placeholder */}
                            <div className="mt-4">
                                <p className="font-semibold text-white">Secretary</p>
                                <p>Name: +91 00000 00000</p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Connect */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#4600be]">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#4600be] hover:border-[#4600be]/50 transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-widest text-neutral-500 uppercase">
                    <p>© {2026} Version&apos;26. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
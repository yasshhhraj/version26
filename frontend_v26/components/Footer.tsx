"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
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
        <footer className="relative bg-black text-white border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#4600be]/20 blur-[150px] rounded-full -z-10" />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] opacity-50 -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    
                    {/* 1. Brand & Description (Span 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="relative w-40 h-12 block">
                             <Image
                                src="/Assets/final-logo.png"
                                alt="Version'26 Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold tracking-tighter">VERSION&apos;26</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                                The Annual All India MCA Meet organized by the students of the Department of Computer Applications, NIT Trichy.
                            </p>
                        </div>
                        
                        {/* Socials */}
                        <div className="flex gap-4 mt-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#4600be] hover:border-[#4600be]/50 hover:bg-[#4600be]/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Navigation (Span 2 cols) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#4600be] mb-6">Explore</h4>
                        <ul className="flex flex-col gap-3">
                            {exploreLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        href={link.href}
                                        className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#4600be] transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Info (Span 3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#4600be] mb-6">Contact</h4>
                        <ul className="flex flex-col gap-4 text-sm text-neutral-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#4600be] shrink-0 mt-0.5" />
                                <span>
                                    National Institute of Technology,<br />
                                    Tiruchirappalli - 620015,<br />
                                    Tamil Nadu, India.
                                </span>
                            </li>
                            <li>
                                <a href="mailto:contact@version26.in" className="flex items-center gap-3 hover:text-white transition-colors group">
                                    <Mail size={18} className="text-[#4600be] group-hover:scale-110 transition-transform" />
                                    contact@version26.in
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Secretary / Extra Info (Span 2 cols) */}
                    <div className="lg:col-span-2">
                         <h4 className="text-sm font-bold uppercase tracking-widest text-[#4600be] mb-6">Inquiries</h4>
                         <div className="flex flex-col gap-4 text-sm text-neutral-400">
                            <div>
                                <p className="text-white font-medium mb-1">Chairperson</p>
                                <a href="tel:+910000000000" className="hover:text-[#4600be] transition-colors flex items-center gap-2">
                                    <Phone size={14} /> +91 00000 00000
                                </a>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
                    <p>© {currentYear} VERSION&apos;26. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
                        <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
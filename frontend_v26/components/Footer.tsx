"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, MapPin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ContactPopup from "@/components/ContactPopup";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/version_nit_trichy/", label: "Instagram" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/version-mca-nit-trichy/", label: "LinkedIn" },
    ];

    const navLinks = [
        { name: "Events", href: "/events" },
        { name: "Team", href: "/team" },
        { name: "Vision", href: "/vision" },
    ];

    return (
        <footer className="relative bg-transparent text-white pt-12 pb-6 overflow-hidden flex flex-col items-center">
            <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#4600be]/15 blur-[100px] rounded-full -z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))] z-0" />

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                
                {/* 1. Large Logo */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-48 h-16 md:w-64 md:h-24 mb-4"
                >
                     <Image
                        src="/Assets/final-logo.png"
                        alt="Version'26 Logo"
                        fill
                        className="object-contain"
                    />
                </motion.div>

                {/* 2. Tagline */}
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-400 text-sm md:text-base max-w-xl mb-6 leading-relaxed"
                >
                    The Annual All India MCA Meet organized by the students of the <br className="hidden md:block" />
                    Department of Computer Applications, NIT Trichy.
                </motion.p>

                {/* 3. Navigation Rows */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6"
                >
                    {navLinks.map((link, index) => (
                        <Link 
                            key={index}
                            href={link.href}
                            className="text-sm md:text-base font-medium tracking-wide hover:text-[#4600be] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4600be] transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <button 
                        onClick={() => setIsContactOpen(true)}
                        className="text-sm md:text-base font-medium tracking-wide hover:text-[#4600be] transition-colors relative group cursor-pointer"
                    >
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4600be] transition-all group-hover:w-full" />
                    </button>
                </motion.div>

                {/* 4. Socials */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 mb-8"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#4600be] hover:border-[#4600be] transition-all duration-300"
                        >
                            <social.icon size={18} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* 5. Bottom Info (Address & Copyright) */}
                <div className="w-full border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>NIT Tiruchirappalli - 620015</span>
                    </div>
                    
                    <p>© {currentYear} Version&apos;26. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
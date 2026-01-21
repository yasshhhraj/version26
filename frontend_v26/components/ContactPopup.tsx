"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Instagram, Linkedin, Globe } from "lucide-react";

interface ContactPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image/Gradient */}
                        <div className="h-32 bg-linear-to-r from-purple-900 via-[#4600be] to-blue-900 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/10 backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>
                            <div className="absolute -bottom-8 left-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#4600be] border-4 border-neutral-950 flex items-center justify-center shadow-xl">
                                    <Mail className="text-white" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="pt-12 p-8 sm:p-10">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Get in Touch</h2>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    Have questions about Version&apos;26? Our team is here to help you. Reach out through any of these channels.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <ContactItem
                                        icon={Mail}
                                        label="Email"
                                        value="version26.nitt@gmail.com"
                                        href="mailto:version26.nitt@gmail.com"
                                    />
                                    <ContactItem
                                        icon={Phone}
                                        label="Phone"
                                        value="Rohit "
                                        href="tel:+917870365623"
                                    />
                                    <ContactItem
                                        icon={Phone}
                                        label="Phone"
                                        value="Alok"
                                        href="tel:+919871943540"
                                    />
                                    <ContactItem
                                        icon={MapPin}
                                        label="Location"
                                        value="NIT Trichy, Tamil Nadu, India"
                                        href="https://maps.app.goo.gl/7ba91TRgTXJg4iEu5"
                                    />
                                </div>

                                {/* Social Links */}
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Social Connect</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <SocialButton
                                            icon={Instagram}
                                            label="Instagram"
                                            href="https://www.instagram.com/version_nit_trichy/"
                                        />
                                        <SocialButton
                                            icon={Linkedin}
                                            label="LinkedIn"
                                            href="https://www.linkedin.com/company/version-mca-nit-trichy/"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t border-white/5 text-center">
                                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em]">
                                    Version&apos;26 // MCA NIT Trichy
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const ContactItem = ({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href: string }) => (
    <a href={href} className="flex items-start gap-4 group">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-[#4600be] group-hover:text-white transition-all">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-0.5">{label}</p>
            <p className="text-sm text-neutral-200 group-hover:text-white transition-colors">{value}</p>
        </div>
    </a>
);

const SocialButton = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#4600be]/50 hover:bg-[#4600be]/10 transition-all gap-2 group"
    >
        <Icon size={20} className="text-neutral-400 group-hover:text-purple-400 transition-colors" />
        <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 uppercase tracking-tighter transition-colors">{label}</span>
    </a>
);

export default ContactPopup;

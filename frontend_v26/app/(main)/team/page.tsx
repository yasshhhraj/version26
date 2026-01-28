"use client"

import Image from "next/image"
import {FileText, Users, ShieldCheck, Mail, X, Linkedin} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface TeamMemberProps {
    name: string
    role: string
    committee?: string
    image: string
    linkedin_id?: string
    email_id?: string
    className?: string
}


function TeamMemberCard({ name, role, committee, image, linkedin_id, email_id, index, className }: TeamMemberProps & { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 3) * 0.1 }}
            className={`group w-full max-w-[280px] relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-[#4600be]/30 hover:bg-white/10 ${className || ""}`}
        >
            {/* Scanning Line Effect on Hover */}
            <div className="absolute inset-x-0 h-0.5 top-0 bg-linear-to-r from-transparent via-[#4600be] to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:top-full z-20" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />

            {/* Image Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image 
                    src={image || "/placeholder.svg"} 
                    alt={name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                
                {/* Version Tag */}
                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 text-[8px] font-bold tracking-[0.2em] text-white bg-black/50 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                        <span className="font-serif italic text-purple-400">Version</span>
                        <span className="text-[10px] align-super">&apos;26</span>
                    </div>
                </div>

                {/* Card Overlay / Socials */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                    <div className="flex gap-3 mb-4">
                         {linkedin_id && (
                             <a href={linkedin_id} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#4600be]/20 border border-[#4600be]/40 hover:bg-[#4600be] transition-colors">
                                <Linkedin className="w-3 h-3 text-white" />
                             </a>
                         )}
                         {email_id && (
                             <a href={`mailto:${email_id}`} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors">
                                <Mail className="w-3 h-3 text-white" />
                             </a>
                         )}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-linear-to-b from-transparent to-black/20">
                <motion.p className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#4600be] mb-1">
                    {role}
                </motion.p>
                <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{name}</h3>
                {committee && <p className="text-white/40 text-[10px] mt-1 font-mono tracking-tighter uppercase">{committee}</p>}
            </div>
        </motion.div>
    )
}

interface AdvisorCardProps {
    name: string
    title: string
    image: string
    message: string
    onMessageClick: (message: string, name: string, title: string, image: string) => void
}

function AdvisorCard({ name, title, image, message, onMessageClick }: AdvisorCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="relative flex flex-col justify-end aspect-4/5 w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all hover:border-[#4600be]/30 group"
        >
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />

             {/* Image Container */}
             <div className="absolute inset-0 w-full h-full">
                <Image 
                    src={image || "/placeholder.svg"} 
                    alt={name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
             </div>

            <div className="flex items-end justify-between relative z-10 p-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4600be] mb-1">Advisor</p>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{name}</h3>
                    <p className="text-white/40 text-xs font-mono tracking-tighter">{title}</p>
                </div>
                <button 
                    onClick={() => onMessageClick(message, name, title, image)}
                    className="p-3 rounded-full bg-[#4600be] shadow-[0_0_15px_rgba(70,0,190,0.5)] hover:bg-[#4600be]/80 transition-colors cursor-pointer z-20"
                >
                    <FileText className="w-4 h-4 text-white" />
                </button>
            </div>
        </motion.div>
    )
}

interface MessageModalProps {
    isOpen: boolean
    onClose: () => void
    message: string
    name: string
    title: string
    image: string
}

function MessageModal({ isOpen, onClose, message, name, title, image }: MessageModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl"
                    >
                        <div className="relative h-32 bg-linear-to-r from-[#4600be]/20 to-purple-900/20">
                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="px-8 pb-8 -mt-12 relative">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-4 border-neutral-900 shadow-xl shrink-0">
                                    <Image 
                                        src={image || "/placeholder.svg"} 
                                        alt={name} 
                                        fill 
                                        className="object-cover" 
                                    />
                                </div>
                                <div className="pt-12 md:pt-14">
                                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                                    <p className="text-[#4600be] text-sm font-bold tracking-widest uppercase">{title}</p>
                                </div>
                            </div>
                            
                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-4">
                                    <FileText className="w-6 h-6 text-[#4600be] shrink-0 mt-1" />
                                    <div className="space-y-4 text-neutral-300 leading-relaxed">
                                        {message.split('\n').map((paragraph, i) => (
                                            <p key={i}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

interface Advisor {
    name: string;
    role: string;
    image: string;
    message: string;
}

export default function TeamPage() {
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: "",
        name: "",
        title: "",
        image: ""
    })

    const [teamData, setTeamData] = useState<{
        advisors: Advisor[];
        cccMembers: TeamMemberProps[];
        coreTeam: TeamMemberProps[];
    }>({
        advisors: [],
        cccMembers: [],
        coreTeam: []
    });

    const [members, setMembers] = useState<TeamMemberProps[]>([]);

    useEffect(() => {
        fetch('/data/team.json')
            .then(res => res.json())
            .then(data => {
                setTeamData(data);
            })
            .catch(err => console.error("Failed to load team data:", err));

        fetch('/data/members.json')
            .then(res => res.json())
            .then(data => {
                setMembers(data);
            })
            .catch(err => console.error("Failed to load members data:", err));
    }, []);

    const openMessage = (message: string, name: string, title: string, image: string) => {
        setModalState({
            isOpen: true,
            message,
            name,
            title,
            image
        })
    }

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }))
    }


    return (
        <main className="relative min-h-screen bg-black px-4 py-24 text-neutral-100 selection:bg-purple-500/30 overflow-x-hidden">
             {/* Ambient Background Glows */}
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4600be]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full -z-10" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-16 flex flex-col items-center justify-center gap-4 border-b border-white/10 pb-10 text-center">
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full w-fit">
                        <Users size={14} />
                        <span>VERSION&apos;26 ORGANIZATION</span>
                    </div>
                    <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-9xl uppercase">
                        Meet the <span className="text-version-mauve italic">Team</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-neutral-400 mt-4">
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-version-mauve opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-version-mauve"></span>
                            </span>
                            CORE ORG
                        </div>
                    </div>
                </div>

                {/* Head of Department & Staff Advisor */}
                {teamData.advisors.length > 0 && (
                    <section className="mb-32">
                        <div className="flex flex-col items-center gap-2 mb-10 text-center">
                            <div className="flex items-center justify-center gap-2 text-[#4600be] mb-2">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Leadership</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Advisory <span className="text-[#4600be] italic font-serif">Board</span></h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {teamData.advisors.map((advisor, index) => (
                                <AdvisorCard 
                                    key={index}
                                    name={advisor.name} 
                                    title={advisor.role} 
                                    image={advisor.image}
                                    message={advisor.message}
                                    onMessageClick={openMessage}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Central Coordination Committee */}
                {teamData.cccMembers.length > 0 && (
                    <section className="mb-32">
                        <div className="flex flex-col items-center gap-2 mb-12 text-center">
                            <div className="flex items-center gap-2 text-[#4600be] mb-2">
                                <div className="h-px w-8 bg-[#4600be]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Committee</span>
                                <div className="h-px w-8 bg-[#4600be]" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Central Coordination <span className="text-[#4600be] italic font-serif">Committee</span></h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {teamData.cccMembers.map((member, index) => (
                                <TeamMemberCard key={index} {...member} role={member.role} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Executive Board (Secretary, Treasurer & Heads) */}
                {teamData.coreTeam.length > 0 && (
                    <section className="mb-32">
                        <div className="flex flex-col items-center gap-2 mb-12 text-center">
                            <div className="flex items-center gap-2 text-[#4600be] mb-2">
                                <div className="h-px w-8 bg-[#4600be]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Core</span>
                                <div className="h-px w-8 bg-[#4600be]" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Core <span className="text-[#4600be] italic font-serif">Team</span></h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {teamData.coreTeam.map((member, index) => (
                                <TeamMemberCard key={index} {...member} role={member.role} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Members Section */}
                {members.length > 0 && (
                    <section className="mb-20">
                        <div className="flex flex-col items-center gap-2 mb-12 text-center">
                            <div className="flex items-center gap-2 text-[#4600be] mb-2">
                                <div className="h-px w-8 bg-[#4600be]" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Members</span>
                                <div className="h-px w-8 bg-[#4600be]" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">
                                Our <span className="text-[#4600be] italic font-serif">Members</span>
                            </h2>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8">
                            {members.map((member, index) => (
                                <TeamMemberCard key={index} {...member} role={member.role} index={index} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <MessageModal 
                isOpen={modalState.isOpen}
                onClose={closeModal}
                message={modalState.message}
                name={modalState.name}
                title={modalState.title}
                image={modalState.image}
            />
        </main>
    )
}

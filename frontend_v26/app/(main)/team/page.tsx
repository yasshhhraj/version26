"use client"

import Image from "next/image"
import { FileText, Users, ShieldCheck, Mail, Linkedin, Github, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface TeamMemberProps {
    name: string
    role: string
    department: string
    image: string
}

function TeamMemberCard({ name, role, department, image, index }: TeamMemberProps & { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 3) * 0.1 }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-[#4600be]/30 hover:bg-white/10"
        >
            {/* Scanning Line Effect on Hover */}
            <div className="absolute inset-x-0 h-[2px] top-0 bg-gradient-to-r from-transparent via-[#4600be] to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:top-full z-20" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />

            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
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

                {/* Card Overlay / Socials (Mockup) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                    <div className="flex gap-3 mb-4">
                         <div className="p-2 rounded-full bg-[#4600be]/20 border border-[#4600be]/40 hover:bg-[#4600be] transition-colors">
                            <Linkedin className="w-3 h-3 text-white" />
                         </div>
                         <div className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors">
                            <Mail className="w-3 h-3 text-white" />
                         </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-transparent to-black/20">
                <motion.p className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#4600be] mb-1">
                    {role}
                </motion.p>
                <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{name}</h3>
                <p className="text-white/40 text-xs mt-1 font-mono tracking-tighter">REF_CORE_{index.toString().padStart(3, '0')}</p>
            </div>
        </motion.div>
    )
}

interface AdvisorCardProps {
    name: string
    title: string
}

function AdvisorCard({ name, title }: AdvisorCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="relative flex flex-col justify-end aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-[#4600be]/30 group"
        >
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4" />

            <div className="flex items-end justify-between relative z-10">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4600be] mb-1">Advisor</p>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{name}</h3>
                    <p className="text-white/40 text-xs font-mono tracking-tighter">{title}</p>
                </div>
                <button className="p-3 rounded-full bg-[#4600be] shadow-[0_0_15px_rgba(70,0,190,0.5)] hover:bg-[#4600be]/80 transition-colors">
                    <FileText className="w-4 h-4 text-white" />
                </button>
            </div>
        </motion.div>
    )
}

export default function TeamPage() {
    const cccMembers: TeamMemberProps[] = [
        {
            name: "Rohit Kumar Mishra",
            role: "CHAIRPERSON",
            department: "Department of computer applications",
            image: "/Assets/team/rohit.jpg",
        },
        {
            name: "Vivek Kumar",
            role: "CHAIRPERSON - EEC",
            department: "Department of computer applications",
            image: "/Assets/team/vivek.jpg",
        },
        {
            name: "Astik Verma",
            role: "CHAIRPERSON - AAC",
            department: "Department of computer applications",
            image: "/Assets/team/astik.jpg",
        },
        {
            name: "Nitin Pandey",
            role: "CHAIRPERSON - PRC",
            department: "Department of computer applications",
            image: "/Assets/team/nitin.jpg",
        },
        {
            name: "Amandeep",
            role: "CHAIRPERSON - HRC",
            department: "Department of computer applications",
            image: "/Assets/team/amandeep.jpg",
        },
        {
            name: "Sahil Kumar",
            role: "CHAIRPERSON - PRC",
            department: "Department of computer applications",
            image: "/Assets/team/sahil.jpg",
        },
    ]

    const coreMembers: TeamMemberProps[] = [
        {
            name: "Alok Nath Solanky",
            role: "SECRETARY",
            department: "Department of computer applications",
            image: "/Assets/team/alok.jpg",
        },
        {
            name: "Sudhir Kumar",
            role: "TREASURER",
            department: "Department of computer applications",
            image: "/Assets/team/sudhir.jpg",
        },
        {
            name: "Anshika Mishra",
            role: "AAC - HEAD",
            department: "Department of computer applications",
            image: "/Assets/team/anshika.jpg",
        },
        {
            name: "Avika Sachan, Pradeep Yadav",
            role: "HRC - HEADS",
            department: "Department of computer applications",
            image: "/Assets/team/hrc.jpg",
        },
        {
            name: "Yashraj Jangir, Vanshu",
            role: "EEC - HEADS",
            department: "Department of computer applications",
            image: "/Assets/team/eec.jpg",
        },
        {
            name: "Rohit Kumar, Sachin Panwar",
            role: "PRC - HEADS",
            department: "Department of computer applications",
            image: "/Assets/team/prc.jpg",
        },
        {
            name: "Rishu Kumar, Harsh Pathekar",
            role: "PRC - HEADS",
            department: "Department of computer applications",
            image: "/Assets/team/ppc.jpg",
        },
    ]

    return (
        <section className="relative min-h-screen bg-black px-4 py-24 text-neutral-100 selection:bg-purple-500/30 overflow-hidden">
             {/* Ambient Background Glows */}
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4600be]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full -z-10" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-16 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-10 md:flex-row md:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full w-fit">
                            <Users size={14} />
                            <span>VERSION&apos;26 ORGANIZATION</span>
                        </div>
                        <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-9xl uppercase">
                            Meet the <span className="text-[#4600be] italic">Team</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-neutral-400">
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4600be] opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4600be]"></span>
                            </span>
                            CORE ORG
                        </div>
                        <div className="border-l border-white/10 pl-4 py-2 uppercase tracking-[0.2em]">{cccMembers.length + coreMembers.length + 2} Contributors</div>
                    </div>
                </div>

                {/* Head of Department & Staff Advisor */}
                <section className="mb-32">
                     <div className="flex flex-col gap-2 mb-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-[#4600be] mb-2">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Leadership</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">ADVISORY BOARD</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12">
                        <AdvisorCard name="Dr. S. Domnic" title="Head of Department" />
                        <AdvisorCard name="Dr. B. Janet" title="Staff Advisor" />
                    </div>
                </section>

                {/* Central Coordination Committee */}
                <section className="mb-32">
                     <div className="flex flex-col gap-2 mb-12">
                        <div className="flex items-center gap-2 text-[#4600be] mb-2">
                            <div className="h-[1px] w-8 bg-[#4600be]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Executive</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Central Coordination <span className="text-[#4600be] italic font-serif">Committee</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cccMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} index={index} />
                        ))}
                    </div>
                </section>

                {/* Core Committee */}
                <section className="mb-20">
                    <div className="flex flex-col gap-2 mb-12">
                        <div className="flex items-center gap-2 text-[#4600be] mb-2">
                            <div className="h-[1px] w-8 bg-[#4600be]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Management</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Core <span className="text-[#4600be] italic font-serif">Committee</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {coreMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} index={index + cccMembers.length} />
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

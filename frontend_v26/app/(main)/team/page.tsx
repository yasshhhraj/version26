import Image from "next/image"
import { FileText } from "lucide-react"

interface TeamMemberProps {
    name: string
    role: string
    department: string
    image: string
}

function TeamMemberCard({ name, role, department, image }: TeamMemberProps) {
    return (
        <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-card">
                <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
                {/* VERSION'26 branding overlay */}
                <div className="absolute top-2 right-2">
                    <span className="font-serif italic text-yellow-400 text-sm">Version</span>
                    <span className="text-white text-[10px] align-super">'26</span>
                </div>
            </div>
            <div className="mt-3">
                <h3 className="text-white font-semibold text-sm">{name}</h3>
                <p className="text-yellow-400 text-xs font-medium uppercase tracking-wide">{role}</p>
                <p className="text-muted-foreground text-xs">{department}</p>
            </div>
        </div>
    )
}

interface AdvisorCardProps {
    name: string
    title: string
}

function AdvisorCard({ name, title }: AdvisorCardProps) {
    return (
        <div className="relative flex flex-col justify-end aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-lg bg-card p-4">
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-white font-semibold text-sm">{name}</h3>
                    <p className="text-muted-foreground text-xs">{title}</p>
                </div>
                <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <FileText className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
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
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-12">
                {/* Page Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">MEET THE TEAM</h1>

                {/* Head of Department & Staff Advisor */}
                <section className="mb-20">
                    <h2 className="text-sm md:text-base font-medium text-center text-muted-foreground tracking-widest mb-10">
                        HEAD OF THE DEPARTMENT & STAFF ADVISOR
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <AdvisorCard name="Dr. S. Domnic" title="Head of department" />
                        <AdvisorCard name="------------" title="Staff Advisor" />
                    </div>
                </section>

                {/* Central Coordination Committee */}
                <section className="mb-20">
                    <h2 className="text-lg md:text-xl font-semibold text-center text-white mb-10">
                        Central Coordination Committee (CCC)
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-4xl mx-auto">
                        {cccMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Core Committee */}
                <section className="mb-20">
                    <h2 className="text-lg md:text-xl font-semibold text-center text-white mb-10">Core Committee</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-4xl mx-auto">
                        {coreMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

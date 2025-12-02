import Image from "next/image";

export default function Navbar() {
    const loggedin= false;
    return (
        <nav className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-transparent h-16 w-[90%] z-1 flex items-center justify-between px-5 rounded-2xl">
            <Logo/>
            <div className="flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                <NavItem icon="home.svg" label="Home" />
                <NavItem icon="bill.svg" label="Event" />
                <NavItem icon="bulb.svg" label="Vision" />
                <NavItem icon="team.svg" label="Team" />
            </div>
            {loggedin ? <ProfileBlock /> : <ProfileBlockUnAuthenticated  />}
        </nav>
    );
}

function Logo() {
    return (
        <div className=" overflow-visible">
            <Image src={'/Assets/final-logo.png'} alt="Logo" width={212} height={50} />
        </div>
    )
}

function NavItem({ icon, label,  }: { icon:string; label: string }) {
    return (
        <a href="#" className="flex items-center space-x-1 hover:text-purple-400  transition-colors duration-200">
            <div className="w-6 h-6 bg-white " style={{ maskImage: `url(/icons/${icon})`, maskSize: 'contain', maskRepeat: 'no-repeat' }} />
            <span className="font-medium">{label}</span>
        </a>
    );
}

function ProfileBlockUnAuthenticated() {
    return (
        <button className="px-4 py-2 bg-purple-600 hover:bg-version-lavender-purple text-white font-medium rounded-md transition-colors duration-200">
            Login
        </button>
    );
}

function ProfileBlock() {
    return (
        <div className="flex items-center space-x-3 bg-[#171717] border border-[#2E2F2F] rounded-md p-2 ">
            <div className="text-right text-sm">
                <div className="font-medium">User Name</div>
                <div className="text-gray-400 text-xs">user@example.com</div>
            </div>
            <div className="w-10 h-10 rounded-md bg-gray-300"></div>
        </div>
    );
}
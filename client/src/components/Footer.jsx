import { Instagram } from "lucide-react"
import { Mail } from "lucide-react"
import { Linkedin } from "lucide-react"
import behance from "../assets/behance.png"

const socialLinks = [
    {
        id: "Instagram",
        icon: <Instagram size={22}/>,
        label: "Instagram",
        subtext: "See my visual diary",
        href: "https://instagram.com/muturi.x/",
        hoverBg: "group-hover:bg-gradient-to-r group-hover:from-[#833ab4] group-hover:via-[#fd1d1d] group-hover:to-[#fcb045]",
        hoverText: "group-hover:text-white",
        hoverBorder: "group-hover:border-transparent",
        hoverShadow: "group-hover:shadow-[2px_2px_0px_0px_#833ab4]",
    },
    {
        id: "Mail",
        icon : <Mail size={22} />,
        label: "Say Hell0",
        subtext: "Open for projects",
        href: "mailto:mwangimark391@gmail.com",
        hoverBg: "group-hover:bg-[#1a1a1a]",
        hoverText: "group-hover:text-white",
        hoverBorder: "group-hover:border-transparent",
        hoverShadow: "group-hover:shadow-[2px_2px_0px_0px_#1a1a1a]",
    },
    {
        id: "LinkedIn",
        icon: <Linkedin size={22} />,
        label: "LinkedIn",
        subtext: "My Professional Side",
        href: "https://linkedin.com/in/mark-muturi/",
        hoverBg: "group-hover:bg-[#0A66C2]",
        hoverText: "group-hover:text-white",
        hoverBorder: "group-hover:border-transparent",
        hoverShadow: "group-hover:shadow-[2px_2px_0px_0px_#0A66C2]",
    },
    {
        id: "behance",
        icon: <img src={behance} alt="Behance" className="w-[22px0 h-[22px] object-contain"/>,
        label: "Behance",
        subtext: "Full Case Studies",
        href: "https://behance.net/markthedev",
        hoverBg: "group-hover:bg-[#1769FF]",
        hoverText: "group-hover:text-white",
        hoverBorder: "group-hover:border-transparent",
        hoverShadow: "group-hover:shadow-[2px_2px_0px_0px_#1769FF]",
    },
]

function SocialButton({ icon, label, subtext, href, hoverBg, hoverText, hoverBorder, hoverShadow}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center cursor-pointer"
        >
            {/*Base state */}
            <div 
                className={[
                    "flex items-center gap-0 overflow-hidden rounded-full border border-black/20 bg-white",
                    "transition-all duration-300 ease-in-out",
                    "h-10 w-10 group-hover:w-40 group-hover:pr-4 group-hover:pl-3 group-hover:gap-3",
                    hoverBg, hoverBorder, hoverShadow,].join(" ")}
            >
                {/*Icon */}
                <span className={["flex-shrink-0 flex items-center justify-center w-10 h-10 transition-all duration-300 group-hover:scale-90",
                    hoverText
                ].join(" ")}
                >
                    {icon}
                </span>

                {/* Expanded Text */}
                <span className={["flex flex-col overflow-hidden whitespace-nowrap opacity-0 translate-x-2",
                    "group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75",
                    "leading-tight", hoverText
                ].join(" ")}
                >
                    <span className="text-xs font-medium font-serif tracking-tight">{label}</span>
                    <span className="text-[8px] font-light font-serif">{subtext}</span>
                </span>
            </div>
        </a>
    )
}

export default function Footer() {
    return (
        <div className="flex flex-col items-center gap-2 font-thin font-sans md:text-lg text-xs">
            <div className="ml-3">
                <p className="text-white">© suave.studio, 2025.</p>
                <p className="text-white">This is a design showcase for all to enjoy.</p>
                <p className="text-white">Designed and built by <a href="https://personal-portfolio-sand-mu.vercel.app/" target="_blank" className="transition-all duration-300 hover:text-red-500 hover:scale-105">Mark Muturi</a>.</p>
                <p className="text-white">I am available to hire per-project or on retainer.</p>
            </div>
            {/*Social Links */}
            <div className="flex mt-4 ml-3 gap-3 mb-5">
                {socialLinks.map((link) => (
                    <SocialButton key={link.id} {...link} />
                ))}
            </div>
        </div>

    )
}


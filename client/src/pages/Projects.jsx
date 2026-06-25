import { useState } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import SideRays from "../components/SideRays";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(0);
    
    const projects = [
        {
            title: "Liminal Experience",
            rayColor: "#9333ea",
            content: "There are places that don’t belong to arrival or departure. Moments that exist outside certainty. A hallway with no destination. A room that feels familiar even though you know you’ve never stood there before. The Liminal Experience invites you into that space between states—between memory and imagination, movement and stillness, noise and silence. Time stretches differently here. Every surface feels suspended. Every second asks for your attention. Wander without needing answers. Observe without needing meaning. Follow atmosphere instead of direction. This is not about reaching something. It is about existing inside the transition itself—long enough to notice what usually disappears between one moment and the next.",
            image: "https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Wall Art",
            rayColor: "#ffd700",
            content: "More than decoration, wall art is atmosphere made visible. It transforms empty surfaces into statements, memories, and emotion. Every texture, shape, and composition becomes part of the space you live in—changing how a room feels before a single word is spoken. Some pieces command attention. Others exist quietly, revealing more each time you pass by. Wall art creates identity. It can bring warmth to clean spaces, energy to quiet rooms, or calm to places filled with movement. It reflects taste without explanation and personality without noise. Whether bold and expressive or minimal and understated, each piece becomes part of the environment around it. Choose art that feels lived in. Choose pieces that create atmosphere, invite curiosity, and leave an impression long after the first glance. Your walls are not just boundaries—they are a canvas for experience.",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=458&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Footy Edition",
            rayColor: "#EF4444",
            content: "Football is more than ninety minutes and a final score. It is anticipation in the tunnel, noise rolling through the stands, and moments that turn strangers into believers. It lives in late winners, impossible comebacks, and the silence that follows a missed chance. Every match tells a different story—some written through skill, others through grit, chaos, and moments nobody could predict.It belongs to early kickoffs and late nights, to debates that never end, to colors worn with pride and memories passed between generations. It exists on perfect pitches and dusty streets alike. The game asks for everything: patience, passion, confidence, and sometimes faith. Here, every touch matters. Every second can change history. Every season creates new heroes and new heartbreak. This is not just sport. This is ritual, identity, culture, and emotion moving at full speed. This is football.",
            image: "https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ]

    const [activeColor, setActiveColor] = useState(projects[0].rayColor);
    const project = projects[selectedProject];
    const handleProjectChange = (i) => {
        setSelectedProject(i);
        setActiveColor(projects[i].rayColor);
    }
    
    return (
        <>
            <div className="min-h-screen bg-black flex flex-col relative">
                {/* SideRays Background Animation */}
                <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    <SideRays
                        key="side-rays-stable"
                        speed={1.5}
                        rayColor1="#ffffff"
                        rayColor2={activeColor}
                        intensity={4}
                        spread={5}
                        origin="top-right"
                        tilt={10}
                        saturation={1.5}
                        blend={0.75}
                        falloff={1.0}
                        opacity={0.8}
                    />
                </div>
                
                {/* Content Layer */}
                <div className="relative z-10">
                <div className="mb-10">
                    <Nav />
                </div>
                
                <div className="flex flex-col md:flex-row flex-1 w-full gap-4 md:gap-8 px-4 md:px-8 overflow-y-auto">
                    {/* Sidebar - Project Titles */}
                    <div className="w-full md:w-1/4">
                        <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                            {projects.map((proj, i) => (
                                <p 
                                    key={i}
                                    onMouseEnter={() => handleProjectChange(i)}
                                    onClick={() => handleProjectChange(i)}
                                    className={`whitespace-nowrap md:whitespace-normal text-sm md:text-base font-sans cursor-pointer transition-colors duration-300 ease-out
                                    ${selectedProject === i 
                                        ? 'text-red-500 font-bold' 
                                        : 'text-white hover:text-red-500'
                                    }`}
                                >
                                    {proj.title}
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-6 md:gap-8">
                        {/* Image */}
                        <div className="w-full md:w-1/2 flex items-center justify-center">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-40 h-auto md:h-96 md:w-full object-cover rounded-lg border border-slate-500 border-rounded"
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-start">
                            <h2 className="text-xl text-center md:text-3xl font-bold text-white mb-4">{project.title}</h2>
                            <p className="text-xs md:text-base font-light font-sans text-balance text-white/90 leading-relaxed">
                                {project.content}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-20 md:mt-40 mb-8">
                    <div className="w-screen flex justify-between">
                        <div className="w-1/4"></div>
                        <div className="flex justify-around bg-slate-500 w-1/2 h-0.5"></div>
                        <div className="w-1/4"></div>
                        </div>
                    
                    <div className="bg-transparent p-4"></div>
                    <Footer />
                </div>
                </div>
            </div>
        </>
    )
}
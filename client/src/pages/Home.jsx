import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Strands from "../components/Strands";

export default function Home() {
    return (
        <>
            <div className="min-h-screen w-screen bg-black flex flex-col relative overflow-hidden">
                {/* Strands Background Animation */}
                {/* <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    <Strands
                        colors={["#F97316","#7C3AED","#06B6D4"]}
                        count={8}
                        speed={0.2}
                        amplitude={0.8}
                        waviness={1}
                        thickness={0.6}
                        glow={2.5}
                        taper={2.5}
                        spread={0.8}
                        intensity={0.4}
                        saturation={1.8}
                        opacity={0.3}
                        scale={4.0}
                    />
                </div> */}
                
                {/* Content Layer */}
                <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
                    <Nav />
                    <Carousel />
                </div>
                <div className="mt-10"><Footer /></div>
            </div>
        </>
    )
}
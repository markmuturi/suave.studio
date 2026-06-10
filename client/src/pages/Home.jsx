import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

export default function Home() {
    return (
        <>
            <div className="bg-black">
                <div>
                    <Nav />
                </div>

                <div>
                    <Carousel />
                </div>
                
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
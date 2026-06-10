import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <>
            <div className="flex gap-6 justify-center bg-black text-white">
                <a href="#" className="text-sm font-bold relative inline-block mt-5 after:content-[''] after:absolute
                    after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                    suave.studio
                </a>
                <Link to="/projects" className="text-sm font-bold relative inline-block mt-5 after:content-[''] after:absolute
                    after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                    Projects
                </Link>
                {/* <a href="#" className="text-xs font-bold relative inline-block after:content-[''] after:absolute
                after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black
                after:transition-all after:duration-300 hover:after:w-full"
                >
                    About
                </a> */}
                {/* <a href="#" className="text-xs font-bold relative inline-block after:content-[''] after:absolute
                    after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                    Contact
                </a> */}
            </div>
        </>
    )
}
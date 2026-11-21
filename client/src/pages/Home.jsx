import { NavLink } from "react-router-dom";
import logoImg from "../assets/logo.png";
import heroRightImg from "../assets/dashboard.png";

const link = "px-3 py-1.5 text-md font-medium tracking-wide transition-colors duration-200 text-gray-600 hover:text-sky-600 rounded-md";

const activeLink = "px-3 py-1.5 text-md font-semibold text-sky-600 border-b-2 border-sky-600 rounded-none";

const Home = () => {
    return (
        <section className="bg-white min-h-screen">
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <Navbar />
                <HeroSection />
            </header>
        </section>
    );
};

const Navbar = () => {
    return (
        <nav className="bg-white px-4 py-3 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img src={logoImg} alt="logo" className="w-10 h-10 rounded-full object-cover" />
            </div>

            <div className="hidden md:flex items-center gap-6">
                <NavLink to="/home" className={({isActive}) => isActive ? activeLink : link}>Home</NavLink>
                <NavLink to="/features" className={({isActive}) => isActive ? activeLink : link}>Features</NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? activeLink : link}>About</NavLink>    
                <NavLink to="/contact" className={({isActive}) => isActive ? activeLink : link}>Contact</NavLink>    
            </div>

           
            <div className="flex items-center gap-6">
                <NavLink to="/trackPackage" className="hidden sm:inline-block text-md font-medium text-gray-600 hover:text-sky-600">Track Package</NavLink>
                <NavLink to="/login" className="hidden sm:inline-block text-md font-medium text-gray-600 hover:text-sky-600">Login</NavLink>
                
              
                <div className="flex items-center gap-4 text-gray-600 border-l pl-4 border-gray-200">
                    <button aria-label="Toggle theme" className="hover:text-sky-600 cursor-pointer">
                        ☀️
                    </button>
                    <span className="text-xs font-semibold text-gray-500 tracking-wider">EN / MM</span>
                </div>
            </div>
        </nav>
    );
};

const HeroSection = () => {
    return (
        <main className="py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold tracking-wider uppercase">
                    <span className="text-blue-900 text-xl leading-none">•</span> IOT & OTP SECURED PLATFORM
                </div>
                
                <h1 className="text-slate-900 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Secure Smart Logistics System
                </h1>
                
                <p className="text-sky-600 text-lg font-normal tracking-wide">
                    Delivering smarter, safer, and faster with IoT live tracking and OTP authentication.
                </p>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                    Monitor your cargo in real-time, receive instant secure updates, and optimize your dispatch-to-delivery workflow seamlessly.
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-4">
                    <button className="text-white bg-[#1e293b] hover:bg-[#0f172a] rounded-lg px-6 py-3 font-medium shadow-md cursor-pointer transition-all flex items-center gap-2">
                        Get Started <span className="text-lg">→</span>
                    </button>
                    
                    <button className="text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg px-6 py-3 font-medium shadow-sm cursor-pointer transition-all">
                        Track Package
                    </button>
                </div>
            </div>

            {/* Right Dashboard Image */}
            <div className="w-full flex justify-center">
                <img 
                    src={heroRightImg} 
                    alt="Dashboard Preview" 
                    className="w-full max-w-xl object-contain drop-shadow-xl rounded-xl" 
                />
            </div>
        </main>
    );
};

export default Home;
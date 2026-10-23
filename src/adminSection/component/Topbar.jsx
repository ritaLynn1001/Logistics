import profileImg from "../../assets/profile.png";  
import { FaRegBell } from "react-icons/fa";

const Topbar = () => {
  return (
    <nav className="flex justify-between items-center bg-sky-50  p-6 shadow-sm border-t rounded-xl border-gray-200">
        <h2 className="text-gray-700 text-xl font-semibold trackingwide">Admin Dashboard</h2>
        <div className="flex justify-center items-center gap-2">
            <div className="w-10 h-10 p-2 bg-sky-100 hover:bg-sky-200 rounded-full flex items-center justify-center transition-clors cursor-pointer">
                <FaRegBell className="text-lg text-gray-700"/>
            </div>
            <div className="flex items-center justify-center gap-2">
                <div>
                    <img src={profileImg} alt="Profile" className="w-10 h-10 rounded-full object-cover shadow-sm"/>
                </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-sm text-gray-500  font-semibold">Admin</h3>
                <p className="text-xs text-gray-300 font-light">Super Admin</p>
            </div>
            </div>
        </div>
    </nav>
  );
};

export default Topbar;
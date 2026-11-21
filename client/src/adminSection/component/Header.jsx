import { useNavigate } from "react-router-dom";

const Header = ({title, role, createUrl}) => {
    const navigate = useNavigate();
     const handleAddUser = () => {
        navigate(createUrl);
    };
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <button 
            onClick={() => handleAddUser({createUrl})}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
            {role}
            </button>
        </div>
    )

}

export default Header;
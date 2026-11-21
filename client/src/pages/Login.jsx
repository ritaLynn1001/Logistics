import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const inputStyle = "w-full px-4 py-2.5 text-sm text-slate-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";
const btnStyle = "w-full mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm py-2.5 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email === "admin123@gmail.com" && password === "admin**"){
            localStorage.setItem("adminEmail", email);
            navigate("/admin");
        }else{
            localStorage.setItem("adminToken", "secure-token-123");
            navigate("/users");
        }
        
        
    };



    return (
        <section className="h-screen px-6 bg-gray-50 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex flex-col items-center gap-6 border border-gray-100">
                <img src={logoImg} alt="logo" className="w-20 h-20 rounded-full object-contain shadow-sm"/>
                <h4 className="text-xl font-bold text-slate-800">Login to your Account</h4>
            
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyle}
                        required
                    />
                    <button 
                        type="submit" 
                        className={btnStyle}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
 import { useEffect, useState } from "react";
 import { IoArrowBackSharp } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const [openForm,setOpenForm] = useState(true);
    const [formData,setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        township: "",
        city: ""
    })
    const navigate = useNavigate();
    const [cities,setCities] = useState([]);
    const [townships, setTownships] = useState([]);

    const fetchCities = async() => {
        try{
            const res  = await fetch("/cities");
            const data  = await res.json();
            setCities(data);
        }catch(error){
            console.error("Failed to fetch cities:", error);
        }
    };

    const fetchTownShips = async()=>{
        try{
            const res = await fetch("/cities/${formData.city}/townships");
            const data = await res.json();
            setTownships(data);
        }catch(error){
            console.error("Failed to fetch townhsips", error);
        }
    }

    useEffect(()=>{
        fetchCities();
    },[]);

    useEffect(()=>{
        fetchTownShips();
    },[formData.city]);

    const handleChange = (e) => {
        const {name,value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name] : value,

            ...(name === "city" ? {township: ""} : {})
        }))
    }

    const handleForm = (e) => {
        e.preventDefault();
        setOpenForm(!openForm);
    }

    const backToDashboard = (e) =>{
        e.preventDefault();
        navigate("/admin");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting form data", formData);
    }
    return (
        <section className="relative min-h-screen w-screen bg-purple-300 flex flex-col justify-center">
            <button onClick={backToDashboard} className="fixed top-4 left-4 text-lg font-bold  w-10 h-10 bg-white rounded-full flex items-center justify-center"><IoArrowBackSharp className="text-xl text-purple-600 font-bold" /></button>
            <div className="mt-10 bg-slate-50 rounded-lg self-center shadow-lg p-4 w-64 min-w-100 max-w-150 flex flex-col">
                <div className="p-4 flex justify-between items-center">
                    <h4 className="text-slate-800 text-lg font-semibold">Create User</h4>
                    <button className="bg-purple-300 rounded-full p-1" onClick={handleForm}>
                        {
                            openForm ? <RiCloseLine className="text-xl font-bold text-white"/> : <IoIosPersonAdd className="text-xl font-bold text-white"/>
                        }
                        
                        
                    </button>
                </div>
                {
                    openForm && (

                    
                
                <form onSubmit={handleSubmit} className="myForm p-4 flex flex-col items-start justify-center gap-6 ">
                    <div className="w-full">
                        <label className="block mb-1 text-slate-700 text-sm font-semibold" >User Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter user name"
                        className="w-full bg-white px-4 py-2 rounded-sm shadow-sm text-slate-600 text-sm hover:outline-1 outline-purple-600"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-slate-700 text-sm font-semibold" >Phone Number</label>
                        <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange} 
                        placeholder="Enter phone number"
                        className="w-full bg-white px-4 py-2 rounded-sm shadow-sm text-slate-600 text-sm hover:outline-1 outline-purple-600"
                        />
                    </div>
                    <div className="w-full">
                        <label  className="block mb-1 text-slate-700 text-sm font-semibold">Email</label>
                        <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full bg-white px-4 py-2 rounded-sm shadow-sm text-slate-600 text-sm hover:outline-1 outline-purple-600"

                        />
                    </div>
                   <div className="w-full flex justify-center items-center gap-2">
                     <div className="w-1/2">
                        <label htmlFor="city"  className="block mb-1 text-slate-700 text-sm font-semibold">City</label>
                        <select 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Select City"
                        className="w-full bg-white px-4 py-2 rounded-sm shadow-sm text-slate-600 text-sm hover:outline-1 outline-purple-600"
                        >
                            <option value="">Select City</option>
                            {
                                cities.map((city)=>(
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))
                            }
                        </select>
                    </div>
                     <div className="w-1/2">
                        <label htmlFor="township"  className="block mb-1 text-slate-700 text-sm font-semibold">TownShip</label>
                        <select 
                        id="township" 
                        name="township"
                        value={formData.township}
                        onChange={handleChange}
                        disabled={!formData.city}
                        placeholder="Select City"
                        className="w-full bg-white px-4 py-2 rounded-sm shadow-sm text-slate-600 text-sm hover:outline-1 outline-purple-600"

                        >
                            <option value="">{ !formData.city ? "Select city first" : "Select Township"}</option>
                            {townships.map((township)=>(
                                <option key={township.id} value={township.id}>{township.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                    {/* cancel && create */}
                    <div className="w-full flex justify-end items-center gap-1.5">
                        <button type="button" onClick={backToDashboard} className="px-8 py-2 rounded-lg text-sm font-semibold bg-white text-slate-800 outline-2 outline-red-500 hover:outline-none hover:bg-red-500 hover:text-white">Cancel</button>
                        <button type="submit" className="px-8 py-2  rounded-lg text-sm font-semibold bg-blue-500 text-white hover:outline-none hover:bg-purple-700 hover:text-white">Create</button>
                    </div>
                    
                </form>

                    )
            }
            </div>

        </section>
    )
}

export default CreateUser;
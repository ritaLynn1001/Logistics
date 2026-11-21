import { useState } from "react";
import {drivers as initialDrivers} from "../../../data/userData.js";
import { usePagination } from "../../../utils/usePagination.jsx";
 
import Header from "../Header.jsx";
import PaginationFooter from "../../../utils/PaginationFooter.jsx";
const DriverList=() => {
    const [drivers, setDrivers] = useState(initialDrivers);
    const { currentPage, setCurrentPage, startIndex, lastIndex, totalPages } = usePagination(drivers.length, 5);
    const driverCountPerPage = drivers.slice(startIndex, lastIndex);

    function changeStatusColor({status}){
        return `${status === "active" ? "text-green-500 bg-green-100" : "text-yellow-600 bg-yellow-100"} font-semibold px-2 py-1 rounded-md `;
    }
    return (
        <div>
           <Header title = "Manage Drivers" role="Add New Driver" createUrl="/createDriver" />
            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
                    <th className="p-4">Driver Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Township</th>
                    <th className="p-4">City</th>
                    <th className="p-4"></th>
                    <th className="p-4">Vehicle Number</th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    {driverCountPerPage.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">{driver.name}</td>
                        <td className="p-4 font-medium text-gray-900">{driver.email}</td>
                        <td className="p-4 font-medium text-gray-900">{driver.phoneNumber}</td>
                        <td className="p-4 font-medium text-gray-900">{driver.townShip}</td>
                        <td className="p-4 font-medium text-gray-900">{driver.city}</td>
                        <td className="p-4 font-medium">
                            <p className={changeStatusColor({ status: driver.status })}>
                                {driver.status}
                            </p>
                        </td>
                        <td className="p-4 font-medium text-gray-900">{driver.vehicleNumber}</td>   
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
             
            <PaginationFooter 
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                lastIndex={lastIndex}
                totalItems={drivers.length}
                onPageChange={setCurrentPage}
            />    
        </div>
    )
}

export default DriverList;
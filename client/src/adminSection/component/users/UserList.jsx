import { useState } from "react";
import { users as initialUsers } from "../../../data/userData";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../../utils/usePagination"; 
import PaginationFooter from "../../../utils/PaginationFooter"; 
import Header from "../Header";

const UserList = () => {
  const [users,setUsers] = useState(initialUsers);
  
  const { currentPage, setCurrentPage, startIndex, lastIndex, totalPages } = usePagination(users.length, 5);
  const userCountPerPage = users.slice(startIndex, lastIndex);

 

  return (
    <div>
      <Header title = "User List" role = "Add New User" createUrl="/createUser" />

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {userCountPerPage.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                <td className="p-4 font-medium text-gray-900">{user.phonenumber}</td>
                <td className="p-4 font-medium text-gray-900">{user.email}</td>
                <td className="p-4 font-medium text-gray-900">{user.address}</td>
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
        totalItems={users.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserList;
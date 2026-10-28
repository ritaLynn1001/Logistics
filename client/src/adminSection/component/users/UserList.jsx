import { useState } from "react";
import { users as initialUsers } from "../../../data/userData";

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  //number of items to display per page
  const itemsPerPage = 5;

  // Pagination Math Calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;
  const userCountPerPage = users.slice(startIndex, lastIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  //const indexOfLastItem = currentPage * itemsPerPage;
  //const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  

  // Example function to add a new user dynamically
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(), // Generate a unique ID
      name: "New User",
      email: "newuser@example.com",
      phone: "+95 900000000",
      address: "New address"
    };

    // Update state: adds the new user to the top (or bottom) of the list
    setUsers([newUser, ...users]);
  };

  return (
    <div>
      {/* will update handleAddUser later */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User List</h2>
        </div>
        <button 
          onClick={handleAddUser}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Add New User
        </button>
      </div>

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
                <td className="p-4  font-medium text-gray-900">{user.phonenumber}</td>
                <td className="p-4 font-medium text-gray-900">{user.email}</td>
                <td className="p-4 font-medium text-gray-900">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Smart Pagination Footer */}
      <div className="flex items-center justify-between mt-6 bg-white px-4 py-3 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-700">{users.length > 0 ? startIndex + 1 : 0}</span> to{" "}
          <span className="font-medium text-gray-700">
            {Math.min( lastIndex, users.length)}
          </span>{" "}
          of <span className="font-medium text-gray-700">{users.length}</span> results
        </p>

        <div className="flex items-center gap-1.5">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Smart Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
            console.log(currentPage);
            const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;

            if (isFirstOrLast || isNearCurrent) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNumber
                      ? "bg-sky-600 text-white"
                      : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
            }

            return null;
          })}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
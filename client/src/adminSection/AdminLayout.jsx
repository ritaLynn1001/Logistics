import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-gray-100">
      <Sidebar />

      <div className="flex flex-col min-w-0"> 
        <Topbar />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
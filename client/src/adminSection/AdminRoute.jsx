import {Routes,Route} from "react-router-dom";
import UserList from "./component/users/UserList";

import List from "./component/package/List";
import Create from "./component/package/Create";
import Manage from "./component/package/Manage";
import Settings from "./component/Setting";    

import AdminLayout from "./AdminLayout";
import DriverList from "./component/drivers/DriverList";
   

const AdminRoute = () => {
    return (
        <Routes>
            <Route element={<AdminLayout/>} >
                <Route index element={<UserList />} />
                <Route path="users" element={<UserList />} />
                <Route path="drivers" element={<DriverList/>} />
                <Route path="package">
                    <Route index element={<List/>} />
                    <Route path="create" element={<Create />} />
                    <Route path="list" element={<List/>} />
                    <Route path="manage" element={<Manage />} />
                </Route>
                <Route path="settings" element={<Settings />} /> 
            </Route>
        </Routes>
    )
};

export default AdminRoute;


import {Routes,Route} from "react-router-dom";
import UserList from "./component/UserList";

const AdminRoute = () => {
    return (
        <Routes element={<AdminLayout />}>
            <Route index element={<UserList />} />
            <Route path="drivers" element={<DriverList/>} />
            <Route path="package">
                <Route index element={<List/>} />
                <Route path="create" element={<Create />} />
                <Route path="list" element={<List/>} />
                <Route path="manage" element={<Manage />} />
            </Route>
            <Route path="settings" element={<Settings />} /> 
        </Routes>
    )
};

export default AdminRoute;


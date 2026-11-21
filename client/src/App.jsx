import AdminRoute from './adminSection/AdminRoute'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'

function App() {
  
  return (
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createUser" element={<CreateUser/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoute />} />

       </Routes>
  )
}

export default App

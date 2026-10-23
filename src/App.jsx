import AdminLayout from './adminSection/AdminLayout'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />

       </Routes>
      
    </BrowserRouter>
    
  )
}

export default App

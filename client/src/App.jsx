import AdminRoute from './adminSection/AdminRoute'
import './App.css'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />

       </Routes>
      
    </BrowserRouter>
    
  )
}

export default App

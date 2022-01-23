import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import BusinessRegister from './Components/BusinessRegister';
import VendorHome from './Components/VendorHome';
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/businessRegister" element={<BusinessRegister/>} />
        <Route path="/vendorHome" element={<VendorHome/>} />
      </Routes>

    </Router>
  );
}

export default App;

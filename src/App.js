import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import BusinessRegister from './Components/BusinessRegister';
import VendorHome from './Components/VendorHome';
import AdminHome from './Components/AdminHome';
import CustomerHome from './Components/CustomerHome';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/businessRegister" element={<BusinessRegister/>} />
        <Route path="/vendorHome" element={<VendorHome/>} />
        <Route path="/adminHome" element={<AdminHome/>} />
        <Route path="/customerHome" element={<CustomerHome/>} />
      </Routes>

    </Router>
  );
}

export default App;

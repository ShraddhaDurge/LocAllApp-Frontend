import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import BusinessRegister from './Components/BusinessRegister';
import VendorHome from './Components/VendorHome';
import AdminHome from './Components/AdminHome';
import CustomerHome from './Components/CustomerHome';
import InventoryManagement from './Components/InventoryManagement';
import OrderManagement from './Components/OrderManagement';
import VendorReports from './Components/VendorReports';
import VendorVerification from './Components/VendorVerification';
import DisplayImage from './Components/DisplayImage';
import CustomerProfile from './Components/CustomerProfile';

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
        <Route path="/inventoryManagement" element={<InventoryManagement/>} />
        <Route path="/orderManagement" element={<OrderManagement/>} />
        <Route path="/vendorReports" element={<VendorReports/>} />
        <Route path="/vendorVerification" element={<VendorVerification/>} />
        <Route path="/displayImage" element={<DisplayImage/>} />
        <Route path="/customerProfile" element={<CustomerProfile/>} />
        </Routes>

    </Router>
  );
}

export default App;

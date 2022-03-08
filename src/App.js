import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login&Register/Login';
import Register from './Components/Login&Register/Register';
import BusinessRegister from './Components/Login&Register/BusinessRegister';
import VendorHome from './Components/VendorModules/VendorHome';
import AdminHome from './Components/AdminModules/AdminHome';
import CustomerHome from './Components/CustomerModules/CustomerHome';
import InventoryManagement from './Components/VendorModules/InventoryManagement';
import OrderManagement from './Components/VendorModules/OrderManagement';
import VendorReports from './Components/VendorModules/VendorReports';
import VendorVerification from './Components/AdminModules/VendorVerification';
import DisplayImage from './Components/AdminModules/DisplayImage';
import CustomerProfile from './Components/CustomerModules/CustomerProfile';
import VendorDisplayProduct from './Components/VendorModules/VendorDisplayProduct';
import ProductDescription from './Components/CustomerModules/ProductDescription';
import ShoppingBasket from './Components/CustomerModules/ShoppingBasket';

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
        <Route path="/vendorDisplayProduct" element={<VendorDisplayProduct/>} />
        <Route path="/productDescription" element={<ProductDescription/>} />
       <Route path="/shoppingBasket" element={<ShoppingBasket/>} />
      </Routes>

    </Router>
  );
}

export default App;

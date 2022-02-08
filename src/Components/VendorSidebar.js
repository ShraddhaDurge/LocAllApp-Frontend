import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import logo from './logo1.png';


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./VendorSidebar.css";


const VendorSidebar = () => {
//    const [anchorEl, setAnchorEl] = React.useState(null);
//    const open = Boolean(anchorEl);

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    let navigate = useNavigate();
    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleInventory = () => {
//         setAnchorEl(null);

          navigate('/inventoryManagement', { replace: true })
      };

  const handleOrders = () => {
//            setAnchorEl(null);
            navigate('/orderManagement', { replace: true })
        };
  const handleReports = () => {
//            setAnchorEl(null);
            navigate('/vendorReports', { replace: true })
        };

const handleHome = () => {
//            setAnchorEl(null);
            navigate('/vendorHome', { replace: true })
        };
  const handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
 const handleLogout= () => {
//            setAnchorEl(null);
            navigate('/', { replace: true })
        };
  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? <img src={logo} alt="logo" height="60" width="270" align="center" /> : <img src={logo} alt="logo" height="60" width="270" align="center" />}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" >
              <MenuItem active={true} icon={<FiHome />} onClick={handleHome} > Home </MenuItem>
              <MenuItem icon={<FaList />} onClick={handleInventory} >Inventory Management </MenuItem>
              <MenuItem icon={<FaRegHeart />} onClick={handleOrders}>Order Management</MenuItem>
              <MenuItem  icon={<RiPencilLine />} onClick={handleReports}>Reports & Analysis</MenuItem>
              </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default VendorSidebar;
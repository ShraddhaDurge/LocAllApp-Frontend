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
import logo from '../Images/logo1.png';


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
//import "./CustomerSidebar.css";


const CustomerSidebar = () => {

    const [style, setStyle] = useState("header");

    let navigate = useNavigate();


  const handleWishlist = () => {
//         setAnchorEl(null);

//          navigate('/inventoryManagement', { replace: true })
      };

  const handlePastOrders = () => {
//            setAnchorEl(null);
//            navigate('/orderManagement', { replace: true })
        };

const handleProfile = () => {
//            setAnchorEl(null);
            navigate('/customerProfile', { replace: true })
        };
  const handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
      setStyle("anchor");
    };
 const handleLogout= () => {
//            setAnchorEl(null);
            navigate('/', { replace: true })
        };
  return (
    <>
      <div id="header">
        <ProSidebar>
          <SidebarContent>
            <Menu iconShape="square" >
              <MenuItem active={true} icon={<FiHome />} onClick={handleProfile} > Profile </MenuItem>
              <MenuItem icon={<FaList />} onClick={handlePastOrders} > Past Orders </MenuItem>
              <MenuItem icon={<FaRegHeart />} onClick={handleWishlist}> Wishlist</MenuItem>
              </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default CustomerSidebar;
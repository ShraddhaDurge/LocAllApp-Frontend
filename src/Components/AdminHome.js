import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome(props) {
  // handle click event of logout button
  let navigate = useNavigate();
  const handleLogout = () => {
//    props.history.push('/');
    navigate('/', { replace: true })
  }
  const vendorVeri = () => {
    navigate('/vendorverification', {replace: true})
  }

  return (
    <div>
      <h1>Welcome Admin!</h1><br /><br />
      <input type="button" onClick={vendorVeri} value="Vendor Verification" />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default AdminHome;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VendorHome(props) {
  // handle click event of logout button
  let navigate = useNavigate();
  const handleLogout = () => {
//    props.history.push('/');
    navigate('/', { replace: true })
  }

  return (
    <div>
      Welcome Vendor!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default VendorHome;
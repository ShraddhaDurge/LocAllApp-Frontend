import React from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerHome(props) {
  // handle click event of logout button
  let navigate = useNavigate();
  const handleLogout = () => {
//    props.history.push('/');
    navigate('/', { replace: true })
  }

  return (
    <div>
      <h1>Welcome Customer!</h1><br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default CustomerHome;
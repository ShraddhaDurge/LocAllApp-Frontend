import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/logo1.png';
import Homebar from "./Homebar";

const CustomerHome=()=>{

    let navigate = useNavigate();

  const handleLogout = () => {
      navigate('/', {replace: true})
    };

    const customerProfile = () => {
         navigate('/customerProfile', {replace: true})
      };


    return(

        <Grid>
        <Homebar />
            <Grid align='center'>
                <Typography variant='h5' color="textSecondary" align="center" >Customer Homepage</Typography>
            </Grid>
    </Grid>
)

}

export default CustomerHome;

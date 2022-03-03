import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/logo1.png';

const useStyles = makeStyles((theme) => ({
  gridItem: {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'},
  grid: { margin: 5 }
}));
const AdminHome=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin: 'auto' }
    const gridStyle={backgroundColor: '#E3F2FD',height:'96vh', padding:'20px 0px 0px 0px'}

    let navigate = useNavigate();

  const verifyVendors = () => {
    navigate('/vendorVerification', {replace: true})
  };
  const handleLogout = () => {
      navigate('/', {replace: true})
    };


    return(

        <Grid>

        <Grid style={gridStyle}>


        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>
                 <img src={logo} alt="logo" height="60" width="270" align="center" />
             </Grid>
             <Grid align='center' style={{padding:"5px 0px"}}>

                <Typography variant='h5' color="textSecondary" align="center">Admin Homepage</Typography>
            </Grid>
            <br/>

            <Grid container spacing={1} style={{margin: '20px'}}>

                      <Grid item xs={4} style={{margin:'10px 10px 10px 90px'}} >
                        <Paper style={{margin: '20px', backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center"onClick={verifyVendors}  style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Vendor Verification
                          </Typography></Paper>

                      </Grid>
                      <Grid item xs={4} style={{margin:'10px 10px 10px 30px'}}>
                        <Paper style={{margin: '20px', backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Support and feedback
                          </Typography></Paper>
                      </Grid>
                      <Grid item xs={3} style={{margin:'130px 0px 0px 280px'}}>
                          <Paper style={{ backgroundColor:'#81C784', height:50}}>
                            <Typography gutterBottom variant="body1" color="Black" align="center" onClick={handleLogout} style={{ cursor: 'pointer', padding:'10px 10px' }}>
                              Logout
                            </Typography></Paper>
                        </Grid>
                      </Grid>
        </Paper>

    </Grid>
    </Grid>
)

}

export default AdminHome;

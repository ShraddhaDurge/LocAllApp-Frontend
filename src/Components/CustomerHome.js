import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'},
  grid: { margin: 5 }
}));
const CustomerHome=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin: 'auto' }
    const gridStyle={backgroundColor: '#E3F2FD',height:'96vh', padding:'20px 0px 0px 0px'}

    let navigate = useNavigate();

  const handleLogout = () => {
      navigate('/', {replace: true})
    };


    return(

        <Grid>

        <Grid style={gridStyle}>


        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>

                <Typography variant='h5' color="textSecondary" align="center">Customer Homepage</Typography>
            </Grid>
            <br/>

            <Grid container spacing={1} style={{margin: '20px'}}>


                      <Grid item xs={3} style={{margin:'130px 10px 10px 280px'}}>
                          <Paper style={{margin: '20px', backgroundColor:'#81C784', height:50}}>
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

export default CustomerHome;

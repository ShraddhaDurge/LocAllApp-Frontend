import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';

function DisplayImage(){
    const paperStyle={padding :'20px', width:'150vh', margin:"20px", align: 'center', position:'relative'}
    const gridStyle={backgroundColor: '#E3F2FD', postion:'fixed', height:'100vh', overflow:'auto', margin:"0px"}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const linkstyle={color:'#FFF', hover: "#000", textDecoration: 'none', cursor: 'pointer', padding:'10px 10px' }
    const imageInfo=JSON.parse(localStorage.getItem("image info"))
    localStorage.removeItem("image info")


    if(imageInfo==null){
        return(
        <html style={{height:'100%'}}>
        <body style={{height:'100vh'}}>
        <center>
        <Grid style={gridStyle}>
        <center>
        <Paper elevation={20} style={paperStyle}>
        <Grid align='center' style={{padding:"20% 30px"}}>
            <center>
                <br/><br/>
                <Typography variant='h6' color="textSecondary" align="center">Cannot Access Image without clicking on License</Typography>
            <br/>
            <Button type='submit' variant="contained" style={btnstyle} fullWidth>
            <Link to="/vendorVerification" style={linkstyle}>Go Back</Link>
            </Button>
            </center>
            <br/>
            </Grid >

        </Paper>
        </center>
        </Grid>
        </center>
        </body>
        </html>
        )
    }

    else
    {
        return(
        <html style={{height:'100%'}}>
        <body style={{height:'100vh'}}>
        <center>
        <Grid style={gridStyle}>
        <center>
        <Paper elevation={20} style={paperStyle}>
        <Grid align='center' style={{padding:"10px 10px"}}>
            <center>

            <img src={`data:image/png;base64,${imageInfo}`}></img>
            <br/>

            <Button type='submit' variant="contained" style={btnstyle} fullWidth>
            <Link to="/vendorVerification" style={linkstyle}>Go Back</Link>
            </Button>
            </center>
            <br/>
            </Grid >

        </Paper>
        </center>
        </Grid>
        </center>
        </body>
        </html>
        )
    }

}
export default DisplayImage;
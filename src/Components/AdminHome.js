//import React from 'react';
//import { useNavigate } from 'react-router-dom';
//
//function AdminHome(props) {
//  // handle click event of logout button
//  let navigate = useNavigate();
//  const handleLogout = () => {
////    props.history.push('/');
//    navigate('/', { replace: true })
//  }
//  const vendorVeri = () => {
//    navigate('/vendorverification', {replace: true})
//  }
//
//  return (
//    <div>
//      <h1>Welcome Admin!</h1><br /><br />
//      <input type="button" onClick={vendorVeri} value="Vendor Verification" />
//      <input type="button" onClick={handleLogout} value="Logout" />
//    </div>
//  );
//}
//
//export default AdminHome;

import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snack from './Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const useStyles = makeStyles((theme) => ({
  gridItem: {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'},
  grid: { margin: 5 }
}));
const AdminHome=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin: 'auto' }
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}
    const gridItem= {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'}
    const crudButtonStyle= { margin: '20px' }
    const root= {marginLeft: '3px'}

    let navigate = useNavigate();

  const verifyVendors = () => {
    navigate('/vendorverification', {replace: true})
  };
  const handleLogout = () => {
      navigate('/', {replace: true})
    };


    return(

        <Grid>

        <Grid style={gridStyle}>


        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>

                <Typography variant='h6' color="textSecondary" align="center">Admin Homepage</Typography>
            </Grid>
            <br/>

            <Grid container spacing={1} style={crudButtonStyle}>

                      <Grid item xs={4} style={{margin:'10px 10px 10px 90px'}} >
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center"onClick={verifyVendors}  style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Vendor Verification
                          </Typography></Paper>

                      </Grid>
                      <Grid item xs={4} style={{margin:'10px 10px 10px 30px'}}>
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Support and feedback
                          </Typography></Paper>
                      </Grid>
                      <Grid item xs={3} style={{margin:'130px 10px 10px 280px'}}>
                          <Paper style={crudButtonStyle} style={{backgroundColor:'#81C784', height:50}}>
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

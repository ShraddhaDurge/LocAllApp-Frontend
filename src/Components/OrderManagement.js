import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";

const OrderManagement=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin:"0px 360px"}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}

    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))
//    const classes=useStyles();

    const initialValues = {
        username: myInfo.username,
        phoneno: myInfo.phoneno,
        email: myInfo.email,
        businessName: businessInfo.businessName,
        businessCategory: businessInfo.businessCategory,
        address: businessInfo.address,
        pincodes: businessInfo.pincodes,
        gstin: businessInfo.gstin,
        businessStatus: businessInfo.status
    }

//    const [myprofile, setMyprofile] = useReducer(businessProfile, initialValues);
//    const { businessName,businessCategory,address,pincodes,gstin} = myprofile;
    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);

    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
//        const newBusiness = {
//            businessName,
//            businessCategory,
//            address,
//            pincodes,
//            gstin
//        };

//        console.log(newBusiness)
//        axios.post("/account/saveBusinessProfile", newBusiness)
//        .then((response) => {
//            var res = response.status;
//
//            console.log(response.status)
//            if (res === 200) {
//                    setSuccess(true);
//                    setMesg("Business Profile Updated!");
//                    setOpen(true);
//            }
//
//        })
//        .catch((error) => {
//            if (error.response.status === 400) {
//                console.log(error.response.data.message);
//                // alert("Error ")
//                    setOpen(true);
//                    setMesg(error.response.data.message);
//
//
//            }
//            else{
//                // alert("Something went wrong")
//                   setOpen(true);
//                    setMesg("Something went wrong");}
//            console.log(error)
//        });

    }
    const handleClose = (event, reason) => {
      if(success)
      {
          setOpen(false);
      }
      else{
          setOpen(false);

      }
  };
    const info2=JSON.parse(localStorage.getItem("businessInfo"))
    return(
    <Grid>
    <VendorSidebar/>
        <Grid style={gridStyle}>

        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>

                <Typography variant='h6' color="textSecondary" align="center">Order Management</Typography>
            </Grid>
            <br/>
           {/* <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                    <div class="container">
                   <Grid container spacing={2} className={classes.businessProf}>
                        <Grid item xs={6}>
                                <Field as={TextField} label='Vendor Name' name="username" disabled value={info2.user.username}  required/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} label='Phone Number' name="phoneno" disabled value={info2.user.phoneno}  required />
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} label='Email Id' name="email" disabled value={info2.user.email} required/>
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} label='Registration Status' name="status" disabled value={info2.status} required />
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} label='Business Name' name="businessName" required  value={info2.businessName}
                            error={props.errors.businessName && props.touched.businessName} onInput={props.handleChange}

                            onChange={e=>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'businessName',
                                  payload: e.currentTarget.value,
                                })

                              }
                              helperText={<ErrorMessage name="businessName" />}/>
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField}  label='Business Category'  name="businessCategory" required value={info2.businessCategory}
                            error={props.errors.businessCategory && props.touched.businessCategory}  onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'businessCategory',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="businessCategory" />}/>
                        </Grid>


                        <Grid item xs={12}>
                            <Field as={TextField} label='Address' name="address" required fullWidth value={address}
                            error={props.errors.address && props.touched.address} required   onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'address',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="address" />}/>
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} label='Serviceable Pincodes' name="pincodes" required value= {info2.pincodes}
                            error={props.errors.pincodes && props.touched.pincodes}   onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'pincodes',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="pincodes" />}/>
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} label='gstin' name="businessName" required  value={info2.gstin}
                            error={props.errors.gstin && props.touched.gstin} onInput={props.handleChange} disabled/>
                        </Grid>

                        </Grid >
                        </div>
                        <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                            style={btnstyle} disabled={props.isSubmitting}
                            fullWidth>{props.isSubmitting ? "Loading" : "Submit"}</Button>

                    </Form>
                )}
            </Formik> */}

        </Paper>
        <Snackbar
//        className={classes.root}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={mesg}
        action={
          <Fragment>

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
        />

        {/*<Footer/>*/}
    </Grid>
    </Grid>
)

}

export default OrderManagement;

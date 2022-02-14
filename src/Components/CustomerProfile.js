import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography,MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { ArrowBack, Home, Menu } from '@material-ui/icons';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Homebar from "./Homebar";

function customerProfile(myprofile,action) {
    const customerProfile=JSON.parse(localStorage.getItem("customerProfile"))
    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    switch (action.type) {
        case 'field': {
            return {
              ...myprofile,
              [action.fieldName]: action.payload,
            };
          }

      case 'success': {
        return {
        username: myInfo.username,
        email: myInfo.email,
        phoneno: myInfo.phoneno,
        billingAddress: customerProfile.billingAddress,
        shippingAddress:customerProfile.shippingAddress,
        shippingPincode:customerProfile.shippingPincode,
        billingPincode:customerProfile.billingPincode
        };
      }
      case 'error': {
        return {
          ...myprofile,

        };
      }

      default:
        return myprofile;
    }
  }
  const useStyles=makeStyles(theme=>({
  root:{
    top:theme.spacing(9)
  }
}
  ))
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
 const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
       },
     },
}
const CustomerProfile=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, padding:'50px' }
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD'}

    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    const classes=useStyles();

    const initialValues = {
        username: myInfo.username,
        phoneno: myInfo.phoneno,
        email: myInfo.email,
        billingAddress:'',
        shippingAddress:'',
        shippingPincode:'',
        billingPincode:''
    }

    const [myprofile, setMyprofile] = useReducer(customerProfile, initialValues);
    const {username,phoneno,email,billingAddress,shippingAddress,shippingPincode,billingPincode} = myprofile;
     const [pincodeList, setPincodeList] = useState([])
//     const [pincodeStateList, setPincodeStateList] = useState([])

    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const userid = myInfo.id;
    useEffect(()=>{

            axios.get(`http://localhost:8088/customer/getCustomerProfile/${userid}`)
            .then(res=>{
                console.log(res)
               localStorage.setItem('customerProfile',JSON.stringify(res.data))
               setMyprofile({ type: 'success' })
            })
            .catch(err=>{
                console.log(err)
                setMyprofile({ type: 'error' })

            })
        },[userid])

    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const userProfile = {
            billingAddress,
            shippingAddress,
            shippingPincode,
            billingPincode
        };

        axios.post(`http://localhost:8088/customer/updateCustomerProfile/${userid}`, userProfile)
        .then((response) => {
            var res = response.status;

            console.log(response.status)
            if (res === 200) {
                    setSuccess(true);
                    setMesg("Customer Profile Updated!");
                    setOpen(true);
            }

        })
        .catch((error) => {
            if (error.response.status === 400) {
                console.log(error.response.data.message);
                // alert("Error ")
                    setOpen(true);
                    setMesg(error.response.data.message);


            }
            else{
                // alert("Something went wrong")
                   setOpen(true);
                   setMesg("Something went wrong");}
                   console.log(error)
//                   window.location.reload()
        });

    }

    const handleClose = (event, reason) => {
          setOpen(false);
           window.location.reload()
  };

    const viewHomepage = () => {
         navigate('/customerHome', {replace: true})
      };

      const viewPastOrders = () => {
//               navigate('/pastOrders', {replace: true})
            };


    return(
        <Grid>
        <Homebar />
        <Grid style={gridStyle}>
        <center>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' >

                <Typography variant='h5' color="textSecondary" align="center">Customer Profile</Typography>
            </Grid>
            <br/>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                    <div class="container">
                   <Grid container spacing={2} className={classes.businessProf}>
                        <Grid item xs={4}>
                                <Field as={TextField} label='Username' name="username" disabled value={myInfo.username}  required/>
                        </Grid>
                        <Grid item xs={4}>
                            <Field as={TextField} label='Phone Number' name="phoneno" disabled value={myInfo.phoneno}  required />
                        </Grid>

                        <Grid item xs={4}>
                            <Field as={TextField} label='Email Id' name="email" disabled value={myInfo.email} required/>
                        </Grid>

                        <Grid item xs={8} style={{paddingLeft:'35px'}}>
                            <Field as={TextField} label='Billing Address' name="billingAddress" fullWidth required value={billingAddress}
                            error={props.errors.billingAddress && props.touched.billingAddress} onInput={props.handleChange}

                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'billingAddress',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="billingAddress" />}/>
                        </Grid>

                        <Grid item xs={3} style={{paddingLeft:'35px'}}>
                            <Field as={TextField} label='Billing Pincode' name="billingPincode" fullWidth required value={billingPincode}
                            error={props.errors.billingPincode && props.touched.billingPincode} onInput={props.handleChange}

                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'billingPincode',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="billingPincode" />}/>

                        </Grid>

                        <Grid item xs={8} style={{paddingLeft:'35px'}}>
                            <Field as={TextField} label='Shipping Address' name="shippingAddress" fullWidth required value={shippingAddress}
                            error={props.errors.shippingAddress && props.touched.shippingAddress} onInput={props.handleChange}

                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'shippingAddress',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="shippingAddress" />}/>

                        </Grid>

                        <Grid item xs={3} style={{paddingLeft:'35px'}}>
                            <Field as={TextField} label='Shipping Pincode' name="shippingPincode" fullWidth required value={shippingPincode}
                            error={props.errors.shippingPincode && props.touched.shippingPincode} onInput={props.handleChange}

                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'shippingPincode',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="shippingPincode" />}/>

                        </Grid>



                        </Grid >
                        </div>
                        <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                            style={btnstyle} disabled={props.isSubmitting}
                            fullWidth>{props.isSubmitting ? "Loading" : "Submit"}</Button>
                    </Form>
                )}
            </Formik>

        </Paper>
        </center>
        <Snackbar
        className={classes.root}
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

export default CustomerProfile;
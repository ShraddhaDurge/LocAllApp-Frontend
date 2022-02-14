import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";


function businessProfile(myprofile,action) {
    const businessInfo=JSON.parse(localStorage.getItem("myBusinessProfile"))
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
        businessName: businessInfo.businessName,
        businessCategory: businessInfo.businessCategory,
        address: businessInfo.address,
        pincodes: businessInfo.pincodes,
        gstin: businessInfo.gstin,
        businessStatus:businessInfo.status
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

const VendorHome=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin:"0px 360px"}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}

    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))
    const classes=useStyles();
    const pins = {pincode:''};

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

    const [myprofile, setMyprofile] = useReducer(businessProfile, initialValues);
    const { businessName,businessCategory,address,pincodes,gstin} = myprofile;
    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const userid = myInfo.id
    useEffect(()=>{

            axios.get(`http://localhost:8088/vendor/getBusiness/${userid}`)
            .then(res=>{
                console.log(res)
                const pro=res.data
               localStorage.setItem('myBusinessProfile',JSON.stringify(pro))
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
        const business = {
            businessName,
            businessCategory,
            address,
            pincodes:pincodes
        };

        console.log(business)

        axios.post(`http://localhost:8088/vendor/updateBusiness/${userid}`, business)
        .then((response) => {
            var res = response.status;

            console.log(response.status)
            if (res === 200) {
                    setSuccess(true);
                    setMesg("Business Profile Updated!");
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
    const info2=JSON.parse(localStorage.getItem("businessInfo"))


    return(
        <Grid>
        <VendorSidebar/>
        <Grid style={gridStyle}>

        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>

                <Typography variant='h5' color="textSecondary" align="center">Vendor Homepage</Typography>
            </Grid>
            <br/>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                            <Field as={TextField} label='Business Name' name="businessName" required  value={businessName}
                            error={props.errors.businessName && props.touched.businessName} onInput={props.handleChange}
                            disabled={info2.status === "Pending" ? true : false}
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
                            <Field as={TextField}  label='Business Category'  name="businessCategory" required value={businessCategory}
                            error={props.errors.businessCategory && props.touched.businessCategory}  onInput={props.handleChange}
                            disabled={info2.status === "Pending" ? true : false}
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
                            error={props.errors.address && props.touched.address} onInput={props.handleChange}
                            disabled={info2.status === "Pending" ? true : false}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'address',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="address" />}/>
                        </Grid>
                        {/*<Grid item xs={6}>
                                    Serviceable Pincodes:
                                    <br/>
                                    {info2.pincodes.map((pincode, i) => (
                                      <span key={i}>   {pincode.pincode}         </span>
                                    ))}
                                    <Button size="small" variant="contained" disabled={info2.status === "Pending" ? true : false} >Edit Pincodes </Button>
                        </Grid> */}

                      <FieldArray
                           name="Pincodes"
                           render={arrayHelpers => (
                             <div>
                               {info2.pincodes && info2.pincodes.length > 0 ? (
                                 info2.pincodes.map((pincode, index) => (
                                   <div key={index}>
                                     <Field as={TextField} label='Serviceable Pincodes' required name={`pincodes.${index}.pincode`}
                                     onInput={props.handleChange}
                                     onChange={(e) =>
                                           setMyprofile({
                                               type: 'field',
                                               fieldName: 'pincodes',
                                               payload: e.currentTarget.value,
                                             })
                                           }
                                           />
                                     <button
                                       type="button"
                                       onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                     >
                                       -
                                     </button>
                                     <button
                                       type="button"
                                       onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                     >
                                       +
                                     </button>
                                   </div>
                                 ))
                               ) : (
                                 <button type="button" onClick={() => arrayHelpers.push('')}>
                                   {/* show this when user has removed all friends from the list */}
                                   Add a Pincode
                                 </button>
                               )}

                             </div>
                           )}
                        />

                        <Grid item xs={6}>
                            <Field as={TextField} label='gstin' name="businessName" required  value={info2.gstin}
                            error={props.errors.gstin && props.touched.gstin} onInput={props.handleChange} disabled/>
                        </Grid>

                        </Grid >
                        </div>
                        <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                            style={btnstyle} disabled={props.isSubmitting} disabled={info2.status === "Pending" ? true : false}
                            fullWidth>{props.isSubmitting ? "Loading" : "Submit"}</Button>

                    </Form>
                )}
            </Formik>

        </Paper>
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

export default VendorHome;
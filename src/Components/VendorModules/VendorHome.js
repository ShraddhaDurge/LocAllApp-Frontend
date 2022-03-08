import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import Image from '../Images/2593164.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

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
    const paperStyle={width:800, height:520, marginLeft:"390px",overflowY: 'scroll', overflowX:'hidden', align: 'center', position: 'relative'}
    const btnstyle = { margin:'5px auto auto auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,padding :'20px 0px'}
    const pincodeButtons= {borderRadius: '20px',marginLeft: '5px',backgroundColor: "#199bf1",color: '#FFFFFF','&:hover': {backgroundColor: "#5858FA"}}

    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))
    const classes=useStyles();
    const emptyPins = {pincode:0,district:'', statename:''};

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
    const { businessName,businessCategory,address,pincodes} = myprofile;
    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const [editPincodes, setEditPincodes] = useState(false);
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
     const handleEditPincode = () => {
               setEditPincodes(true);
               info2.pincodes = [emptyPins];

       };
        const removePincode = (event) => {
            var array = [...info2.pincodes]; // make a separate copy of the array
              var index = array.indexOf(event.target.value)
              if (index !== -1) {
                array.splice(index, 1);
                this.setState({pincodes: array});
          }
        };
       const icons = {
         Verified: VerifiedIcon,
         Pending: PendingActionsIcon
       };

       const FieldIcon = ({ name }) => {
         const Icon = icons[name];
         return Icon ? (<Icon />) : null;
       };

    return(
        <Grid>
        <VendorSidebar/>
        <Grid style={gridStyle}>

        <Paper elevation={20} style={paperStyle} >
           {/* <Grid align='center' style={{padding:"30px 10px 10px 10px"}}>

                <Typography variant='h5' color="textSecondary" align="center">Vendor Homepage</Typography>
            </Grid>
            */}
            <Paper style={{backgroundImage: `url(${Image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height:120, widh:800, padding:"60px 0px 0px 90px", marginBottom:"20px"}}>
              <Typography gutterBottom variant="h5" fontFamily="Segoe UI" color="textPrimary">
                Hello @{info2.user.username}! <FieldIcon name={info2.status} />
              </Typography>
              <Typography gutterBottom color="textSecondary">
                  {info2.user.email}
                  <br />
                  +91{info2.user.phoneno}
              </Typography>
            </Paper>
            <Typography variant='h6' color="textSecondary" align="center">Business Profile</Typography>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                    <div class="container">
                   <Grid container spacing={2} align="center">
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


                        <Grid item xs={6}>
                            <Field as={TextField} label='Address' name="address" required value={address}
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
                        <Grid item xs={6}>
                            <Field as={TextField} label='gstin' name="gstin" required  value={info2.gstin}
                            error={props.errors.gstin && props.touched.gstin} onInput={props.handleChange} disabled/>
                        </Grid>
                        <Grid item xs={6} align="center" style={{marginLeft:"90px"}}>
                          <FieldArray name="pincodes">
                                {({ push, remove }) => (
                                  <Fragment>
                                    {info2.pincodes.map((pincode, index) => (
                                      <Grid container item key={index} >
                                            <Grid item xs={6}>
                                                  <Field as={TextField} size="small" label='Serviceable pincode' variant="outlined" required error={props.errors.pincode && props.touched.pincode}
                                                        value={pincode.pincode} onChange={props.handleChange} pattern="^[1-9][0-9]{5}$" helperText={<ErrorMessage name='pincode' />} name={`pincodes.${index}.pincode`}/>
                                              </Grid>
                                          <Grid item>
                                              <Button style={pincodeButtons} size="small" disabled={index===0} variant="contained" onClick={() => removePincode()}>
                                              -
                                              </Button>
                                          </Grid>
                                          <Grid item>
                                              <Button style={pincodeButtons} size="small" disabled={props.isSubmitting} variant="contained" onClick={() => push(emptyPins)}>
                                                +
                                              </Button>
                                            </Grid>
                                       </Grid>
                                    ))}

                              </Fragment>
                            )}
                          </FieldArray>
                        </Grid >
                        </Grid >
                        </div>
                        <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                            style={btnstyle} disabled={props.isSubmitting || info2.status === "Pending" ? true : false}
                            fullWidth>{props.isSubmitting ? "Loading" : "Edit"}</Button>

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
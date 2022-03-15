import { React, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, makeStyles, Box, Card, CardContent } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import background1 from '../Images/bg1.jpg';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import UploadGstCertificate from "./UploadGstCertificate";
import logo from '../Images/LocAll (8).png';

const BusinessRegister = () => {

    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const emptyPins = {pincode:0,district:'', statename:''};
    const [imgdialog, setImgdialog] = useState({ isOp: false });


    const initialValues = {
        businessName: '',
        businessCategory: '',
        address: '',
        pincodes: [emptyPins],
        gstin: '',
//        license: ''
    }


    let navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userid = userInfo.user.id;

    const onSubmit = (values, props) => {
        const business = {
            businessName: values.businessName,
            businessCategory: values.businessCategory,
            address: values.address,
            pincodes: values.pincodes,
            gstin: values.gstin,
//            license: values.license
        }



        console.log(business)


        axios.post(`http://localhost:8088/vendor/register/${userid}`, business)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    setSuccess(true);
                    localStorage.setItem('busiInfo', JSON.stringify(response.data.business));
                    setMesg(response.data.message);
                    setOpen(true);
                     setImgdialog({
                        isOp: true

                    })

                }

            })
            .catch((error) => {
                if (error.response.status === 400) {
                    console.log(error.response.data.message);
                    setOpen(true);
                    setMesg(error.response.data.message);
                    props.resetForm()
                }
                else {
                    setOpen(true);
                    setMesg("Something went wrong");
                    console.log(error)
                    props.resetForm()
                }
            });

    }
    const handleClose = (event, reason) => {
         setOpen(false);
    };

    const useStyles = makeStyles({
        card: {
            height: '425px',
            backgroundImage: `url(${background1})`,
            opacity: '120%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }
        , grid: {
            width: "650px",
            height: "420px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '10px' ,
            backgroundColor: '#f3f0ff'

        },
         divScroll: {
                    width: "640px",
                    height: "455px",
                    position: 'center',
                    borderRadius: '20px',
                    marginTop : '0px' ,
                    backgroundColor: '#f3f0ff',
                        overflowY: 'scroll',
                        }

        , box: {
            alignItems: 'center',
            justify: 'center',
            direction: 'column',
            borderRadius: '20px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)',
            position: 'relative',
            overflowY: 'scroll',
            borderSizing: 'border-box',
        }
        , buttonr: {
                      width: '115px',
                      borderRadius: '20px',
                      border: '1px solid #FFFFFF',
                      backgroundColor: "#ECE5E2",
                      color: '#199bf1',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      marginTop: '80px',
                      '&:hover': {
                          backgroundColor: "#9B8583 ",
                      }

        }
        , buttons: {
            borderRadius: '20px',
            border: '1px solid #2E2EFE',
            backgroundColor: "#199bf1",
            color: '#FFFFFF',
            letterSpacing: '1px',
            marginTop: '10px',
            '&:hover': {
                backgroundColor: "#5858FA",
            },
            width: '245px'

        },
        pincodeButtons: {
            borderRadius: '20px',
            marginLeft: '20px',
            backgroundColor: "#199bf1",
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: "#5858FA",
            }
        },
        textField: {
             [`& fieldset`]:{
                  borderRadius:100
                },
                marginTop:'5px'
         },
         gridStyle: {
             overflow: 'hidden'
         }
    });

    const icons = {
          bname: StoreIcon,
          bcategory: CategoryIcon,
          address: HomeIcon,
          pincode: PinDropIcon,
          gstin: DocumentScannerIcon
        };

    const FieldIcon = ({ name }) => {
      const Icon = icons[name];
      return Icon ? (<Icon />) : null;
    };

    const validationSchema = Yup.object().shape({
        businessName: Yup.string()
            .required("Required"),
    pincodes: Yup.array()
        .of(
          Yup.object().shape({
            pincode: Yup.string().matches(/^[1-9][0-9]{5}$/ ,"Enter valid pincode").required("Required")

          })
        )
        .required("Required")
        .min(1, "Atleast 1 pincode required")
        ,
        businessCategory: Yup.string().required("Required"),
        gstin: Yup.string()
            .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                "Please Enter valid GSTIN")
            .required("Required"),
        address: Yup.string().required("Required")
    })

    const classes = useStyles();

    return (
        <Grid className={classes.gridStyle}>
        <Box  >
            <Box ml={40}  mt={3} align="center" >
                <Grid container spacing={3} align="center">
                    <Grid item xs={12} sm={6} md={6}>
                     <img src={logo} alt="logo" height="60" width="270" align="center" style={{ margin:"0px 180px" }} />

                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6}  className={classes.card}>
                                    <Typography variant='subtitle1' style={{ color: "#ECE5E2",marginTop:"100px"  }} >Register your business here!</Typography>

                                    </Grid>
                                    <Grid item xs={6} className={classes.divScroll}>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#199bf1" ,marginBottom:'15px'}} >Business Registration</Typography>
                                        </center>
                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Business Name' name='businessName' value={props.values.businessName}
                                                        required error={props.errors.businessName && props.touched.businessName}
                                                        onChange={props.handleChange} helperText={<ErrorMessage name='businessName' />} InputProps={{endAdornment: (<FieldIcon name="bname" />),}} />
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Business Category' type='businessCategory' required error={props.errors.businessCategory && props.touched.businessCategory}
                                                        name='businessCategory' value={props.values.businessCategory} onChange={props.handleChange} helperText={<ErrorMessage name='businessCategory' />} InputProps={{endAdornment: (<FieldIcon name="bcategory" />),}} />
                                                    <Field as={TextField} fullWidth label='Address' size="small" className={classes.textField} variant="outlined" name='address'  required error={props.errors.address && props.touched.address}
                                                         value={props.values.address} onChange={props.handleChange} helperText={<ErrorMessage name='address' />} InputProps={{endAdornment: (<FieldIcon name="address" />),}} />
                                                    <FieldArray name="pincodes">
                                                          {({ push, remove }) => (
                                                            <Fragment>
                                                              {props.values.pincodes.map((_, index) => (
                                                                <Grid container item key={index} >
                                                                      <Grid >
                                                                            <Field as={TextField} size="small" label='Serviceable pincode' className={classes.textField} variant="outlined" required error={props.errors.pincode && props.touched.pincode}
                                                                                  value={props.values.pincode} onChange={props.handleChange} pattern="^[1-9][0-9]{5}$" helperText={<ErrorMessage name='pincode' />} InputProps={{endAdornment: (<FieldIcon name="pincode" />),}} name={`pincodes.${index}.pincode`}/>
                                                                        </Grid>
                                                                    <Grid >
                                                                        <Button className={classes.pincodeButtons} size="small" disabled={index===0} variant="contained" onClick={() => remove(index)}>
                                                                        Delete
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Button className={classes.pincodeButtons} size="small" disabled={props.isSubmitting} variant="contained" onClick={() => push(emptyPins)}>
                                                                          Add Pincode
                                                                        </Button>
                                                                      </Grid>
                                                                 </Grid>
                                                              ))}
                                                        </Fragment>
                                                      )}
                                                    </FieldArray>

                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='GSTIN' required error={props.errors.gstin && props.touched.gstin}
                                                        value={props.values.gstin} onChange={props.handleChange} name='gstin' helperText={<ErrorMessage name='gstin' />} InputProps={{endAdornment: (<FieldIcon name="gstin" />),}} />

                                                    <center>
                                                        <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                                            className={classes.buttons} >{props.isSubmitting ? "Loading" : "Register Business"}</Button>
                                                    </center>
                                                </Form>
                                            )}
                                        </Formik>
                                        <Snackbar
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
                                        <UploadGstCertificate imgdialog={imgdialog}
                                          setImgdialog={setImgdialog} />

                                        <br></br>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </Grid>
    )
}

export default BusinessRegister
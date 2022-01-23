import { React, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Input, makeStyles, Box, Card, CardContent, Link } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import background1 from './bg4.jpeg';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const BusinessRegister = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const headStyle = { margin: 0, fontFamily: 'san-serif', color: 'blue' }
    const marginTop = { margin: '8px 0' }
    const formStyle = { textAlign: 'center' }
    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const emptyPins = {pincode:''}


    const initialValues = {
        bname: '',
        bcategory: '',
        address: '',
        pincodes: [emptyPins],
        gstin: '',
        license: ''
    }


    let navigate = useNavigate();
    const  onValueChange = (event) => {
        this.setState({
          role: event.target.value
        });
    }

    const onSubmit = (values, props) => {
        const business = {
            bname: values.bname,
            bcategory: values.bcategory,
            address: values.address,
            pincodes: values.pincodes,
            gstin: values.gstin,
            license: values.license
        }

        console.log(business)
        axios.post("http://localhost:8088/user/businessRegister", business)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);
                }

            })
            .catch((error) => {
                if (error.response.status === 400) {
                    console.log(error.response.data.message);
                    //  alert("Email already exist")
                    setOpen(true);
                    setMesg(error.response.data.message);
                    props.resetForm()
                }
                else {
                    setOpen(true);
                    setMesg("Something went wrong");
                    console.log(error)
                }
            });

    }
    const handleClose = (event, reason) => {
        if (success) {
            setOpen(false);
            navigate('/login', { replace: true })
        }
        else {
            setOpen(false);
        }
    };
    const Login = () => {
        navigate('/', { replace: true })
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
            width: "600px",
            height: "420px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '30px' ,
            backgroundColor: '#f3f0ff'

        },
         divScroll: {
                    width: "600px",
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
                      marginTop: '70px',
                      width: '200px',
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
        },
        textField: {
                     [`& fieldset`]:{
                          borderRadius:100
                        },
                        marginTop:'5px'
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
        bname: Yup.string()
            .required("Required"),
//        pincode:
//         Yup.string().matches(/^[1-9][0-9]{5}$/ ,"Enter valid pincode").required("Required")
//    ,
    pincodes: Yup.array()
        .of(
          Yup.object().shape({
            pincode: Yup.string().matches(/^[1-9][0-9]{5}$/ ,"Enter valid pincode").required("Required")

          })
        )
        .required("Required")
        .min(1, "Atleast 1 pincode required")
        ,
        bcategory: Yup.string().required("Required"),
        gstin: Yup.string()
            .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                "Please Enter valid GSTIN")
            .required("Required"),
        address: Yup.string().required("Required")
    })

    const classes = useStyles();

    return (
        <Box  >
            <Box ml={40}  mt={6} align="center" >
                <Grid container spacing={3} align="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6}  className={classes.card}>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>

                                        <Typography variant='h6' style={{ color: "#ECE5E2" }} >Already a member?</Typography>
                                        <br></br>
                                        <Typography variant='subtitle1' style={{ color: "#ECE5E2" }}>Sign in and see what's new since your last visit</Typography>

                                        <center>
                                            <Button type='submit' variant="contained"  className={classes.buttonr}
                                                onClick={Login}>Login</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.divScroll}>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#199bf1" ,marginBottom:'15px'}} >Business Registration</Typography>
                                        </center>
                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Business Name' name='bname' value={props.values.bname}
                                                        required error={props.errors.bname && props.touched.bname}
                                                        onChange={props.handleChange} helperText={<ErrorMessage name='bname' />} InputProps={{endAdornment: (<FieldIcon name="bname" />),}} />
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Business Category' type='bcategory' required error={props.errors.bcategory && props.touched.bcategory}
                                                        name='bcategory' value={props.values.bcategory} onChange={props.handleChange} helperText={<ErrorMessage name='bcategory' />} InputProps={{endAdornment: (<FieldIcon name="bcategory" />),}} />
                                                    <Field as={TextField} fullWidth label='Address' size="small" className={classes.textField} variant="outlined" name='address'  required error={props.errors.address && props.touched.address}
                                                         value={props.values.address} onChange={props.handleChange} helperText={<ErrorMessage name='address' />} InputProps={{endAdornment: (<FieldIcon name="address" />),}} />
                                                    <FieldArray name="pincodes">
                                                          {({ push, remove }) => (
                                                            <Fragment>
                                                              {props.values.pincodes.map((_, index) => (
                                                                <Grid container item key={index} >
                                                                      <Grid >
                                                                            <Field as={TextField} size="small" label='Servicable pincode' className={classes.textField} variant="outlined" required error={props.errors.pincode && props.touched.pincode}
                                                                                  value={props.values.pincode} onChange={props.handleChange} pattern="^[1-9][0-9]{5}$" helperText={<ErrorMessage name='pincode' />} InputProps={{endAdornment: (<FieldIcon name="pincode" />),}} name={`pincodes.${index}.pincode`}/>
                                                                        </Grid>
                                                                    <Grid >
                                                                        <Button className={classes.pincodeButtons} size="small" disabled={props.isSubmitting} variant="contained" onClick={() => remove(index)}>
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
                                                    {/* <Button type='submit' variant='contained' color='primary' style={marginTop} align='center'>Register</Button> */}

                                                    <label>Upload Business License: </label>
                                                    <Input type="file" name="license" onChange={(event) => props.setFieldValue('license', event.target.files[0])} className={classes.textField} variant="outlined" required
                                                    />
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
                                        <br></br>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default BusinessRegister
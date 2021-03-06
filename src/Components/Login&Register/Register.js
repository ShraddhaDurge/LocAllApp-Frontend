import { React, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, makeStyles, Box, Card, CardContent} from '@material-ui/core';
import {RadioGroup } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import background1 from '../Images/bg1.jpg';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import firebase from '../firebase';
import logo from '../Images/LocAll (8).png';

const Register = () => {

    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [buttonText, setButtonText] = useState("Get OTP");

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        role: 'customer',
        otp: ''
    }


    let navigate = useNavigate();

    const onSubmit = (values, props) => {
        const user = {
            username: values.username,
            phoneno: values.phoneno,
            email: values.email,
            password: btoa(values.password.split('').reverse().join('')),
            role: values.role
        }

        console.log(user)
        axios.post("http://localhost:8088/user/register", user)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);

                    const jwt = response.data
                    localStorage.setItem('userInfo', JSON.stringify(jwt));
                    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
                    console.log(userInfo.user.email)
                    console.log(userInfo.user.role)
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
                    window.location.reload()
                }
            });


    }
    const handleClose = (event, reason) => {
        if (success) {
            setOpen(false);

            const userInfo = JSON.parse(localStorage.getItem("userInfo"))


            if(userInfo.user.role==='customer') {
                navigate('/', { replace: true })
            }
            else if(userInfo.user.role==='vendor'){
                navigate('/businessRegister', { replace: true })
            }
            else {
                navigate('/', { replace: true })
            }
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
            width: "650px",
            height: "420px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '10px' ,
            backgroundColor: '#f3f0ff',
        }
        , divScroll: {
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
            overflow: 'scroll',
            borderSizing: 'border-box',
        }
        , buttonr: {
                      width: '200px',
                      borderRadius: '20px',
                      border: '1px solid #FFFFFF',
                      backgroundColor: "#ECE5E2",
                      color: '#199bf1',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      marginTop: '70px',
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
            marginTop: '20px',
            '&:hover': {
                backgroundColor: "#5858FA",
            },
            width: '260px'

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
          user: PersonIcon,
          email: EmailIcon,
          phone: PhoneIcon,
          password: LockIcon,
        };

        const FieldIcon = ({ name }) => {
          const Icon = icons[name];
          return Icon ? (<Icon />) : null;
        };
        const configureCaptcha = () =>{
            console.log("Recaptca generated")
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-otp-button', {
              'size': 'invisible',
              'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleGetOtp();
                console.log("Recaptca varified")
              },
              defaultCountry: "IN"
            });
          }



        const handleGetOtp = phoneno => (e) => {
            e.preventDefault()
            configureCaptcha()
            console.log(phoneno)
            const phoneNumber = "+91" + phoneno
            console.log(phoneNumber)
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).
                  window.confirmationResult = confirmationResult;
                  console.log("OTP has been sent")
                  setIsOpened(true)
                  setPhoneVerify(true)
                  // ...
                }).catch((error) => {
                  // Error; SMS not sent
                  // ...
                  console.log("SMS not sent")
                  setPhoneVerify(false)
                });
          }

      const handleVerifyOtp = otp => (e) =>{
          e.preventDefault()

          console.log(otp)
          window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user))
            setPhoneVerify(true)
            setButtonText("Verified");
            setIsOpened(false);
            setOpen(true);
            setMesg("User is verified");
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            setOpen(true);
            setMesg("Wrong OTP! User not verified");
            setPhoneVerify(false)
          });
        }


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Required"),
        phoneno: Yup.string().matches(/^[7-9]\d{9}$/,"Enter valid phone number").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        password: Yup.string()
            .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character")
            .required("Required"),
        confirmpassword: Yup.string().required("Please confirm your password")
            .when("password", {
                is: password => (password && password.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
            })
    }
    )

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
                                        <Typography variant='h6' style={{ color: "#ECE5E2",marginTop:"100px"  }} >Already a member?</Typography>

                                        <Typography variant='subtitle1' style={{ color: "#ECE5E2" }}>Sign in and see what's new since your last visit</Typography>

                                        <center>
                                            <Button type='submit' variant="contained"  className={classes.buttonr}
                                                onClick={Login}>Login</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.divScroll}>

                                        <center>
                                            <Typography variant='h5' style={{ color: "#199bf1" ,marginBottom:'15px'}} >Register</Typography>
                                        </center>

                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <div id="get-otp-button"> </div>
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='User Name' name='username' value={props.values.username}
                                                        required error={props.errors.username && props.touched.username}
                                                        onChange={props.handleChange} helperText={<ErrorMessage name='username' />} InputProps={{endAdornment: (<FieldIcon name="user" />),}} />
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Email Id' type='email' required error={props.errors.email && props.touched.email}
                                                        name='email' value={props.values.email} onChange={props.handleChange} helperText={<ErrorMessage name='email' />} InputProps={{endAdornment: (<FieldIcon name="email" />),}} />
                                                    <Field as={TextField} style = {{width: 150, marginRight:"5px"}} label='Phone no.' size="small" className={classes.textField} variant="outlined" name='phoneno' pattern="[789]{1}[0-9]{9}" required error={props.errors.phoneno && props.touched.phoneno}
                                                         value={props.values.phoneno} onChange={props.handleChange} helperText={<ErrorMessage name='phoneno' />} InputProps={{endAdornment: (<FieldIcon name="phone" />),}} />
                                                         <Button variant='outlined' onClick={handleGetOtp(props.values.phoneno)} style={{ borderRadius:100, marginTop:'5px',backgroundColor: "#199bf1",color: '#FFFFFF'}} disabled={phoneVerify ? true : false}>{buttonText}</Button>
                                                    {isOpened && (
                                                            <div>
                                                              <Field as={TextField} style = {{width: 170, marginRight:'5px '}} label='Enter OTP' size="small" className={classes.textField} variant="outlined" name='otp' pattern="[789]{1}[0-9]{9}" required error={props.errors.otp && props.touched.otp}
                                                               value={props.values.otp} onChange={props.handleChange} helperText={<ErrorMessage name='otp' />} />
                                                               <Button onClick={handleVerifyOtp(props.values.otp)} variant='outlined' style={{ borderRadius:100, marginTop:'5px',backgroundColor: "#199bf1",color: '#FFFFFF'}} >Verify</Button>
                                                            </div>
                                                          )}


                                                     <Field as={TextField} fullWidth label='Password' type='password' size="small" className={classes.textField} variant="outlined" required error={props.errors.password && props.touched.password}
                                                        value={props.values.password} onChange={props.handleChange} name='password' helperText={<ErrorMessage name='password' />} InputProps={{endAdornment: (<FieldIcon name="password" />),}} />
                                                    <Field as={TextField} fullWidth size="small" className={classes.textField} variant="outlined" label='Confirm Password' type='password' required error={props.errors.confirmpassword && props.touched.confirmpassword}
                                                        value={props.values.confirmpassword} onChange={props.handleChange} name='confirmpassword' helperText={<ErrorMessage name='confirmpassword' />} InputProps={{endAdornment: (<FieldIcon name="password" />),}} />
                                                    <br></br>
                                                    <br></br>
                                                     <RadioGroup
                                                         row
                                                         aria-labelledby="demo-row-radio-buttons-group-label"
                                                         name="row-radio-buttons-group"
                                                       >
                                                     Select Role:
                                                     <div className="custom-control">
                                                      <input
                                                         id="customer"
                                                         type="radio"
                                                         value="customer"
                                                         name='role'
                                                         onChange={props.handleChange}
                                                         defaultChecked={props.values.role=== "customer"}
                                                       />
                                                       <label
                                                          className="custom-control-label"
                                                          htmlFor="customer"
                                                        >
                                                          Customer
                                                        </label>
                                                   </div>
                                                   <div className="custom-control">
                                                      <input
                                                         id="vendor"
                                                         type="radio"
                                                         value="vendor"
                                                         name='role'
                                                         onChange={props.handleChange}
                                                         defaultChecked={props.values.role=== "vendor"}
                                                       />
                                                      <label
                                                        className="custom-control-label"
                                                        htmlFor="vendor"
                                                       >
                                                         Vendor
                                                      </label>
                                                   </div>
                                                    </RadioGroup>
                                                    <center>
                                                        <Button type='submit' variant="contained" disabled={props.isSubmitting || phoneVerify === false}
                                                            className={classes.buttons} >{props.isSubmitting ? "Loading" : "Register"}</Button>

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
        </Grid>
    )
}

export default Register
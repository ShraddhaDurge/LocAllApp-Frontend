import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, makeStyles, CardContent, Card, Box } from '@material-ui/core'
import { Formik , Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Snack from '../Snackbar';
import background1 from '../Images/bg1.jpg';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../Images/LocAll (8).png';
import VendorLogin from './VendorLogin';
import firebase from '../firebase';

const Login = ({ handleChange }) => {

    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const [roleDialog, setRoleDialog] = useState({ isOp: false });
    const initialValues = {
        email: '',
        password: ''
    }
    const useStyles = makeStyles({
        card: {
            height: '425px',
            backgroundImage: `url(${background1})`,
            opacity: '120%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
        , grid: {
            width: "650px",
            height: "420px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '10px' ,
            backgroundColor: '#f3f0ff',

        }
        , box: {
            alignItems: 'center',
            justify: 'center',
            direction: 'column',
            marginRight: '20px',
            borderRadius: '20px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)',
            position: 'relative',
            overflow: 'hidden',
            borderSizing: 'border-box',
        }
        , buttonr: {

            borderRadius: '100px',
            border: '1px solid #FFFFFF',
            backgroundColor: "#ECE5E2",
            color: '#199bf1',
            //fontSize: '12px',
            fontWeight: 'bold',
            //padding: '12px 45px',
            letterSpacing: '1px',
            marginTop: '70px',
            '&:hover': {
                backgroundColor: "#9B8583 ",
            },
            width: '200px'

        }
        , buttons: {
            width: '260px',
            borderRadius: '20px',
            border: '1px solid #2E2EFE',
            backgroundColor: "#199bf1",
            color: '#FFFFFF',
            letterSpacing: '1px',
            marginTop: '30px',
            '&:hover': {
                backgroundColor: "#5858FA",
            }
        },
        textField: {
            [`& fieldset`]:{
                 borderRadius:100
               },
               marginTop:'15px'
        },
        gridStyle: {
            overflow: 'hidden'
        }
    });
    const icons = {
      email: EmailIcon,
      password: LockIcon,
    };

    const FieldIcon = ({ name }) => {
      const Icon = icons[name];
      return Icon ? (<Icon />) : null;
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Enter valid email").required("Required"),
        password: Yup.string().required("Required")
    })
    let navigate = useNavigate();
    const onSubmit = (values, props) => {
        const loguser = {
            email: values.email,
            password: btoa(values.password.split('').reverse().join(''))
        }

        axios.post("http://localhost:8088/user/login", loguser)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                console.log(response.data.role)
                if(res === 200){
                    if(response.data.role ==='customer'){
                        localStorage.setItem('myInfo', JSON.stringify(response.data.user));
                        const myInfo=JSON.parse(localStorage.getItem("myInfo"))
                        const userid = myInfo.id;
                        axios.get(`http://localhost:8088/customer/getCustomerProfile/${userid}`)
                        .then(res=>{
                           console.log(res)
                           localStorage.setItem('customerProfile',JSON.stringify(res.data))
                            if(res.data !== null) {
                                localStorage.setItem('customerPincode',JSON.stringify(res.data.shippingPincode))
                           }else {
                                localStorage.setItem('customerPincode',JSON.stringify(0))

                           }

                           firebase.analytics().logEvent('customer_logged_in');
                           navigate('/customerHome', { replace: true })
                        })
                        .catch(err=>{
                            console.log(err)

                        })


                    }else if(response.data.role ==='admin'){
                         localStorage.setItem('myInfo', JSON.stringify(response.data.user));
                         firebase.analytics().logEvent('admin_logged_in');
                         navigate('/adminHome', { replace: true })

                         }
                    else if(response.data.role ==='vendor'){
                        console.log(response.data.business.user)
                        localStorage.setItem('myInfo', JSON.stringify(response.data.business.user));
                        localStorage.setItem('businessInfo', JSON.stringify(response.data.business));
//                        navigate('/vendorHome', { replace: true })
                        firebase.analytics().logEvent('vendor_logged_in');
                        setRoleDialog({ isOp: true })
                    }
                    else {
                        console.log("No such role exists!")
                    }
                    firebase.analytics().logEvent('user_logged_in');
                }
            })
            .catch((error) => {
                console.log(error)
                    setNotify({
                        isOpen: true,
                        mesg: "Invalid Email or password"
                    })
                    props.resetForm()
            });
    }
    const Register = () => {
        navigate('/register', { replace: true })
    };

    const classes = useStyles();

    return (
        <Grid className={classes.gridStyle}>
        <Box  >
            <Box ml={40} mt={3}>
                <Grid container spacing={3} align="center">

                    <Grid item xs={12} sm={6} md={6}>
                        <img src={logo} alt="logo" height="60" width="270" align="center" style={{ margin:"0px 180px" }} />
                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} className={classes.card}>


                                        <Typography variant='h6'  style={{ color: "#ECE5E2",marginTop:"100px"  }} >Not yet a member?</Typography>

                                        <Typography variant='subtitle1'  style={{ color: "#ECE5E2" }}>Sign up and discover what we can do for you</Typography>

                                        <center>
                                            <Button type='submit' variant="contained" className={classes.buttonr}
                                                onClick={Register}>Register</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.grid}>
                                    <br/>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#199bf1" }} >Login</Typography>
                                        </center>
                                        <br/>
                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <Field as={TextField}  size="small" className={classes.textField} variant="outlined" label='Email Id' name="email" value={props.values.email}
                                                        placeholder='Enter Email Id' fullWidth required error={props.errors.email && props.touched.email}
                                                        helperText={<ErrorMessage name="email" />} onChange={props.handleChange} InputProps={{endAdornment: (<FieldIcon name="email" />),}}
                                                    />
                                                    <Field as={TextField}  size="small" className={classes.textField} variant="outlined" label='Password' name="password" error={props.errors.password && props.touched.password}
                                                        placeholder='Enter password' type='password' fullWidth required value={props.values.password}
                                                        helperText={<ErrorMessage name="password" />} onChange={props.handleChange} InputProps={{endAdornment: (<FieldIcon name="password" />),}}/>
                                                    <br></br>
                                                    <br></br>
                                                    <center>
                                                        <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                                            className={classes.buttons} >{props.isSubmitting ? "Loading" : "Login"}</Button>
                                                    </center>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Snack
                    notify={notify}
                    setNotify={setNotify}
                />
                  <VendorLogin roleDialog={roleDialog}
                       setRoleDialog={setRoleDialog} />
            </Box>
        </Box>
        </Grid>
    )
}

export default Login
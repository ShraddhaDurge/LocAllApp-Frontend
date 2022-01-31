import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Link, makeStyles, CardContent, Card, Box } from '@material-ui/core'
import { Formik , Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Snack from './Snackbar';
import background1 from './bg1.jpg';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = ({ handleChange }) => {

    const paperStyle = { padding: '30px 20px', width: 300, margin: "30px auto" }
    const headStyle = { margin: 0, fontFamily: 'san-serif', color: 'blue' }
    const gridStyle = { margin: '3px auto', padding: '5px auto' }
    const btnstyle = { margin: '8px 0', backgroundColor: '#F9261B' }
    const imgstyle = { height: 100, width: 180 }

    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const initialValues = {
        email: '',
        password: '',
        remember: false
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
            width: "600px",
            height: "420px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '30px' ,
            backgroundColor: '#f3f0ff'

        }
        , box: {
            alignItems: 'center',
            justify: 'center',
            direction: 'column',
            marginRight: '20px',
            //display:'flex',
            //marginLeft:'50%',
            //position:'absolute'
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
            marginTop: '80px',
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
        const user = {
            email: values.email,
            password: btoa(values.password.split('').reverse().join(''))
        }

        axios.post("http://localhost:8088/user/login", user)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    const jwt = response.data
                    localStorage.setItem('myInfo', JSON.stringify(jwt));
                    const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
                    console.log(dataInfo.email)
                    console.log(dataInfo.phoneno)
                    console.log(dataInfo.role)

                    if(response.data.role==='customer') {
                        navigate('/customerHome', { replace: true })
                    }
                    else if(response.data.role==='vendor'){
                        navigate('/vendorHome', { replace: true })
                    }
                    else {
                        navigate('/adminHome', { replace: true })
                    }
                }

            })
            .catch((error) => {
                if (error.response.status === 400) {
                    console.log(error.response.data);
                    setNotify({
                        isOpen: true,
                        mesg: "Invalid Email or password"
                    })
                    props.resetForm()
                }
                else {
                    setNotify({
                        isOpen: true,
                        mesg: "Something went wrong"
                    })
                    console.log(error)
                }
            });
    }
    const Register = () => {
//        history.push('/register');
        navigate('/register', { replace: true })
    };

    const classes = useStyles();

    return (

        <Box  >
            <Box ml={40} mt={6} align='right'>
                <Grid container spacing={3} align="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} className={classes.card}>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <Typography variant='h6'  style={{ color: "#ECE5E2" }} >Not yet a member?</Typography>
                                        <br></br>
                                        <br></br>
                                        <Typography variant='subtitle1'  style={{ color: "#ECE5E2" }}>Sign up and discover what we can do for you</Typography>

                                        <center>
                                            <Button type='submit' variant="contained" className={classes.buttonr}
                                                onClick={Register}>Register</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.grid}>
                                    <br></br>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#199bf1" }} >Login</Typography>
                                        </center>
                                        <br></br>
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
                                        <br></br>

                                        <Snack
                                            notify={notify}
                                            setNotify={setNotify}
                                        />
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
            </Box>


        </Box>

    )
}

export default Login
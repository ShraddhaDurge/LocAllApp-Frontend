import { React, Fragment } from 'react'
import { Avatar, Button, Grid, TextField, Box } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import Snack from './Snackbar';
import { useNavigate } from 'react-router-dom';
import UploadProductImage from "./UploadProductImage";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


const AddProduct = (props) => {
    // const paperStyle = { padding: '20px 20px', width: 800, height: 460, margin: "30px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '' }
    //const btnStyle = { margin: '10px 5px 10px auto', display: 'flex', justify: 'space-between', alignItems: 'right' }
    const formStyle = { textAlign: 'center' }
    const marginTop = { marginTop: '10px', marginBottom: '10px' }
    const initialValues = {
        productName: '',
        quantAvailable: '',
        price: '',
        productImage: '',
        productDesc: ''
    }

    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const [imgdialog, setImgdialog] = useState({ isOp: false });
    const { add, setAdd } = props;

    let navigate = useNavigate();

    const handleClose = () => {
        setAdd({
            open: false
        });

    };
    const onSubmit = (values, props) => {

        const Product = {
            name: values.eventName,
            event_type: values.eventType,
            description: values.eventDescription,
            venue: values.eventVenue,
            start_time: values.startTime,
            end_time: values.endTime
        }

        console.log(Product)
//        axios.post("http://localhost:8081/account/admin/addEvents", Event)
            axios.post("http://localhost:8088/product/addProduct", Product)
            .then((response) => {
                var resp = response.status;
                console.log(response.data);

                localStorage.setItem('productId', JSON.stringify(response.data.productId));
                console.log(response.status)
                if (resp === 200) {
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);
                    setNotify({
                        isOpen: true,
                        mesg: "Product Added Successfully!"
                    })

                    setImgdialog({
                        isOp: true

                    })


                }
            })

            .catch((error) => {
                if (error.status.response === 400) {
                    console.log(error.response.data.message);
                    setOpen(true);
                    setMesg(error.response.data.message);
                    setNotify({
                        isOpen: true,
                        mesg: "Product Already Exist!"
                    })
                    props.resetForm()
                }
                else {
                    setOpen(true);
                    setMesg("Something went wrong");
                    setNotify({
                        isOpen: true,
                        mesg: "Something went wrong!"
                    })
                    console.log(error)
                }
            });


    }

    const eventSchema = Yup.object().shape({
        productName: Yup.string()
            .matches(/[a-zA-Z][a-zA-Z\s]+/, "Event Name must be alphabetical..")
            .required,
        eventType: Yup.string().required,
        eventDescription: Yup.string().required,
        eventVenue: Yup.string().required
    });



    return (
        // <Grid>
        <Fragment>
            <Dialog
                fullWidth={true}

                open={add.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >    <center>
                    <DialogTitle id="past-event-dialog-title">Add Product</DialogTitle>

                    <DialogContent >
                        <Box mr={10}>
                            <Formik initialValues={initialValues} eventSchema={eventSchema} onSubmit={onSubmit}>

                                {(props) => (
                                    <Form style={formStyle}>

                                        <div class="container">
                                            <Grid container spacing={3}>

                                                <Grid item xs={6} sm={6}>

                                                    <Field as={TextField} fullWidth label='Name' name='productName' value={props.values.productName}
                                                        required error={props.errors.productName && props.touched.productName}
                                                        onInput={props.handleChange}
                                                        pattern="[Aa-Zz]"
                                                        helperText={<ErrorMessage name='productName' />}
                                                        onChange={props.handleChange} placeholder="Enter the name of product" required />
                                                </Grid>

                                                <Grid item xs={6}>

                                                    <Field as={TextField} fullWidth label='Type' name='eventType' value={props.values.eventType}
                                                        onChange={props.handleChange} placeholder="Enter the type of Event" required />

                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field as={TextField} id="standard-textarea" fullWidth label='Description' name='eventDescription' value={props.values.eventDescription}
                                                        onChange={props.handleChange} placeholder="Enter the Description of Event" multiline required />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field as={TextField} fullWidth label='Venue' name='eventVenue' value={props.values.eventVenue}
                                                        onChange={props.handleChange} placeholder="Enter the Venue of Event" required />
                                                </Grid>

                                            </Grid>

                                        </div>
                                        <Grid container justify="flex-end">
                                            <Button type='submit' color='primary'  disabled={props.isSubmitting}
                                                style={marginTop} >{props.isSubmitting ? "Loading" : "Create"}</Button>&nbsp;&nbsp;&nbsp;
                                            <Button onClick={handleClose} color="primary" >
                                               Close
                                            </Button>
                                        </Grid>

                                    </Form>
                                )}
                            </Formik>
                            {/* </Grid> */}</Box>
                    </DialogContent>
                </center>
                {/* </Paper> */}
                <Snack
                    notify={notify}
                    setNotify={setNotify}
                />
                <UploadProductImage imgdialog={imgdialog}
                    setImgdialog={setImgdialog} />

                {/* </Grid> */}
            </Dialog>
        </Fragment>
    )
}


export default AddProduct;
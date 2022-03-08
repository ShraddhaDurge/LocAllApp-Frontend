import { React, Fragment } from 'react'
import { Button, Grid, TextField, Box } from '@material-ui/core'
import { Form, Formik, Field, ErrorMessage,FieldArray } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import Snack from '../Snackbar';
import UploadProductImage from "./UploadProductImage";
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import PercentIcon from '@mui/icons-material/Percent';

const AddProduct = (props) => {
   const formStyle = { textAlign: 'center' }
    const tags = {tag:''};

    const initialValues = {
        productName: '',
        quantAvailable: '',
        price: '',
        productTags: [tags],
        productDesc: '',
        maxDiscount: 0,
        minProducts: 0
    }

    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const [imgdialog, setImgdialog] = useState({ isOp: false });
    const { add, setAdd } = props;

    const handleClose = () => {
        setAdd({
            open: false
        });

        window.location.reload()

    };
    const onSubmit = (values, props) => {
        const Product = {
            productName: values.productName,
            quantAvailable: values.quantAvailable,
            price: values.price,
            productTags: values.productTags,
            productDesc: values.productDesc,
            maxDiscount: values.maxDiscount,
            minProducts: values.minProducts
        }

        const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))
        const id = businessInfo.business_id
        console.log(Product)
            axios.post(`http://localhost:8088/product/add/${id}`, Product)
            .then((response) => {
                var resp = response.status;
                console.log(response.data);

                localStorage.setItem('productId', JSON.stringify(response.data.product.productId));
                console.log(response.status)
                if (resp === 200) {
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
                    setNotify({
                        isOpen: true,
                        mesg: "Product Already Exist!"
                    })
                    props.resetForm()
                }
                else {
                    setNotify({
                        isOpen: true,
                        mesg: "Something went wrong!"
                    })
                    console.log(error)
                    props.resetForm()

                }
            });


    }

    const productSchema = Yup.object().shape({
        productName: Yup.string()
            .matches(/[a-zA-Z][a-zA-Z\s]+/, "Event Name must be alphabetical..")
            .required,
        quantAvailable: Yup.string().required,
        price: Yup.string().required,
        productDesc: Yup.string().required,
        maxDiscount: Yup.number().min(0, 'Min value 0').max(100, 'Max value is 100').required,
        minProducts: Yup.number().min(0, 'Min value 0').max(100, 'Max value is 100').required


    });
    const icons = {
      maxDiscount: PercentIcon
    };

    const FieldIcon = ({ name }) => {
      const Icon = icons[name];
      return Icon ? (<Icon />) : null;
    };



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
                            <Formik initialValues={initialValues} productSchema={productSchema} onSubmit={onSubmit}>

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
                                                        onChange={props.handleChange} placeholder="Enter the name of product"/>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Field as={TextField} fullWidth label='Quantity Available' name='quantAvailable' value={props.values.quantAvailable}
                                                        onChange={props.handleChange} placeholder="Enter the product quantity available" required />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Field as={TextField} fullWidth label='Unit price / Cost per item' name='price' value={props.values.price}
                                                        onChange={props.handleChange} placeholder="Enter the price of product" required />
                                                </Grid>

                                                <Grid item xs={6}>
                                                <FieldArray name="productTags">
                                                  {({ push, remove }) => (
                                                    <Fragment>
                                                      {props.values.productTags.map((_, index) => (
                                                        <Grid container item key={index} >
                                                              <Grid >
                                                                    <Field as={TextField} fullWidth label='Product tags' required error={props.errors.tag && props.touched.tag}
                                                                          value={props.values.tag} onChange={props.handleChange} helperText={<ErrorMessage name='tag' />}name={`productTags.${index}.tag`}/>
                                                                </Grid>
                                                            <Grid >
                                                                <Button size="small" disabled={props.isSubmitting} variant="contained" onClick={() => remove(index)}>
                                                                Delete
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button size="small" disabled={props.isSubmitting} variant="contained" onClick={() => push(tags)}>
                                                                  Add Tag
                                                                </Button>
                                                              </Grid>
                                                         </Grid>
                                                      ))}
                                                </Fragment>
                                              )}
                                            </FieldArray>
                                            </Grid>
                                                <Grid item xs={12}>
                                                    <Field as={TextField} id="standard-textarea" fullWidth label='Product Description' name='productDesc' value={props.values.productDesc}
                                                        onChange={props.handleChange} placeholder="Enter the Description of product" multiline required />
                                                </Grid>
                                                 <Grid item xs={6}>
                                                    <Field as={TextField} fullWidth type="number" label='Maximum discount' name='maxDiscount' value={props.values.maxDiscount}
                                                        onChange={props.handleChange} placeholder="Enter the maximum discount allowed for product" required InputProps={{endAdornment: (<FieldIcon name="maxDiscount" />), fontSize:"small",inputProps: { min: 0, max: 100 }}} />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Field as={TextField} fullWidth type="number" label='Minimum products to avail discount' name='minProducts' value={props.values.minProducts}
                                                        onChange={props.handleChange} placeholder="Enter the minimum number of products required to avail discount" required InputProps={{inputProps: { min: 0, max: 100 }}}/>
                                                </Grid>
                                            </Grid>


                                        </div>
                                        <Grid container justify="flex-end" style={{marginTop:"10px"}}>
                                            <Button type='submit' color='primary'  disabled={props.isSubmitting}>
                                                {props.isSubmitting ? "Loading" : "Add"}
                                            </Button>&nbsp;&nbsp;&nbsp;
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
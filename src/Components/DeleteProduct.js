import React, { useState, useEffect, useReducer, Fragment } from 'react';
import { Grid, Paper, Box, Button, Card, CardContent, Select, NativeSelect, MenuItem, InputLabel, FormControl, FormHelperText, Tooltip, Typography, TextField, AppBar, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import { ArrowBack, Home, Menu } from '@material-ui/icons';
import { Formik, Form, Field, ErrorMesage } from 'formik';
//import Homebar from "./Homebar";
//import Footer from './Footer';
import Snack from './Snackbar';
//import Dropdown from 'react-dropdown';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import axios from 'axios';

function editPage(edit, action) {
  const productInfo = JSON.parse(localStorage.getItem("productInfo"))
  // const info=JSON.parse(localStorage.getItem("myInfo"))

  switch (action.type) {
    case 'field': {
      return {
        ...edit,
        [action.fieldName]: action.payload,
      };
    }

    case 'success': {
      return {
        productName: productInfo.productName,
        quantAvailable: productInfo.quantAvailable,
        price: productInfo.price,
        productTags: productInfo.productTags,
        productDesc: productInfo.productDesc
      };
    }
    case 'error': {
      return {
        ...edit,

      };
    }

    default:
      return edit;
  }
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const DeleteProduct = (props) => {

  const marginTop = { marginTop: '10px', marginBottom: '8px', width: '100px' }
  const tags = {tag:''};
  const initialValues = {
          productName: '',
          quantAvailable: '',
          price: '',
          productTags: [tags],
          productDesc: ''
      }
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [productList, setProductList] = useState([])
  const [edit, setEdit] = useReducer(editPage, initialValues);
  const {productName, quantAvailable,price,productTags,productDesc} = edit;
  const [productId, setProductId] = React.useState();
  const { dele, setDelete } = props;
  const formStyle = { textAlign: 'center' }
  const [tagArrays] = useState([]);
  const handleClose = () => {
    setDelete({
      isOp: false
    });
    window.location.reload()
  };
   const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))
   const bid = businessInfo.business_id
  React.useEffect(() => {
    axios.get(`http://localhost:8088/product/getList/${bid}`)
      .then(response => {
        console.log(response)
        console.log(response.data[0].productName)
        setProductList(response.data)

      })
      .catch(err => {
        console.log(err)
      })
  },[bid])

  const handleChange = (event) => {
    const productId = event.target.value;
    localStorage.setItem('editProductId', JSON.stringify(productId));
    const editid = JSON.parse(localStorage.getItem("editProductId"));
    axios.get(`http://localhost:8088/product/${editid}`)
      .then(response => {
        console.log(response)
        console.log(response.data)
        localStorage.setItem('productInfo', JSON.stringify(response.data))
        setEdit({ type: 'success' })

      })
      .catch(err => {
        console.log(err)
        setEdit({ type: 'error' })


      })
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    const pid = JSON.parse(localStorage.getItem("productId"));
            console.log(pid);

    axios.delete(`http://localhost:8088/product/delete/${pid}`)
      .then((response) => {
        var res = response.status;

        console.log(response.status)
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Product Deleted Successfully!"
          })
        }

      })
      .catch((error) => {
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          })
          console.log(error)

      });
  }

  return (

    <Fragment>
      <Dialog
        width='xl'
        open={dele.isOp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >    <center>
          <DialogTitle id="delete-product-dialog-title">Delete Product</DialogTitle>
          </center>
        <DialogContent >


          <Grid  >

            <Box>
              <Grid container style={{ width: '200' }} >
                <Grid item xs={12} >

                  <Grid >
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {(props) => (
                        <Form style={formStyle}>
                          <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <FormControl alignItems="center" style={{ minWidth: 200, height: 80 }}>
                              <InputLabel id="demo-simple-select-outlined-label">Product Name</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-product-name"
                                label="Product Name"
                                value={productId}
                                onChange={handleChange}

                                MenuProps={MenuProps}
                              >
                                {productList.map((prod) => (
                                  <MenuItem key={prod.productId} value={prod.productId} >
                                    {prod.productName}
                                  </MenuItem>
                                ))}
                              </Select>
                              </FormControl></Grid>

                              <Grid item xs={6}>
                                <Field as={TextField}  label='Quantity Available' name="quantAvailable" onInput={props.handleChange} value={quantAvailable} style={{ marginLeft: '-20px' }}
                                 disabled required />
                              </Grid>
                              <Grid item xs={6}>
                                  <Field as={TextField}  label='Price' name="price" onInput={props.handleChange} value={price} style={{ marginLeft: '-20px' }}
                                    disabled
                                    required />
                                </Grid>
                              <Grid item xs={6}>
                              {productTags.map((tag, i) => (
                                <span key={i}>
                                <Field as={TextField} label='Product Tags' name="productTags" required value={tag.tag } disabled />

                                </span>
                              ))}

                              </Grid>


                              <Grid item xs={12}>
                                <Field as={TextField} label='Product Description' name="productDesc" required value={productDesc} style={{ marginLeft: '10px', width: '500px' }}
                                  required disabled
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>



                                  </Grid>

                            <Box ml={30}>
                              <Button type='submit' color='primary' disabled={props.isSubmitting}
                                style={marginTop} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Delete"}</Button>
                              <Button onClick={handleClose} color="primary" >
                                Close
                              </Button>
                            </Box>
                              </Form>
                            )}
                          </Formik>
                      </Grid>

                  </Grid>

                </Grid>
            </Box>
              <Snack
                notify={notify}
                setNotify={setNotify}
              />
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>


      )
}


      export default DeleteProduct;
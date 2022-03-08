import React, { useState, useEffect, useReducer, Fragment } from 'react';
import { Grid, Paper, Box, Button, Card, CardContent, Select, NativeSelect, MenuItem, InputLabel, FormControl, FormHelperText, Tooltip, Typography, TextField, AppBar, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import { ArrowBack, Home, Menu } from '@material-ui/icons';
import { Formik, Form, Field, ErrorMesage } from 'formik';
import Snack from '../Snackbar';
//import Dropdown from 'react-dropdown';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import UploadProductImage from "./UploadProductImage";
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
        productDesc: productInfo.productDesc,
        maxDiscount: productInfo.maxDiscount,
        minProducts: productInfo.minProducts
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
const EditProduct = (props) => {

  const marginTop = { marginTop: '10px', marginBottom: '8px', width: '100px' }
  const tags = {tag:''};
  const initialValues = {
          productName: '',
          quantAvailable: '',
          price: '',
          productTags: [tags],
          productDesc: '',
          maxDiscount:0,
          minProducts:0
      }
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [productList, setProductList] = useState([])
  const [edit, setEdit] = useReducer(editPage, initialValues);
  const {productName, quantAvailable,price,productTags,productDesc,maxDiscount,minProducts} = edit;
  const [productId, setProductId] = React.useState();
  const { editp, setEditp } = props;
  const [imgdialog, setImgdialog] = useState({ isOp: false });
  const formStyle = { textAlign: 'center' , overflowX: "hidden"}
  const handleClose = () => {
    setEditp({
      openEdit: false
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
   const Product = {
       productId:pid,
       productName,
       quantAvailable,
       price,
       productTags,
       productDesc,
       maxDiscount,
       minProducts
   }

    axios.post("http://localhost:8088/product/update", Product)
      .then((response) => {
        var res = response.status;

        console.log(response.status)
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Saved Changes Successfully!"
          })
          setImgdialog({
              isOp: true

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
        open={editp.openEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >    <center>
          <DialogTitle id="edit-product-dialog-title">Edit Product</DialogTitle>
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
                            <FormControl alignItems="left" style={{ marginLeft: '-20px', minWidth: 195, height: 50 }}>
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
                              </FormControl>
                              </Grid>

                              <Grid item xs={6}>
                                <Field as={TextField}  label='Quantity Available' name="quantAvailable" onInput={props.handleChange} value={quantAvailable} style={{ marginLeft: '-20px' }}
                                  onChange={e =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'quantAvailable',
                                      payload: e.currentTarget.value,
                                    })

                                  }
                                  required />
                              </Grid>
                              <Grid item xs={6}>
                                  <Field as={TextField}  label='Price' name="price" onInput={props.handleChange} value={price} style={{ marginLeft: '-20px' }}
                                    onChange={e =>
                                      setEdit({
                                        type: 'field',
                                        fieldName: 'price',
                                        payload: e.currentTarget.value,
                                      })

                                    }
                                    required />
                                </Grid>
                                <Grid item xs={6}>
                                  {productTags.map((tag, i) => (
                                    <span key={i}>
                                    <Field as={TextField} label='Product Tags' name="productTags" required value={tag.tag} error={props.errors.productTags && props.touched.productTags} onInput={props.handleChange} style={{ marginLeft: '-20px' }}
                                         onChange={(e) =>
                                           setEdit({
                                               type: 'field',
                                               fieldName: 'productTags',
                                               payload: e.currentTarget.value,
                                             })
                                           }
                                     />

                                    </span>
                                  ))}

                                    </Grid>

                              <Grid item xs={12}>
                                <Field as={TextField} fullWidth label='Product Description' name="productDesc" required value={productDesc} style={{ marginLeft: '25px' }}
                                  required onInput={props.handleChange}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'productDesc',
                                      payload: e.currentTarget.value,
                                    })}
                                />
                              </Grid>

                              <Grid item xs={6}>
                                <Field as={TextField}  label='Maximum discount' name="maxDiscount" onInput={props.handleChange} value={maxDiscount} style={{ marginLeft: '-20px' }}
                                  onChange={e =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'maxDiscount',
                                      payload: e.currentTarget.value,
                                    })

                                  }
                                  required />
                              </Grid>

                              <Grid item xs={6}>
                                <Field as={TextField}  label='Minimum products to avail discount' name="minProducts" onInput={props.handleChange} value={minProducts} style={{ marginLeft: '-20px' }}
                                  onChange={e =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'minProducts',
                                      payload: e.currentTarget.value,
                                    })

                                  }
                                  required />
                              </Grid>


                                  </Grid>

                            <Box ml={30}>
                              <Button type='submit' color='primary' disabled={props.isSubmitting}
                                style={marginTop} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Edit"}</Button>
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
              <UploadProductImage imgdialog={imgdialog}
                 setImgdialog={setImgdialog} />
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>


      )
}


      export default EditProduct;
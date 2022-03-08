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
const EditProduct = (props) => {

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
  const { editp, setEditp } = props;
  const [imgdialog, setImgdialog] = useState({ isOp: false });
  const formStyle = { textAlign: 'center' }
  const handleClose = () => {
    setEditp({
      openEdit: false
    });
    window.location.reload()
  };






  const onSubmit = async (e) => {
    e.preventDefault();

   const business = {
               businessName,
               businessCategory,
               address,
               pincodes:pincodes
           };

    axios.post(`http://localhost:8088/vendor/updateBusiness/${userid}`, business)
       .then((response) => {
        var res = response.status;

        console.log(response.status)
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Serviceable pincodes updates successfully!"
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
                            </Grid>

                            <Box ml={30}>
                              <Button type='submit' color='primary' disabled={props.isSubmitting}
                                style={marginTop} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Edit Pincodes"}</Button>
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


      export default EditProduct;
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
  const dataInfo = JSON.parse(localStorage.getItem("myEdit"))
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
        event_id: dataInfo.event_id,
        name: dataInfo.name,
        event_type: "Weekend event",
        description: dataInfo.description,
        venue: dataInfo.venue


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

  const dataInfo1 = JSON.parse(localStorage.getItem("myEdit"))
  const marginTop = { marginTop: '10px', marginBottom: '8px', width: '100px' }
  const initialValues = {
    event_id: " ",
    name: " ",
    event_type: "Weekend event",
    description: " ",
    venue: " ",
    start_time: " ",
    end_time: " "
  }
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [wevent, setWevent] = useState([])
  const [dele, setDelete] = useReducer(editPage, initialValues);
  const { event_id, name, venue, description, event_type } = dele;
  const event = "Weekend event"
  const [eventId, setEventId] = React.useState();
  const { delep, setDeletep } = props;
  const formStyle = { textAlign: 'center' }
  const handleClose = () => {
    setDeletep({
      dele: false
    });

  };
  React.useEffect(() => {
    axios.get('/account/events/getEventsList/true/Weekend event')
      .then(response => {
        console.log(response)
        console.log(response.data[0].event_id)
        setWevent(response.data)

      })
      .catch(err => {
        console.log(err)


      })
  }, [event])

  const handleChange = (event) => {
    const evid = event.target.value;
    localStorage.setItem('editeventId', JSON.stringify(evid));
    const editid = JSON.parse(localStorage.getItem("editeventId"));
    axios.get(`/account/events/${editid}`)
      .then(response => {
        console.log(response)
        console.log(response.data);
        const pro = response.data
        localStorage.setItem('myEdit', JSON.stringify(pro))
        setDelete({ type: 'success' })

      })
      .catch(err => {
        console.log(err)
        setDelete({ type: 'error' })


      })
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {

      event_id,
      name,
      event_type,
      description,
      venue

    }

    axios.post("/account/admin/updateEvents", user)
      .then((response) => {
        var res = response.status;

        console.log(response.status)
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Saved Changes Successfully!"
          })
        }

      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          })
        }
        else {
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          })
          console.log(error)
        }
      });
  }

  return (

    <Fragment>
      <Dialog
        width='xl'
//        open={delep.OpenDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >    <center>
          <DialogTitle id="past-event-dialog-title">Edit Events</DialogTitle>
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
                                id="demo-event-name"
                                label="Product Name"
                                value={eventId}
                                onChange={handleChange}

                                MenuProps={MenuProps}
                              >
                                {wevent.map((eve) => (
                                  <MenuItem key={eve.event_id} value={eve.event_id} >
                                    {eve.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              </FormControl></Grid>

                              <Grid item xs={6}>
                                <Field as={TextField}  label='Venue' name="venue" onInput={props.handleChange} value={venue} style={{ marginLeft: '-20px' }}
                                  onChange={e =>
                                    setDelete({
                                      type: 'field',
                                      fieldName: 'venue',
                                      payload: e.currentTarget.value,
                                    })

                                  }
                                  required />
                              </Grid>



                              <Grid item xs={12}>
                                <Field as={TextField} label='Description' name="description" required value={description} style={{ marginLeft: '10px', width: '500px' }}
                                  required onInput={props.handleChange}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) =>
                                    setDelete({
                                      type: 'field',
                                      fieldName: 'description',
                                      payload: e.currentTarget.value,
                                    })}
                                />
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
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>


      )
}


      export default DeleteProduct;
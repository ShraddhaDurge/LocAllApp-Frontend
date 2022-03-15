import React, { Component } from 'react'
import { Dialog, RadioGroup } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core'
import Snack from '../Snackbar';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, ErrorMessage, Field } from 'formik';

export default function VendorLogin(props) {

    const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
    const [selectedRole, setSelectedRole] = React.useState(null);

    const { roleDialog, setRoleDialog } = props;
     let navigate = useNavigate();
     const initialValues = {
             role: 'customer'
         }

    const handleClose = () => {
        setRoleDialog({
            isOpen: false
        });
        navigate('/login', { replace: true })
    };

    const handleRole = (event) => {
            console.log(event.target);
            localStorage.setItem('userRole', JSON.stringify(event.target.role));

    }

    const handleSubmit = (event) => {
         const userRole = JSON.parse(localStorage.getItem("userRole"))
        if(userRole == "customer")
        {
            navigate('/customerHome', { replace: true });
        } else if(userRole == "vendor")
         {
             navigate('/vendorHome', { replace: true });
         } else {
            setNotify({
                isOpen: true,
                mesg: "Select valid role!"
            })
         }

    };


    return (
        <Dialog
            fullWidth={true}

            open={roleDialog.isOp}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="Select Role">Please select the role you want to login as </DialogTitle>
            <DialogContent>
                <Formik initialValues={initialValues} >
                    {(props) => (
                        <Form>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                   <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                    Select Role &nbsp; <PersonIcon /> &nbsp; :
                    <div className="custom-control">
                     <input
                        id="customer"
                        type="radio"
                        value="customer"
                        name='role'
                        onChange={handleRole}
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
                        onChange={handleRole}
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

                </Grid>
                </Form>
                )}
            </Formik>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Ok
                </Button>
            </DialogActions>
            <Snack
                notify={notify}
                setNotify={setNotify}
            />

        </Dialog>
    )
}